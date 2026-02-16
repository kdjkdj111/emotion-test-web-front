import React from 'react';

const TypeSelectionView = ({ onSelect, onBack }) => {
    // 이모티콘 종류 데이터
    const emoticonTypes = [
        { id: 'STILL', title: '정지형 이모티콘', desc: '움직임이 없는 PNG 파일', spec: '360 x 360 px', icon: '🖼️' },
        { id: 'ANIMATED', title: '움직이는 이모티콘', desc: '생동감 넘치는 GIF/APNG', spec: '360 x 360 px', icon: '🎬' },
        { id: 'LARGE', title: '큰 이모티콘', desc: '압도적인 크기의 이모티콘', spec: '가변 규격 (최대 540px)', icon: '🐘' },
        { id: 'MINI', title: '미니 이모티콘', desc: '말풍선 속 작은 포인트', spec: '144 x 144 px', icon: '💎' },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50 animate-fade-in p-6">
            <header className="text-center mb-12">
                <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">어떤 이모티콘을 만들까요?</h2>
                <p className="text-slate-500 font-medium">제작하려는 이모티콘의 종류를 선택하면 맞춤형 검증을 시작합니다.</p>
            </header>

            {/* 카드 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
                {emoticonTypes.map((type) => (
                    <div
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-yellow-400 hover:-translate-y-2 transition-all cursor-pointer overflow-hidden text-left"
                    >
                        {/* 카드 배경 데코레이션 */}
                        <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:scale-110 transition-transform">
                            {type.icon}
                        </div>

                        <div className="text-4xl mb-6">{type.icon}</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{type.title}</h3>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">{type.desc}</p>

                        <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-yellow-100 group-hover:text-yellow-600 transition-colors">
                            {type.spec}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onBack}
                className="mt-12 text-slate-400 font-bold hover:text-slate-600 transition-colors"
            >
                ← 처음으로 돌아가기
            </button>
        </div>
    );
};

export default TypeSelectionView;