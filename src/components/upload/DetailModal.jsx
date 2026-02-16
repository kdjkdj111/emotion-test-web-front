import React from 'react';

const DetailModal = ({ info, onClose }) => {
    if (!info) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full flex flex-col md:flex-row m-4" onClick={e => e.stopPropagation()}>

                {/* 왼쪽: 이미지 크게 보기 */}
                <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center p-8 border-r border-slate-200">
                    <img src={info.preview} alt="detail" className="max-w-full max-h-[300px] object-contain drop-shadow-md" />
                </div>

                {/* 오른쪽: 스펙 정보 */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="mb-6">
                        <h3 className="text-2xl font-black text-slate-800 mb-1 truncate">{info.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                            ${info.status === 'SUCCESS' ? 'bg-green-100 text-green-600' :
                            info.status === 'FAILED' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                            {info.status === 'SUCCESS' ? 'Pass ✅' : info.status === 'FAILED' ? 'Fail ⚠️' : 'Analyzing...'}
                        </span>
                    </div>

                    <div className="space-y-4 text-sm text-slate-600">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="font-semibold text-slate-400">Resolution</span>
                            <span className="font-mono font-bold text-slate-700">{info.width} x {info.height} px</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="font-semibold text-slate-400">File Size</span>
                            <span className="font-mono font-bold text-slate-700">{info.size}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="font-semibold text-slate-400">Type</span>
                            <span className="font-mono font-bold text-slate-700">{info.type}</span>
                        </div>
                    </div>

                    {/* 에러 메시지 */}
                    {info.status === 'FAILED' && (
                        <div className="mt-6 bg-red-50 p-4 rounded-xl border border-red-100">
                            <p className="text-xs font-bold text-red-500 mb-1">🚨 Issue Detected</p>
                            <p className="text-xs text-red-600 whitespace-pre-wrap">{info.message}</p>
                        </div>
                    )}

                    <button onClick={onClose} className="mt-8 w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;