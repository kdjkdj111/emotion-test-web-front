import React from 'react';

const StartView = ({ onStart }) => (
    // [UPDATE] font-sans 및 tracking-tight 적용
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-900 animate-fade-in overflow-hidden relative font-sans tracking-tight">

        {/* 웹폰트 주입: 차분하고 신뢰감 있는 Pretendard 스타일 */}
        <style>
            {`
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                .font-studio { 
                    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                }
            `}
        </style>

        <div className="font-studio z-10 text-center px-6 flex flex-col items-center">
            {/* 배경 디테일 */}
            <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-yellow-200/30 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-[100px]"></div>

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

            {/* 상단 뱃지: font-extrabold로 강조 */}
            <div className="inline-block px-4 py-1.5 mb-8 border border-yellow-200 rounded-full bg-yellow-100/50 text-yellow-700 text-xs font-extrabold tracking-widest uppercase shadow-sm">
                v1.0 Beta Simulator
            </div>

            {/* 메인 타이틀: font-extrabold와 tracking-tighter로 시각적 밀도 확보 */}
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tighter text-slate-900">
                Emoticon <span className="text-yellow-400 drop-shadow-sm">Lab</span>
            </h1>

            {/* 서브 설명: font-bold로 본문 가독성 상향 */}
            <p className="text-slate-500 text-lg md:text-xl mb-12 font-bold leading-relaxed max-w-2xl mx-auto opacity-90">
                카카오 이모티콘 규격 검증 및 <br/>
                <span className="text-slate-800">실시간 듀얼 시뮬레이션</span> 환경을 경험하세요.
            </p>

            {/* 버튼: 텍스트 두께 조절 */}
            <button
                onClick={onStart}
                className="group relative inline-flex items-center justify-center px-12 py-5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-xl font-extrabold rounded-[24px] transition-all shadow-xl shadow-yellow-200/50 transform hover:-translate-y-1 active:scale-95"
            >
                테스트 시작하기
                <span className="ml-3 transition-transform group-hover:translate-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </span>
            </button>

            {/* 하단 푸터 장식 */}
            <div className="mt-16 text-slate-400 text-sm font-bold tracking-tight opacity-60">
                @_dongjunnn
            </div>
        </div>
    </div>
);

export default StartView;