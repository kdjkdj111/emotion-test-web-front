import React, { useState } from 'react';
import ChatScreen from '../components/chat/ChatScreen';

const ChatView = ({ files, previews, setStep, handleReset }) => {
    const [messages, setMessages] = useState([]);

    const themes = {
        LIGHT:  { id: 'LIGHT',  name: '라이트 모드', color: '#BACEE0', isDark: false },
        DARK:   { id: 'DARK',   name: '다크 모드', color: '#2C2C2C', isDark: true },
        YELLOW: { id: 'YELLOW', name: '옐로우', color: '#FEE500', isDark: false },
        WHITE:  { id: 'WHITE',  name: '화이트', color: '#FFFFFF', isDark: false },
        BLACK:  { id: 'BLACK',  name: '블랙', color: '#000000', isDark: true }
    };

    const [senderTheme, setSenderTheme] = useState(themes.LIGHT);
    const [receiverTheme, setReceiverTheme] = useState(themes.DARK);
    const [activeTab, setActiveTab] = useState('SENDER');

    const sendMessage = (type, content, sender) => {
        setMessages(prev => [...prev, {
            id: Date.now(), type, content, sender,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        }]);
    };

    const editingTheme = activeTab === 'SENDER' ? senderTheme : receiverTheme;
    const setEditingTheme = activeTab === 'SENDER' ? setSenderTheme : setReceiverTheme;

    return (
        <div className="flex flex-col h-screen bg-[#F1F5F9] animate-fade-in relative overflow-hidden text-left font-sans tracking-tight">
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    .font-studio { 
                        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                    }
                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>

            <div className="font-studio flex flex-col h-full w-full">
                {/* 상단 네비게이션: 좌우 여백을 줄여 전체적인 응집력 강화 */}
                <header className="flex-shrink-0 z-30 flex items-center justify-between px-6 h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setStep('upload')} className="px-4 py-2 bg-white hover:bg-slate-900 rounded-xl transition-all duration-300 border border-slate-200 shadow-sm active:scale-95 group">
                            <span className="text-[10px] font-bold group-hover:text-white transition-colors tracking-tighter">← 업로드 화면으로</span>
                        </button>
                        <div>
                            <span className="text-slate-900 text-base font-extrabold tracking-tighter">시뮬레이션 모드</span>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest opacity-80 leading-none">이모티콘 실제 적용 및 테마 가독성 정밀 검수</p>
                        </div>
                    </div>
                    <button onClick={handleReset}
                            className="px-4 py-2 bg-red-50 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">테스트 종료</button>
                </header>

                {/* 메인 영역: max-w-7xl을 추가하여 너무 벌어지지 않게 고정하고 mx-auto로 중앙 정렬 */}
                <main className="flex-1 flex items-center justify-center p-4 gap-4 overflow-hidden max-w-[1400px] mx-auto w-full">

                    {/* [1/3] LEFT: 보내는 사람 */}
                    <section className="flex-1 flex flex-col items-center gap-3 animate-slide-right min-w-0">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full border border-slate-200 shadow-sm transition-all">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">보내는 사람</span>
                        </div>

                        <div className="relative transform scale-[0.8] transition-transform duration-500 origin-center -my-10">
                            <div className="absolute -left-[2px] top-24 w-[2.5px] h-6 bg-[#1a1a1b] rounded-l-sm z-0 opacity-90"></div>
                            <div className="absolute -left-[2px] top-36 w-[2.5px] h-16 bg-[#1a1a1b] rounded-l-sm z-0 opacity-90"></div>
                            <div className="absolute -right-[2px] top-36 w-[2.5px] h-12 bg-[#1a1a1b] rounded-r-sm z-0 opacity-90"></div>

                            <div className="w-[300px] aspect-[9/19] bg-[#1a1a1b] rounded-[3.5rem] p-[6px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] ring-1 ring-white/10 relative z-10">
                                <div
                                    className="w-full h-full rounded-[3.1rem] overflow-hidden relative ring-1 ring-inset ring-black/10 shadow-inner transition-colors duration-500"
                                    style={{ backgroundColor: senderTheme.color }}
                                >
                                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-22 h-5 bg-black rounded-[2rem] z-50 flex items-center px-3 shadow-lg">
                                        <div className="ml-auto w-2 h-2 rounded-full bg-[#111] border border-white/5 flex items-center justify-center">
                                            <div className="w-1 h-1 rounded-full bg-indigo-500/10"></div>
                                        </div>
                                    </div>

                                    <ChatScreen
                                        isMyPhone={true}
                                        messages={messages}
                                        previews={previews}
                                        onSendText={(t)=>sendMessage('text',t, 'A')}
                                        onSendEmoticon={(i)=>sendMessage('emoticon',previews[i], 'A')}
                                        setStep={setStep}
                                        theme={senderTheme}
                                    />
                                    <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full z-50 transition-colors ${senderTheme.isDark ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* [2/3] CENTER: 설정 패널 (폭을 더 좁게 조정하여 중앙 배치 최적화) */}
                    <aside className="w-[260px] flex-shrink-0 h-[85%] max-h-[600px] bg-white border border-slate-200 rounded-[1.5rem] shadow-[0_15px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col z-20">
                        <div className="flex p-1.5 bg-slate-50 border-b border-slate-100">
                            {['보내는 사람', '받는 사람'].map((label, idx) => {
                                const tabKey = idx === 0 ? 'SENDER' : 'RECEIVER';
                                return (
                                    <button key={tabKey} onClick={() => setActiveTab(tabKey)} className={`flex-1 py-2 text-[10px] font-bold transition-all duration-300 rounded-[1.2rem] ${activeTab === tabKey ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>
                                        {label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex-1 p-5 overflow-y-auto scrollbar-hide">
                            <div className="mb-6 flex flex-col gap-1">
                                <h3 className="text-[13px] font-extrabold text-slate-900 uppercase tracking-widest">상세 설정</h3>
                                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{activeTab === 'SENDER' ? '보내는 사람' : '받는 사람'} 환경 편집 중</p>
                            </div>

                            <section className="space-y-6">
                                <div>
                                    <label className="block ml-1 mb-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">시스템 설정</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button onClick={() => setEditingTheme(themes.LIGHT)} className={`py-2.5 rounded-xl text-[9px] font-bold transition-all duration-300 border ${editingTheme.id === 'LIGHT' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}>☀️ 라이트</button>
                                        <button onClick={() => setEditingTheme(themes.DARK)} className={`py-2.5 rounded-xl text-[9px] font-bold transition-all duration-300 border ${editingTheme.id === 'DARK' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}>🌙 다크</button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block ml-1 mb-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">색상 테마</label>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {[themes.YELLOW, themes.WHITE, themes.BLACK].map((p) => (
                                            <button key={p.id} onClick={() => setEditingTheme(p)} className={`group flex flex-col items-start gap-2.5 p-3 rounded-2xl border-2 transition-all duration-300 ${editingTheme.id === p.id ? 'border-blue-500 bg-blue-50/30 shadow-sm scale-[1.02]' : 'border-slate-50 bg-white hover:border-slate-200'}`}>
                                                <div className="w-8 h-8 rounded-xl shadow-inner transition-transform group-hover:scale-105" style={{backgroundColor: p.color}}></div>
                                                <span className={`text-[9px] font-bold uppercase ${editingTheme.id === p.id ? 'text-blue-600' : 'text-slate-500'}`}>{p.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </aside>

                    {/* [3/3] RIGHT: 받는 사람 */}
                    <section className="flex-1 flex flex-col items-center gap-3 animate-slide-left opacity-90 min-w-0">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full border border-slate-200 shadow-sm transition-all">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">받는 사람</span>
                        </div>

                        <div className="relative transform scale-[0.8] transition-transform duration-500 origin-center -my-10">
                            <div className="absolute -left-[2px] top-24 w-[2.5px] h-6 bg-[#1a1a1b] rounded-l-sm z-0 opacity-90"></div>
                            <div className="absolute -left-[2px] top-36 w-[2.5px] h-16 bg-[#1a1a1b] rounded-l-sm z-0 opacity-90"></div>
                            <div className="absolute -right-[2px] top-36 w-[2.5px] h-12 bg-[#1a1a1b] rounded-r-sm z-0 opacity-90"></div>

                            <div className="w-[300px] aspect-[9/19] bg-[#1a1a1b] rounded-[3.5rem] p-[6px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] ring-1 ring-white/10 relative z-10">
                                <div
                                    className="w-full h-full rounded-[3.1rem] overflow-hidden relative ring-1 ring-inset ring-black/10 shadow-inner transition-colors duration-500"
                                    style={{ backgroundColor: receiverTheme.color }}
                                >
                                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-22 h-5 bg-black rounded-[2rem] z-50 flex items-center px-3 shadow-lg">
                                        <div className="ml-auto w-2 h-2 rounded-full bg-[#111] border border-white/5 flex items-center justify-center">
                                            <div className="w-1 h-1 rounded-full bg-indigo-500/10"></div>
                                        </div>
                                    </div>

                                    <ChatScreen
                                        isMyPhone={false}
                                        messages={messages}
                                        previews={previews}
                                        onSendText={(t)=>sendMessage('text',t, 'B')}
                                        onSendEmoticon={(i)=>sendMessage('emoticon',previews[i], 'B')}
                                        setStep={setStep}
                                        theme={receiverTheme}
                                    />
                                    <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full z-50 transition-colors ${receiverTheme.isDark ? 'bg-white/20' : 'bg-black/10'}`}></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default ChatView;