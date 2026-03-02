import React, { useState } from 'react';
import SkeletonRow from '../components/upload/SkeletonRow';

const MiniUploadView = ({
                            files, previews, results, handleUploadClick, handleGridClick, handleRemoveFile, handleReset, isReady, getButtonText, setStep, onBack, handleDrop, handleDragOver
                        }) => {
    // 미니 이모티콘 규격: 24개 세트 구성 (144x144px)
    const MAX_SLOTS = 24;
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className="flex h-full w-full overflow-hidden text-left font-sans tracking-tight">
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    .font-studio { 
                        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                    }
                    @keyframes bounce-subtle {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-4px); }
                    }
                    .animate-bounce-subtle {
                        animation: bounce-subtle 1s infinite ease-in-out;
                    }
                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>

            <div className="font-studio flex h-full w-full max-w-[1600px] mx-auto bg-white shadow-2xl">
                {/* 좌측: 작업 영역 (그리드) - 패딩 축소 */}
                <div className="w-[62%] border-r border-slate-200 p-6 flex flex-col bg-slate-50 h-full">
                    <header className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onBack}
                                className="group flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm active:scale-90"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-extrabold text-slate-800 tracking-tighter">미니 이모티콘</h1>
                                    <span className="px-1.5 py-0.5 bg-rose-100 text-rose-600 text-[9px] font-bold rounded-md uppercase">Mini</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">144 x 144 px | 말풍선 속 작은 포인트를 확인하세요.</p>
                            </div>
                        </div>
                    </header>

                    {/* 업로드 영역: 촘촘하게 크기 조정 */}
                    <div
                        onClick={handleUploadClick}
                        onDragOver={(e) => {
                            handleDragOver(e);
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            handleDrop(e);
                            setIsDragging(false);
                        }}
                        className={`flex-shrink-0 border-2 border-dashed rounded-[1.5rem] p-6 text-center transition-all cursor-pointer mb-6 group shadow-sm
                            ${isDragging
                            ? 'border-rose-400 bg-rose-50/50 scale-[1.01] shadow-lg ring-4 ring-rose-400/10'
                            : 'border-slate-300 bg-white hover:border-rose-400 hover:bg-rose-50/30'
                        }`}
                    >
                        <div className={`text-3xl mb-1.5 transition-transform ${isDragging ? 'animate-bounce-subtle' : 'group-hover:scale-110'}`}>
                            {isDragging ? '📥' : '💎'}
                        </div>
                        <p className={`font-bold text-sm transition-colors ${isDragging ? 'text-rose-600' : 'text-slate-700'}`}>
                            {isDragging ? '미니 파일 놓기' : '미니 이미지 파일 추가하기'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                            {isDragging ? '마우스 버튼을 놓으세요' : '작은 사이즈의 PNG 파일 (드래그 지원)'}
                        </p>
                    </div>

                    {/* 그리드: 6열 구성 최적화 */}
                    <div className="grid grid-cols-6 gap-x-3 gap-y-6 overflow-y-auto flex-1 px-2 py-2 content-start min-h-0 scrollbar-hide">
                        {[...Array(MAX_SLOTS)].map((_, i) => (
                            <div key={`mini-slot-${i}`}
                                 onClick={() => (previews[i] && files[i]) && handleGridClick(files[i], previews[i])}
                                 className={`relative w-full aspect-square bg-white rounded-lg border border-slate-200 shadow-sm transition-all group 
                                 ${previews[i] ? 'cursor-zoom-in hover:border-rose-400 hover:shadow-md' : 'hover:border-slate-300'}`}
                            >
                                {previews[i] ? (
                                    <>
                                        <div className="absolute inset-0 p-2 flex items-center justify-center">
                                            <img src={previews[i]} alt="" className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="absolute -top-2 -left-2 bg-rose-500 text-white text-[8px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow-md z-10 border-2 border-white">{i + 1}</div>
                                        <button onClick={(e) => { e.stopPropagation(); handleRemoveFile(i); }} className="absolute -top-1.5 -right-1.5 bg-slate-800 text-white rounded-full w-4.5 h-4.5 text-[7px] flex items-center justify-center shadow-md z-20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">✕</button>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-200 bg-slate-50/50 rounded-lg text-xs font-extrabold">
                                        {i + 1}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 우측: 리포트 영역 - 패딩 및 요소 크기 축소 */}
                <div className="w-[38%] bg-white p-8 flex flex-col h-full shadow-2xl z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-800 tracking-tighter">분석 리포트</h2>
                            <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">Small Scale Validation</p>
                        </div>

                        {files.length > 0 && (
                            <button
                                onClick={handleReset}
                                className="text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 bg-red-50 px-2.5 py-1.5 rounded-lg"
                            >
                                전체 비우기
                            </button>
                        )}
                    </div>

                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 overflow-y-auto mb-6 shadow-inner scrollbar-hide">
                        {files.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-2 opacity-60">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <p className="font-bold text-sm">검수할 파일을 올려주세요.</p>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {files.map((item, i) => {
                                    const res = results[item.id] || {status: 'WAITING'};

                                    if (!res || res.status === 'LOADING') {
                                        return <SkeletonRow key={`skeleton-${i}`} />;
                                    }

                                    return (
                                        <div key={item.id}
                                             onClick={() => handleGridClick(item, previews[i])}
                                             className={`flex items-center justify-between p-3.5 rounded-xl border shadow-sm transition-all cursor-pointer hover:shadow-md hover:scale-[1.01]
                                                ${res.status === 'FAILED' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100 hover:border-rose-300'}`}
                                        >
                                            <div className="flex items-center space-x-2.5 truncate text-slate-700 font-bold">
                                                <span className="text-rose-500 font-extrabold w-4 text-[12px]">{i + 1}</span>
                                                <span className="truncate text-[12px]">{item.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-1.5">
                                                {res.status === 'LOADING' && <div className="w-3.5 h-3.5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>}
                                                {res.status === 'SUCCESS' && <span className="text-rose-500 font-bold text-[9px] bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-100">통과</span>}
                                                {res.status === 'FAILED' && <span className="text-red-500 font-bold text-[9px] bg-red-50 px-1.5 py-0.5 rounded-md border border-red-100">오류</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <button onClick={() => setStep('chat')}
                            disabled={!isReady}
                            className={`w-full py-4.5 text-lg font-extrabold rounded-[1.25rem] transition-all shadow-xl 
                        ${isReady ? 'bg-slate-900 hover:bg-black text-white transform hover:-translate-y-0.5'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}> {getButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MiniUploadView;