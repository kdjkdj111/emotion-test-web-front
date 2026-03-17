import React, { useState, useRef, useEffect } from 'react';
import { uploadEmoticon } from './api/api.js';
import StartView from './views/StartView';
import TypeSelectionView from './views/TypeSelectionView';
import StillUploadView from './views/StillUploadView';
import AnimatedUploadView from './views/AnimatedUploadView';
import LargeUploadView from './views/LargeUploadView';
import MiniUploadView from './views/MiniUploadView';
import ChatView from './views/ChatView';
import DetailModal from './components/upload/DetailModal';
import { authService } from './utils/auth';
import ConfirmModal from './components/upload/ConfirmModal';
import HistoryView from './views/HistoryView';

export default function App() {
    // -------------------------------------------------------------------------
    // 1. 상태 관리 (State Management)
    // -------------------------------------------------------------------------
    const [step, setStep] = useState('start');
    const [emoticonType, setEmoticonType] = useState('STILL');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [results, setResults] = useState({});
    const [detailInfo, setDetailInfo] = useState(null);
    const fileInputRef = useRef(null);
    const [userId] = useState(() => authService.getUserId());
    const [projectId, setProjectId] = useState(() => crypto.randomUUID());
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // [로직] 초기화 실행
    const executeReset = () => {
        previews.forEach(url => URL.revokeObjectURL(url));
        setFiles([]); setPreviews([]); setResults([]); setDetailInfo(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (step === 'chat') setStep('start');
        setIsConfirmOpen(false);
        setProjectId(crypto.randomUUID());
    };

    // -------------------------------------------------------------------------
    // 2. 파일 처리 핵심 로직 (Core Processing)
    // -------------------------------------------------------------------------

    // ⭐ [핵심] 클릭 업로드와 드래그 업로드가 공유하는 단일 처리 함수
    const processFiles = async (selectedFiles) => {
        if (selectedFiles.length === 0) return;

        const filesWithId = selectedFiles.map(file => ({
            id: crypto.randomUUID(),
            file: file,
            name: file.name
        }));

        // 최대 32개 제한 (기존 파일 + 새 파일)
        setFiles(prev => [...prev, ...filesWithId].slice(0, 32));

        for (const item of filesWithId) {
            setResults(prev => ({ ...prev, [item.id]: { status: 'LOADING' } }));
            try {
                // 백엔드 API 호출 (영어 코드 기반 결과 반환 기대)
                const result = await uploadEmoticon(userId, projectId, item.file, emoticonType, item.id);
                setResults(prev => ({
                    ...prev,
                    [item.id]: { status: result.status, msg: result.errorMessage }
                }));
            } catch (error) {
                setResults(prev => ({ ...prev, [item.id]: { status: 'FAILED', msg: '통신 에러' } }));
            }
        }
    };

    // -------------------------------------------------------------------------
    // 3. 핸들러 함수 (Handlers)
    // -------------------------------------------------------------------------

    const handleTypeSelect = (typeId) => {
        setEmoticonType(typeId);
        setStep('upload');
    };

    // ⭐ [FIX] input 태그의 onChange를 처리할 함수 (processFiles로 연결)
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        processFiles(selectedFiles);
        e.target.value = ''; // 같은 파일 재업로드 가능하게 초기화
    };

    // 드래그 앤 드롭 핸들러
    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation();
        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); e.stopPropagation();
    };

    const handleRemoveFile = (index) => {
        const fileIdToRemove = files[index].id;
        setFiles(prev => prev.filter((_, i) => i !== index));
        setResults(prev => {
            const newResults = { ...prev };
            delete newResults[fileIdToRemove];
            return newResults;
        });
    };

    const handleGridClick = (item, previewUrl) => {
        const res = results[item.id] || { status: 'WAITING', msg: '분석 대기 중입니다.' };
        const baseInfo = {
            name: item.name,
            size: (item.file.size / 1024).toFixed(1) + ' KB',
            type: item.file.type || 'unknown',
            width: 'N/A', height: 'N/A',
            preview: previewUrl,
            status: res.status, message: res.msg
        };

        if (item.file.type?.startsWith('image/')) {
            const img = new Image();
            img.src = previewUrl;
            img.onload = () => setDetailInfo({ ...baseInfo, width: img.width, height: img.height });
            img.onerror = () => setDetailInfo(baseInfo);
        } else { setDetailInfo(baseInfo); }
    };

    // -------------------------------------------------------------------------
    // 4. 사이드 이펙트 & 공통 Props
    // -------------------------------------------------------------------------

    useEffect(() => {
        if (files.length === 0) { setPreviews([]); return; }
        const newPreviews = files.map(item => URL.createObjectURL(item.file));
        setPreviews(newPreviews);
        return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
    }, [files]);

    const isAnalyzing = files.some(f => results[f.id]?.status === 'LOADING' || !results[f.id]);
    const isReady = files.length > 0 && !isAnalyzing;

    const commonUploadProps = {
        files, previews, results, isReady,
        getButtonText: files.length === 0 ? "파일을 업로드해주세요" : isAnalyzing ? "⏳ 분석 중입니다..." : "🚀 시뮬레이션 시작",
        handleUploadClick: () => fileInputRef.current?.click(),
        handleGridClick, handleRemoveFile, handleDrop, handleDragOver,
        handleReset: () => setIsConfirmOpen(true),
        setStep, onBack: () => setStep('select'),
        onViewHistory: () => setStep('history')
    };

    // -------------------------------------------------------------------------
    // 5. 최종 렌더링
    // -------------------------------------------------------------------------
    return (
        <div className="w-full h-screen overflow-hidden bg-white font-sans text-left">
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    * { font-family: 'Pretendard', -apple-system, sans-serif !important; }
                `}
            </style>

            {/* ⭐ [FIX] handleFileChange 연결 확인 */}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/png, image/gif" className="hidden" />

            {step === 'start' && <StartView onStart={() => setStep('select')} />}
            {step === 'select' && <TypeSelectionView onSelect={handleTypeSelect} onBack={() => setStep('start')} />}

            {step === 'upload' && (() => {
                switch (emoticonType) {
                    case 'ANIMATED': return <AnimatedUploadView {...commonUploadProps} />;
                    case 'LARGE':    return <LargeUploadView {...commonUploadProps} />;
                    case 'MINI':     return <MiniUploadView {...commonUploadProps} />;
                    default:         return <StillUploadView {...commonUploadProps} selectedType={emoticonType} />;
                }
            })()}

            {step === 'history' && (
                <HistoryView
                    userId={userId} // 🚀 [NEW] userId 추가!
                    projectId={projectId}
                    onBack={() => setStep('upload')}
                />
            )}

            {step === 'chat' && <ChatView files={files} previews={previews} setStep={setStep} handleReset={() => setIsConfirmOpen(true)} />}

            <ConfirmModal isOpen={isConfirmOpen} title="전체 초기화" message="모든 데이터가 삭제됩니다. 정말 초기화할까요?" onConfirm={executeReset} onCancel={() => setIsConfirmOpen(false)} />
            {detailInfo && <DetailModal info={detailInfo} onClose={() => setDetailInfo(null)} />}
        </div>
    );
}