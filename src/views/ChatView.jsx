import React, { useState } from 'react';
import ChatScreen from '../components/chat/ChatScreen';

const ChatView = ({ files, previews, setStep }) => {
    const [messages, setMessages] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [chatBgColor, setChatBgColor] = useState('#bacee0');

    const sendMessage = (type, content, sender) => {
        setMessages(prev => [...prev, {
            id: Date.now(), type, content, sender,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        }]);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 animate-fade-in relative overflow-hidden text-left">
            {/* 배경 블러 효과 */}
            <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-yellow-200/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-100/30 rounded-full blur-[100px]"></div>

            {/* 1. 헤더: pt-12를 주어 크롬 툴바 아래로 확실히 내림 */}
            <header className="flex-shrink-0 z-20 flex items-end justify-between px-10 pt-14 pb-6 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => setStep('upload')}
                        className="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500 border border-slate-100 shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div>
                        <span className="text-slate-900 text-base font-black tracking-tight">시뮬레이션 모드</span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Visibility Environment</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* 종료 버튼: 가독성과 접근성을 높임 */}
                    <button onClick={() => setStep('upload')} className="px-6 py-2.5 bg-red-50 text-red-600 text-xs font-black rounded-xl border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        EXIT SIMULATOR
                    </button>
                </div>
            </header>

            {/* 2. 메인: flex-1과 justify-center로 폰들을 화면 정중앙에 배치 */}
            <main className="flex-1 min-h-0 flex items-center justify-center p-8 z-10">

                <div className="flex gap-12 items-center justify-center w-full max-w-7xl h-full">

                    {/* User A Device: 중앙 집중도를 높이기 위해 사이즈와 여백 조절 */}
                    <div className="flex-shrink-1 group relative flex flex-col items-center">
                        <span className="mb-4 text-[11px] font-black text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm uppercase tracking-widest">A: SENDER</span>
                        <div className="w-[320px] lg:w-[350px] aspect-[9/19] max-h-[70vh] bg-white rounded-[3.5rem] border-[12px] border-slate-900 overflow-hidden relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-all hover:scale-[1.02]">
                            <ChatScreen isMyPhone={true} messages={messages} previews={previews} onSendText={(t)=>sendMessage('text',t,'A')} onSendEmoticon={(i)=>sendMessage('emoticon',previews[i],'A')} setStep={setStep} />
                        </div>
                    </div>

                    {/* User B Device */}
                    <div className="flex-shrink-1 group relative flex flex-col items-center">
                        <span className="mb-4 text-[11px] font-black text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm uppercase tracking-widest">B: RECEIVER</span>
                        <div className="w-[320px] lg:w-[350px] aspect-[9/19] max-h-[70vh] bg-white rounded-[3.5rem] border-[12px] border-slate-900 overflow-hidden relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-all hover:scale-[1.02]">
                            <ChatScreen isMyPhone={false} messages={messages} previews={previews} onSendText={(t)=>sendMessage('text',t,'B')} onSendEmoticon={(i)=>sendMessage('emoticon',previews[i],'B')} setStep={setStep} />
                        </div>
                    </div>

                    {/* 3. 사이드 툴바: 우측에 작게 플로팅 스타일로 배치 */}
                    <aside className="hidden 2xl:flex flex-col gap-4 p-4 bg-white/90 border border-slate-200 rounded-[2rem] shadow-xl backdrop-blur-md">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-4 bg-slate-100 rounded-2xl hover:bg-yellow-100 transition-colors" title="Toggle Mode">
                            {isDarkMode ? '🌙' : '☀️'}
                        </button>
                        <div className="w-10 h-[1px] bg-slate-200 mx-auto"></div>
                        <div className="flex flex-col gap-2">
                            {['#bacee0', '#ffffff', '#222222'].map(color => (
                                <div key={color} onClick={() => setChatBgColor(color)} className="w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-md" style={{backgroundColor: color}}></div>
                            ))}
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default ChatView;