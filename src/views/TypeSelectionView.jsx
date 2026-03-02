import React from 'react';

const TypeSelectionView = ({ onSelect, onBack }) => {
    const emoticonTypes = [
        { id: 'STILL', title: '정지형 이모티콘', desc: '움직임이 없는 PNG 파일', spec: '360 x 360 px', icon: '🖼️' },
        { id: 'ANIMATED', title: '움직이는 이모티콘', desc: '생동감 넘치는 GIF/APNG', spec: '360 x 360 px', icon: '🎬' },
        { id: 'LARGE', title: '큰 이모티콘', desc: '압도적인 크기 (최대 540px)', spec: 'LARGE SPEC', icon: '🐘' },
        { id: 'MINI', title: '미니 이모티콘', desc: '말풍선 속 작은 포인트', spec: '144 x 144 px', icon: '💎' },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50 animate-fade-in p-4 font-sans tracking-tight">
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    .font-studio { 
                        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                    }
                `}
            </style>

            <div className="font-studio flex flex-col items-center w-full max-w-[1200px]">
                <header className="text-center mb-8">
                    {/* [FIX] 제목 크기 text-3xl -> text-2xl로 더 축소 */}
                    <h2 className="text-2xl font-extrabold text-slate-800 mb-2 tracking-tighter">어떤 이모티콘을 만들까요?</h2>
                    <p className="text-[12px] text-slate-400 font-bold opacity-80">제작하려는 이모티콘의 종류를 선택하여 검증을 시작합니다.</p>
                </header>

                {/* 카드 그리드: 전체 너비 제한 및 간격 축소 (gap-5 -> gap-4) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-6 max-w-[1100px]">
                    {emoticonTypes.map((type) => (
                        <div
                            key={type.id}
                            onClick={() => onSelect(type.id)}
                            className="group relative bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-yellow-400 hover:-translate-y-1 transition-all cursor-pointer overflow-hidden text-left"
                        >
                            {/* 배경 아이콘 크기 더 축소 */}
                            <div className="absolute -right-2 -bottom-2 text-6xl opacity-[0.03] group-hover:scale-105 transition-transform select-none">
                                {type.icon}
                            </div>

                            {/* 아이콘 및 텍스트 크기 한 단계 더 하향 */}
                            <div className="text-2xl mb-4">{type.icon}</div>

                            <h3 className="text-[15px] font-extrabold text-slate-800 mb-1 tracking-tight">{type.title}</h3>
                            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed font-bold opacity-90">{type.desc}</p>

                            <div className="inline-block px-2 py-0.5 bg-slate-100 rounded-full text-[8px] font-extrabold text-slate-500 uppercase tracking-widest group-hover:bg-yellow-100 group-hover:text-yellow-600 transition-colors">
                                {type.spec}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onBack}
                    className="mt-8 text-[12px] text-slate-400 font-bold hover:text-slate-600 transition-colors"
                >
                    ← 처음으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default TypeSelectionView;