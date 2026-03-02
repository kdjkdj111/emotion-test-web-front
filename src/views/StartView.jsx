import React from 'react';

const StartView = ({ onStart }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-900 animate-fade-in overflow-hidden relative font-sans tracking-tight">

        <style>
            {`
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                .font-studio { 
                    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                }
            `}
        </style>

        <div className="font-studio z-10 text-center px-6 flex flex-col items-center">
            {/* 배경 블러 디테일 크기 축소 */}
            <div className="absolute top-[-5%] right-[-5%] w-[20%] h-[20%] bg-yellow-200/25 rounded-full blur-[60px]"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-[20%] h-[20%] bg-blue-100/30 rounded-full blur-[60px]"></div>

            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}></div>

            {/* 상단 뱃지: text-[10px] -> text-[9px] 및 여백 축소 */}
            <div className="inline-block px-2.5 py-1 mb-6 border border-yellow-200/60 rounded-full bg-yellow-100/40 text-yellow-700 text-[9px] font-extrabold tracking-[0.15em] uppercase shadow-sm">
                v1.0 Beta Simulator
            </div>

            {/* 메인 타이틀: text-5xl -> text-4xl(md:text-5xl)로 더 컴팩트하게 */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tighter text-slate-900">
                Emoticon <span className="text-yellow-400 drop-shadow-sm">Lab</span>
            </h1>

            {/* 서브 설명: text-base -> text-[14px]로 축소 및 투명도 조정 */}
            <p className="text-slate-500 text-[14px] md:text-[15px] mb-8 font-bold leading-relaxed max-w-md mx-auto opacity-80">
                카카오 이모티콘 규격 검증 및 <br/>
                <span className="text-slate-800">실시간 듀얼 시뮬레이션</span> 환경을 경험하세요.
            </p>

            {/* 버튼: 패딩과 폰트 크기 한 단계 더 다이어트 */}
            <button
                onClick={onStart}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-[16px] font-extrabold rounded-[16px] transition-all shadow-lg shadow-yellow-200/40 transform hover:-translate-y-0.5 active:scale-95"
            >
                테스트 시작하기
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </span>
            </button>

            {/* 하단 푸터: 간격 및 크기 축소 */}
            <div className="mt-12 text-slate-400 text-[10px] font-bold tracking-tight opacity-40">
                @_dongjunnn
            </div>
        </div>
    </div>
);

export default StartView;