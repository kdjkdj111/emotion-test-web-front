import React from 'react';

const StartView = ({ onStart }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-[#111827] text-white animate-fade-in overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="z-10 text-center">
            <div className="inline-block px-4 py-1.5 mb-6 border border-yellow-400/30 rounded-full bg-yellow-400/5 text-yellow-400 text-xs font-bold tracking-widest uppercase">v1.0 Beta Simulator</div>
            <h1 className="text-6xl font-black mb-6 tracking-tighter">Emoticon <span className="text-yellow-400">Lab</span></h1>
            <p className="text-slate-400 text-lg mb-12 font-medium leading-relaxed">카카오 이모티콘 규격 검증 및 <br/>실시간 듀얼 시뮬레이션 환경을 경험하세요.</p>
            <button onClick={onStart} className="group relative inline-flex items-center justify-center px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-xl font-black rounded-2xl transition-all shadow-lg transform hover:-translate-y-1 active:scale-95">
                테스트 시작하기 <span className="ml-3 transition-transform group-hover:translate-x-2">→</span>
            </button>
        </div>
    </div>
);

export default StartView;