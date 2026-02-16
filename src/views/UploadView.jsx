import React from 'react';

const UploadView = ({
                        files, previews, results, handleUploadClick, handleGridClick, handleRemoveFile, handleReset, isReady, getButtonText, setStep, onBack
                    }) => {
    return (
        <div className="flex h-full w-full overflow-hidden text-left">
            {/* 좌측: 업로드 & 그리드 */}
            <div className="w-3/5 border-r border-slate-200 p-8 flex flex-col bg-slate-50 h-full">
                <header className="mb-10 flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="group flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm active:scale-90"
                        title="이전 단계로"
                    >
                        {/* 왼쪽 화살표 아이콘 */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">이모티콘 업로드</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Step 02. Analysis & Validation</p>
                    </div>
                </header>
                <div onClick={handleUploadClick} className="flex-shrink-0 border-2 border-dashed border-slate-300 bg-white rounded-3xl p-10 text-center hover:border-yellow-400 hover:bg-yellow-50 transition-all cursor-pointer mb-10 group shadow-sm">
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">✨</div>
                    <p className="text-slate-700 font-bold text-lg">새로운 이미지 추가</p>
                </div>
                <div className="grid grid-cols-4 gap-x-6 gap-y-12 overflow-y-auto flex-1 px-2 py-4 content-start min-h-0 scrollbar-hide">
                    {[...Array(32)].map((_, i) => (
                        <div key={`slot-${i}`}
                             onClick={() => (previews[i] && files[i]) && handleGridClick(files[i], previews[i])}
                             className={`relative w-full aspect-square bg-white rounded-2xl border border-slate-200 shadow-sm transition-all group 
                             ${previews[i] ? 'cursor-zoom-in hover:border-blue-400 hover:shadow-md' : 'hover:border-yellow-400'}`}
                        >
                            {previews[i] ? (
                                <>
                                    <div className="absolute inset-0 p-4 flex items-center justify-center"><img src={previews[i]} alt="" className="max-w-full max-h-full object-contain" /></div>
                                    <div className="absolute -top-3 -left-3 bg-yellow-400 text-white text-[11px] font-black rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10 border-2 border-white">{i + 1}</div>
                                    <button onClick={(e) => { e.stopPropagation(); handleRemoveFile(i); }} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">✕</button>
                                </>
                            ) : <div className="absolute inset-0 flex items-center justify-center text-slate-200 font-black text-2xl bg-slate-50/50 rounded-2xl">{i + 1}</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* 우측: 리포트 & 버튼 */}
            <div className="w-2/5 bg-white p-10 flex flex-col h-full shadow-2xl z-10">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-slate-800">2. 분석 리포트</h2>

                    {files.length > 0 && (
                        <button
                            onClick={handleReset}
                            className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-1.806c0-1.146-.907-2.146-2.054-2.146H11.21c-1.147 0-2.054 1-2.054 2.146V2.34L11.21 2.34" />
                        </svg>
                        전체 초기화
                    </button>
                )}
                </div>

                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-6 overflow-y-auto mb-8 shadow-inner">
                    {files.length === 0 ? <p className="text-slate-300 text-center mt-20 font-medium">업로드된 파일이 없습니다.</p> : (
                        <div className="space-y-3">
                            {files.map((item, i) => {
                                const res = results[item.id] || {status: 'WAITING'};
                                return (
                                    <div key={item.id}
                                         onClick={() => handleGridClick(item, previews[i])}
                                         className={`flex items-center justify-between p-4 rounded-2xl border shadow-sm transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]
                                            ${res.status === 'FAILED' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100 hover:border-blue-300'}`}
                                    >
                                        <div className="flex items-center space-x-3 truncate text-slate-700 font-semibold">
                                            <span className="text-yellow-500 font-black w-5">{i + 1}</span>
                                            <span className="truncate">{item.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {res.status === 'LOADING' && <span className="text-slate-400 text-xs animate-pulse">분석중...</span>}
                                            {res.status === 'SUCCESS' && <span className="text-green-500 font-bold text-xs">PASS ✅</span>}
                                            {res.status === 'FAILED' && <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">실패 ⚠️</span>}
                                            <button onClick={(e) => { e.stopPropagation(); handleRemoveFile(i); }} className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded-full">✕</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <button onClick={() => setStep('chat')}
                        disabled={!isReady}
                        className={`w-full py-6 text-xl font-black rounded-3xl transition-all shadow-xl 
                        ${isReady ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900 transform hover:-translate-y-1'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}> {getButtonText}
                </button>
            </div>
        </div>
    );
};

export default UploadView;