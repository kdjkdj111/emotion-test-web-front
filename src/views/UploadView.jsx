import React from 'react';

const UploadView = ({
                        files, previews, results, handleUploadClick, handleGridClick, handleRemoveFile, isReady, getButtonText, setStep
                    }) => {
    return (
        <div className="flex h-full w-full overflow-hidden text-left">
            {/* 좌측: 업로드 & 그리드 */}
            <div className="w-3/5 border-r border-slate-200 p-8 flex flex-col bg-slate-50 h-full">
                <header className="mb-6"><h1 className="text-2xl font-bold text-slate-800">1. 이모티콘 업로드</h1></header>
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
                <h2 className="text-2xl font-black text-slate-800 mb-8">2. 분석 리포트</h2>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-6 overflow-y-auto mb-8 shadow-inner">
                    {files.length === 0 ? <p className="text-slate-300 text-center mt-20 font-medium">업로드된 파일이 없습니다.</p> : (
                        <div className="space-y-3">
                            {files.map((file, i) => {
                                const res = results[file.name] || {status: 'WAITING'};
                                return (
                                    <div key={file.name}
                                         onClick={() => handleGridClick(file, previews[i])}
                                         className={`flex items-center justify-between p-4 rounded-2xl border shadow-sm transition-all cursor-pointer hover:shadow-md hover:scale-[1.02]
                                            ${res.status === 'FAILED' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100 hover:border-blue-300'}`}
                                    >
                                        <div className="flex items-center space-x-3 truncate text-slate-700 font-semibold">
                                            <span className="text-yellow-500 font-black w-5">{i + 1}</span>
                                            <span className="truncate">{file.name}</span>
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