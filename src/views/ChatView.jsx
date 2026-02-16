import React, { useState } from 'react';
import ChatScreen from '../components/chat/ChatScreen';

const ChatView = ({ files, previews, setStep }) => {
    const [messages, setMessages] = useState([]);

    const sendMessage = (type, content, sender) => {
        setMessages(prev => [...prev, {
            id: Date.now(), type, content, sender,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        }]);
    };

    return (
        <div className="flex flex-col h-screen bg-[#0F172A] animate-fade-in relative overflow-hidden">
            <header className="z-20 flex items-center justify-between px-8 py-4 bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
                <span className="text-slate-400 text-sm font-bold tracking-widest uppercase">Dual-Device Simulator</span>
                <button onClick={() => setStep('upload')} className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg border border-slate-600">Exit Simulator</button>
            </header>
            <main className="flex-1 flex justify-center items-center gap-16 p-10 overflow-x-auto z-10">
                {/* User A */}
                <div className="w-[380px] h-[780px] bg-white rounded-[3.5rem] border-[14px] border-slate-800 overflow-hidden relative shadow-2xl">
                    <ChatScreen isMyPhone={true} messages={messages} previews={previews} onSendText={(t)=>sendMessage('text',t,'A')} onSendEmoticon={(i)=>sendMessage('emoticon',previews[i],'A')} setStep={setStep} />
                </div>
                {/* User B */}
                <div className="w-[380px] h-[780px] bg-white rounded-[3.5rem] border-[14px] border-slate-800 overflow-hidden relative shadow-2xl opacity-95">
                    <ChatScreen isMyPhone={false} messages={messages} previews={previews} onSendText={(t)=>sendMessage('text',t,'B')} onSendEmoticon={(i)=>sendMessage('emoticon',previews[i],'B')} setStep={setStep} />
                </div>
            </main>
        </div>
    );
};

export default ChatView;