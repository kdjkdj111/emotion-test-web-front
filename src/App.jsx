import React, { useState, useRef, useEffect } from 'react';
import { uploadEmoticon } from './api/api.js'; // 파일 경로 확인하세요!
import StartView from './views/StartView';
import TypeSelectionView from './views/TypeSelectionView';
import UploadView from './views/UploadView';
import ChatView from './views/ChatView';
import DetailModal from './components/upload/DetailModal';
import { authService } from './utils/auth';
import ConfirmModal from './components/upload/ConfirmModal';


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
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    //초기화 실행 로직
    const executeReset = () => {
        // 메모리 해제 (미리보기 URL 제거)
        previews.forEach(url => URL.revokeObjectURL(url));

        // 모든 상태 초기화
        setFiles([]);
        setPreviews([]);
        setResults({});
        setDetailInfo(null);

        // Input 필드 초기화
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // 모달 닫기
        setIsConfirmOpen(false);
    };

    // -------------------------------------------------------------------------
    // 2. 파일 핸들러 (File Handlers)
    // -------------------------------------------------------------------------

    // [타입 선택] 4종류 타입 선택
    const handleTypeSelect = (typeId) => {
        setEmoticonType(typeId); // 선택한 타입을 저장
        setStep('upload');       // 업로드 화면으로 이동
    };

    // [업로드] 파일 선택 시 실행되는 로직
    const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length === 0) return;

        // 1. [핵심] 각 파일에 고유 ID(UUID)를 미리 부여합니다.
        const filesWithId = selectedFiles.map(file => ({
            id: crypto.randomUUID(), // 이 파일만의 고유 주민번호
            file: file,              // 실제 파일 데이터
            name: file.name          // 화면 표시용 이름
        }));

        // 2. 최대 32개까지만 유지 (기존 파일 + 새 파일)
        setFiles(prev => [...prev, ...filesWithId].slice(0, 32));
        event.target.value = '';

        // 3. 파일별로 분석 요청
        for (const item of filesWithId) {
            setResults(prev => ({ ...prev, [item.id]: { status: 'LOADING' } }));

            try {
                const result = await uploadEmoticon(userId, item.file, emoticonType, item.id);

                setResults(prev => ({
                    ...prev,
                    [item.id]: {
                        status: result.status,
                        msg: result.errorMessage
                    }
                }));
            } catch (error) {
                setResults(prev => ({
                    ...prev,
                    [item.id]: { status: 'FAILED', msg: '통신 에러가 발생했습니다.' }
                }));
            }
        }
    };

    // [삭제] 특정 인덱스의 파일 제거
    const handleRemoveFile = (index) => {
        const fileIdToRemove = files[index].id;

        setFiles(prev => prev.filter((_, i) => i !== index));

        // 결과 데이터에서도 삭제
        setResults(prev => {
            const newResults = { ...prev };
            delete newResults[fileIdToRemove];
            return newResults;
        });
    };

    const handleResetRequest = () => {
        setIsConfirmOpen(true); // 모달을 띄웁니다.
    };

    // [상세보기] 그리드 아이템 클릭 시 해상도 추출 및 모달 오픈
    const handleGridClick = (item, previewUrl) => {
        const res = results[item.id] || { status: 'WAITING', msg: '분석 대기 중입니다.' };

        const baseInfo = {
            name: item.name,
            size: (item.file.size / 1024).toFixed(1) + ' KB',
            type: item.file.type || 'unknown',
            width: 'N/A',
            height: 'N/A',
            preview: previewUrl,
            status: res.status,
            message: res.msg
        };

        // 이미지 파일이면 실제 해상도 계산
        if (item.file.type?.startsWith('image/')) {
            const img = new Image();
            img.src = previewUrl;
            img.onload = () => {
                setDetailInfo({ ...baseInfo, width: img.width, height: img.height });
            };
            img.onerror = () => setDetailInfo(baseInfo);
        } else {
            setDetailInfo(baseInfo);
        }
    };

    // -------------------------------------------------------------------------
    // 3. 사이드 이펙트 (Side Effects)
    // -------------------------------------------------------------------------

    // 파일 목록이 변할 때마다 미리보기 URL 생성 및 메모리 해제
    useEffect(() => {
        if (files.length === 0) {
            setPreviews([]);
            return;
        }

        const newPreviews = files.map(item => URL.createObjectURL(item.file));
        setPreviews(newPreviews);

        // Cleanup: 브라우저 메모리 누수 방지
        return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
    }, [files]);

    // -------------------------------------------------------------------------
    // 4. 비즈니스 로직 (Helper Functions)
    // -------------------------------------------------------------------------

    // 분석 중인 파일이 하나라도 있는지 확인
    const isAnalyzing = files.some(f => results[f.id]?.status === 'LOADING' || !results[f.id]);

    // 시뮬레이션 시작 버튼 활성화 조건
    const isReady = files.length > 0 && !isAnalyzing;

    const getButtonText = () => {
        if (files.length === 0) return "파일을 업로드해주세요";
        if (isAnalyzing) return "⏳ 분석 중입니다...";
        return "🚀 시뮬레이션 시작";
    };

    // -------------------------------------------------------------------------
    // 5. 렌더링 (Rendering)
    // -------------------------------------------------------------------------
    return (
        <div className="w-full h-screen overflow-hidden bg-white font-sans text-left">
            {/* 숨겨진 파일 인풋 (어디서든 ref로 호출 가능) */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/png, image/gif"
                className="hidden"
            />

            {/* 1. 시작 화면 */}
            {step === 'start' && (
                <StartView onStart={() => setStep('select')} />
            )}

            {/* 2. 종류 선택 화면 */}
            {step === 'select' && (
                <TypeSelectionView
                    onSelect={handleTypeSelect}
                    onBack={() => setStep('start')}
                />
            )}

            {/* 3. 업로드 화면 */}
            {step === 'upload' && (
                <UploadView
                    selectedType={emoticonType}
                    files={files}
                    previews={previews}
                    results={results}
                    handleUploadClick={() => fileInputRef.current?.click()}
                    handleGridClick={handleGridClick}
                    handleRemoveFile={handleRemoveFile}
                    handleReset={handleResetRequest}
                    isReady={isReady}
                    getButtonText={getButtonText()}
                    setStep={setStep}
                    onBack={() => setStep('select')}
                />
            )}

            {step === 'chat' && (
                <ChatView
                    files={files}
                    previews={previews}
                    setStep={setStep}
                />
            )}

            {/* 공통 확인 모달 (맨 아래 배치) */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                title="전체 초기화"
                message="업로드된 모든 파일과 분석 결과가 삭제됩니다. 정말 초기화할까요?"
                onConfirm={executeReset} // 실제 삭제 로직 실행
                onCancel={() => setIsConfirmOpen(false)} // 그냥 닫기
            />

            {/* 공통 상세 정보 모달 */}
            {detailInfo && (
                <DetailModal
                    info={detailInfo}
                    onClose={() => setDetailInfo(null)}
                />
            )}
        </div>
    );
}