import React, { useState, useRef, useEffect } from 'react';
import { uploadEmoticon } from './api/api.js'; // 파일 경로 확인하세요!
import StartView from './views/StartView';
import UploadView from './views/UploadView';
import ChatView from './views/ChatView';
import DetailModal from './components/upload/DetailModal';

export default function App() {
    // -------------------------------------------------------------------------
    // 1. 상태 관리 (State Management)
    // -------------------------------------------------------------------------
    const [step, setStep] = useState('start');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [results, setResults] = useState({});
    const [detailInfo, setDetailInfo] = useState(null);
    const fileInputRef = useRef(null);

    // -------------------------------------------------------------------------
    // 2. 파일 핸들러 (File Handlers)
    // -------------------------------------------------------------------------

    // [업로드] 파일 선택 시 실행되는 로직
    const handleFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length === 0) return;

        // 최대 32개까지만 유지
        const newFileList = [...files, ...selectedFiles].slice(0, 32);
        setFiles(newFileList);
        event.target.value = ''; // 같은 파일 재업로드 가능하도록 초기화

        // 각 파일별로 백엔드 분석 요청
        for (const file of selectedFiles) {
            // 로딩 상태 표시
            setResults(prev => ({ ...prev, [file.name]: { status: 'LOADING' } }));

            try {
                // API 호출 (현재는 STILL 타입 고정)
                const result = await uploadEmoticon('Dongjun', file, 'STILL');

                setResults(prev => ({
                    ...prev,
                    [file.name]: {
                        status: result.status,
                        msg: result.errorMessage
                    }
                }));
            } catch (error) {
                setResults(prev => ({
                    ...prev,
                    [file.name]: { status: 'FAILED', msg: '통신 에러가 발생했습니다.' }
                }));
            }
        }
    };

    // [삭제] 특정 인덱스의 파일 제거
    const handleRemoveFile = (index) => {
        const fileNameToRemove = files[index].name;
        setFiles(prev => prev.filter((_, i) => i !== index));

        // 결과 데이터에서도 삭제
        setResults(prev => {
            const newResults = { ...prev };
            delete newResults[fileNameToRemove];
            return newResults;
        });
    };

    // [상세보기] 그리드 아이템 클릭 시 해상도 추출 및 모달 오픈
    const handleGridClick = (file, previewUrl) => {
        const res = results[file.name] || { status: 'WAITING', msg: '분석 대기 중입니다.' };

        const baseInfo = {
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type || 'unknown',
            width: 'N/A',
            height: 'N/A',
            preview: previewUrl,
            status: res.status,
            message: res.msg
        };

        // 이미지 파일이면 실제 해상도 계산
        if (file.type?.startsWith('image/')) {
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

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);

        // Cleanup: 브라우저 메모리 누수 방지
        return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
    }, [files]);

    // -------------------------------------------------------------------------
    // 4. 비즈니스 로직 (Helper Functions)
    // -------------------------------------------------------------------------

    // 분석 중인 파일이 하나라도 있는지 확인
    const isAnalyzing = files.some(f => results[f.name]?.status === 'LOADING' || !results[f.name]);

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

            {/* 메인 화면 라우팅 */}
            {step === 'start' && (
                <StartView onStart={() => setStep('upload')} />
            )}

            {step === 'upload' && (
                <UploadView
                    files={files}
                    previews={previews}
                    results={results}
                    handleUploadClick={() => fileInputRef.current?.click()}
                    handleGridClick={handleGridClick}
                    handleRemoveFile={handleRemoveFile}
                    isReady={isReady}
                    getButtonText={getButtonText()}
                    setStep={setStep}
                />
            )}

            {step === 'chat' && (
                <ChatView
                    files={files}
                    previews={previews}
                    setStep={setStep}
                />
            )}

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