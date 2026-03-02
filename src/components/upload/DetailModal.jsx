import React from 'react';

const DetailModal = ({ info, onClose }) => {
    if (!info) return null;

    const errorMessages = Array.isArray(info.message)
        ? info.message
        : info.message?.split('\n').filter(msg => msg.trim() !== '') || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fade-in p-4" onClick={onClose}>
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    .font-studio { 
                        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                    }
                `}
            </style>

            {/* [UPDATE] 최대 너비 축소 (max-w-2xl -> max-w-xl) 및 라운드값 조정 */}
            <div
                className="font-studio bg-white rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden max-w-xl w-full flex flex-col md:flex-row transition-all transform scale-100"
                onClick={e => e.stopPropagation()}
            >
                {/* 왼쪽: 이미지 영역 - 패딩 및 배경 그리드 크기 미세 조정 */}
                <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center p-8 border-r border-slate-100 relative"
                     style={{
                         backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                         backgroundSize: '16px 16px',
                         backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
                     }}>
                    {/* [UPDATE] 이미지 최대 높이 축소 (320px -> 260px) */}
                    <img src={info.preview} alt="detail" className="max-w-full max-h-[260px] object-contain drop-shadow-xl" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-full text-[9px] font-bold text-slate-400 shadow-sm">미리보기</div>
                </div>

                {/* 오른쪽: 스펙 리포트 - 패딩 축소 (p-10 -> p-8) */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <header className="mb-6">
                        <div className="flex items-center gap-2 mb-1.5">
                            {/* [UPDATE] 배지 텍스트 크기 조정 (10px -> 9px) */}
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider uppercase
                                ${info.status === 'SUCCESS' ? 'bg-green-50 text-green-600 border border-green-100' :
                                info.status === 'FAILED' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                {info.status === 'SUCCESS' ? '검토 완료' : info.status === 'FAILED' ? '규격 미달' : '분석 중...'}
                            </span>
                        </div>
                        {/* [UPDATE] 제목 폰트 크기 하향 (text-2xl -> text-xl) */}
                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tighter truncate leading-tight">{info.name}</h3>
                    </header>

                    {/* 데이터 그리드 - 텍스트 및 간격 조정 */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                            <span className="text-[10px] font-bold text-slate-400 tracking-wide">권장 해상도</span>
                            <span className="text-[13px] font-extrabold text-slate-700 font-mono">{info.width} × {info.height} px</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                            <span className="text-[10px] font-bold text-slate-400 tracking-wide">파일 용량</span>
                            <span className="text-[13px] font-extrabold text-slate-700 font-mono">{info.size}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                            <span className="text-[10px] font-bold text-slate-400 tracking-wide">파일 형식</span>
                            <span className="text-[13px] font-extrabold text-slate-700 uppercase">{info.type.split('/')[1] || info.type}</span>
                        </div>
                    </div>

                    {/* 이슈 리포트 리스트 - 패딩 및 텍스트 최적화 */}
                    {info.status === 'FAILED' && errorMessages.length > 0 && (
                        <div className="mt-1 bg-red-50/50 p-4 rounded-xl border border-red-100/50">
                            <div className="flex items-center gap-1.5 mb-2.5">
                                <span className="text-red-500 text-xs">⚠️</span>
                                <p className="text-[9px] font-extrabold text-red-500 uppercase tracking-wider">이슈 리포트</p>
                            </div>
                            <ul className="space-y-1.5">
                                {errorMessages.map((msg, idx) => (
                                    <li key={idx} className="text-[11px] text-red-600/90 leading-relaxed font-bold flex gap-1.5">
                                        <span className="shrink-0">•</span>
                                        <span className="break-keep">{msg}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* [UPDATE] 확인 버튼 높이 및 폰트 크기 조정 */}
                    <button
                        onClick={onClose}
                        className="mt-6 w-full py-3.5 bg-slate-900 text-white text-[13px] font-extrabold rounded-xl hover:bg-black transition-all shadow-lg active:scale-[0.98]"
                    >
                        확인 완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;