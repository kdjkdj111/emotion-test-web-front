import React, { useState } from 'react';
import SkeletonRow from '../components/upload/SkeletonRow';

const StillUploadView = ({
                             files, previews, results, handleUploadClick, handleGridClick, handleRemoveFile, handleReset, isReady, getButtonText, setStep, onBack, handleDrop, handleDragOver, onViewHistory
                         }) => {
    const MAX_SLOTS = 32;
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
                {/* 좌측: 작업 영역 (그리드) - 패딩 축소 (p-8 -> p-6) */}
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
                                    <h1 className="text-xl font-extrabold text-slate-800 tracking-tighter">정지형 이모티콘</h1>
                                    <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[9px] font-bold rounded-md uppercase">Still</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">360 x 360 px | 32개 세트 구성을 확인하세요.</p>
                            </div>
                        </div>

                        <button
                            onClick={onViewHistory}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:border-yellow-400 hover:bg-yellow-50 transition-all shadow-sm active:scale-95 group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400 group-hover:text-yellow-600 transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                            <span className="text-[11px] font-extrabold tracking-tighter">프로젝트 대시보드</span>
                        </button>
                    </header>

                    {/* 업로드 영역: 높이와 패딩 축소 */}
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
                            ? 'border-yellow-400 bg-yellow-50/50 scale-[1.01] shadow-lg ring-4 ring-yellow-400/10'
                            : 'border-slate-300 bg-white hover:border-yellow-400 hover:bg-yellow-50/30'
                        }`}
                    >
                        <div className={`text-3xl mb-1.5 transition-transform ${isDragging ? 'animate-bounce-subtle' : 'group-hover:scale-110'}`}>
                            {isDragging ? '📥' : '🖼️'}
                        </div>
                        <p className={`font-bold text-sm transition-colors ${isDragging ? 'text-yellow-600' : 'text-slate-700'}`}>
                            {isDragging ? '여기에 놓아서 업로드' : '새로운 이미지 파일 추가하기'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                            {isDragging ? '마우스 버튼을 놓으세요' : '배경이 투명한 PNG 파일 (드래그 지원)'}
                        </p>
                    </div>

                    {/* 그리드: 32구 구성 - 간격 및 크기 정밀 조정 */}
                    <div className="grid grid-cols-4 gap-x-4 gap-y-8 overflow-y-auto flex-1 px-2 py-2 content-start min-h-0 scrollbar-hide">
                        {[...Array(MAX_SLOTS)].map((_, i) => (
                            <div key={`still-slot-${i}`}
                                 onClick={() => (previews[i] && files[i]) && handleGridClick(files[i], previews[i])}
                                 className={`relative w-full aspect-square bg-white rounded-xl border border-slate-200 shadow-sm transition-all group 
                                 ${previews[i] ? 'cursor-zoom-in hover:border-yellow-400 hover:shadow-md' : 'hover:border-slate-300'}`}
                            >
                                {previews[i] ? (
                                    <>
                                        <div className="absolute inset-0 p-3 flex items-center justify-center">
                                            <img src={previews[i]} alt="" className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="absolute -top-2.5 -left-2.5 bg-yellow-400 text-white text-[9px] font-extrabold rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10 border-2 border-white">{i + 1}</div>
                                        <button onClick={(e) => { e.stopPropagation(); handleRemoveFile(i); }} className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full w-5 h-5 text-[9px] flex items-center justify-center shadow-md z-20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">✕</button>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-200 bg-slate-50/50 rounded-xl font-extrabold text-lg">
                                        {i + 1}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 우측: 분석 리포트 - 패딩 축소 (p-10 -> p-8) */}
                <div className="w-[38%] bg-white p-8 flex flex-col h-full shadow-2xl z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-800 tracking-tighter">분석 리포트</h2>
                            <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">Image Quality & Spec Check</p>
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

                    {/* 검수 리스트 영역 */}
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-[1.5rem] p-5 overflow-y-auto mb-6 shadow-inner scrollbar-hide">
                        {files.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-2 opacity-60">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <p className="font-bold text-sm">업로드된 파일이 없어요.</p>
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
                                                ${res.status === 'FAILED' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100 hover:border-yellow-300'}`}
                                        >
                                            <div className="flex items-center space-x-2.5 truncate text-slate-700 font-bold">
                                                <span className="text-yellow-500 font-extrabold w-4 text-[12px]">{i + 1}</span>
                                                <span className="truncate text-[12px]">{item.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-1.5">
                                                {res.status === 'LOADING' && <div className="w-3.5 h-3.5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>}
                                                {res.status === 'SUCCESS' && <span className="text-yellow-600 font-bold text-[9px] bg-yellow-50 px-1.5 py-0.5 rounded-md border border-yellow-100">통과</span>}
                                                {res.status === 'FAILED' && <span className="text-red-500 font-bold text-[9px] bg-red-50 px-1.5 py-0.5 rounded-md border border-red-100">오류</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* 시뮬레이션 진입 버튼: 패딩 및 텍스트 크기 조정 */}
                    <button onClick={() => setStep('chat')}
                            disabled={!isReady}
                            className={`w-full py-4.5 text-lg font-extrabold rounded-[1.25rem] transition-all shadow-xl 
                        ${isReady ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900 transform hover:-translate-y-0.5'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}> {getButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StillUploadView;