import React from 'react';

const DetailModal = ({ info, onClose }) => {
    if (!info) return null;

    // 에러 메시지가 문자열로 오든 배열로 오든 대응할 수 있도록 처리
    const errorMessages = Array.isArray(info.message)
        ? info.message
        : info.message?.split('\n').filter(msg => msg.trim() !== '') || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fade-in p-4" onClick={onClose}>
            {/* 웹폰트 주입: 차분하고 전문적인 Pretendard 스타일 */}
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    .font-studio { 
                        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                    }
                `}
            </style>

            <div
                className="font-studio bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden max-w-2xl w-full flex flex-col md:flex-row transition-all transform scale-100"
                onClick={e => e.stopPropagation()}
            >
                {/* 왼쪽: 이미지 크게 보기 (투명도 확인용 체크보드 배경) */}
                <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center p-10 border-r border-slate-100 relative"
                     style={{
                         backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                         backgroundSize: '20px 20px',
                         backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                     }}>
                    <img src={info.preview} alt="detail" className="max-w-full max-h-[320px] object-contain drop-shadow-2xl" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-400 shadow-sm">미리보기</div>
                </div>

                {/* 오른쪽: 스펙 및 에러 리포트 */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <header className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wider uppercase
                                ${info.status === 'SUCCESS' ? 'bg-green-50 text-green-600 border border-green-100' :
                                info.status === 'FAILED' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                {info.status === 'SUCCESS' ? '검토 완료' : info.status === 'FAILED' ? '규격 미달' : '분석 중...'}
                            </span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tighter truncate leading-tight">{info.name}</h3>
                    </header>

                    {/* 데이터 그리드 */}
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-[11px] font-bold text-slate-400 tracking-wide">권장 해상도</span>
                            <span className="text-sm font-extrabold text-slate-700 font-mono">{info.width} × {info.height} px</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-[11px] font-bold text-slate-400 tracking-wide">파일 용량</span>
                            <span className="text-sm font-extrabold text-slate-700 font-mono">{info.size}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                            <span className="text-[11px] font-bold text-slate-400 tracking-wide">파일 형식</span>
                            <span className="text-sm font-extrabold text-slate-700 uppercase">{info.type.split('/')[1] || info.type}</span>
                        </div>
                    </div>

                    {/* ⭐ 이슈 리포트 리스트 (백엔드 에러 메시지 나열) */}
                    {info.status === 'FAILED' && errorMessages.length > 0 && (
                        <div className="mt-2 bg-red-50/50 p-5 rounded-2xl border border-red-100/50">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-red-500 text-sm">⚠️</span>
                                <p className="text-[11px] font-extrabold text-red-500 uppercase tracking-wider">이슈 리포트</p>
                            </div>
                            <ul className="space-y-2">
                                {errorMessages.map((msg, idx) => (
                                    <li key={idx} className="text-[12px] text-red-600/90 leading-relaxed font-bold flex gap-2">
                                        <span className="shrink-0">•</span>
                                        <span className="break-keep">{msg}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="mt-8 w-full py-4 bg-slate-900 text-white text-sm font-extrabold rounded-2xl hover:bg-black transition-all shadow-lg active:scale-[0.98]"
                    >
                        확인 완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;