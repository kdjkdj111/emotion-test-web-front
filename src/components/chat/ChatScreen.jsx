import React, { useState, useEffect, useRef } from 'react';

const ChatScreen = ({ isMyPhone, messages, previews, onSendText, onSendEmoticon, setStep }) => {
    const [inputText, setInputText] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const handleSend = () => {
        if (inputText.trim()) {
            onSendText(inputText);
            setInputText("");
        }
    };

    return (
        <div className="w-full h-full bg-[#BACEE0] flex flex-col relative overflow-hidden text-left">
            <div className="flex items-center justify-between p-4 bg-[#BACEE0]/90 backdrop-blur-sm sticky top-0 z-10">
                {isMyPhone ? <button onClick={() => setStep('upload')} className="text-2xl hover:scale-110">⬅</button> : <div className="w-8"></div>}
                <h2 className="font-bold text-base text-slate-800">{isMyPhone ? '내 휴대폰' : '상대방 휴대폰'}</h2>
                <div className="w-8"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((msg) => {
                    const isMe = (isMyPhone && msg.sender === 'A') || (!isMyPhone && msg.sender === 'B');
                    return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}>
                            {!isMe && <span className="text-[10px] text-slate-600 mb-1 ml-1 font-medium">{msg.sender === 'A' ? '상대방' : '상대방'}</span>}
                            <div className={`flex items-end space-x-1 ${isMe ? '' : 'flex-row-reverse space-x-reverse'}`}>
                                <span className="text-[9px] text-slate-500 pb-1">{msg.time}</span>
                                {msg.type === 'text' ? (
                                    <div className={`p-2.5 rounded-2xl text-sm shadow-sm max-w-[200px] break-all ${isMe ? 'bg-[#FEE500] text-slate-900 rounded-tr-sm' : 'bg-white text-slate-900 rounded-tl-sm'}`}>{msg.content}</div>
                                ) : (
                                    <div className="max-w-[140px] py-1"><img src={msg.content} alt="sticker" className="w-full h-auto object-contain" /></div>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>

            {showPicker && (
                <div className="absolute bottom-[70px] left-0 right-0 bg-[#EAEBEF] border-t border-slate-200 z-20 animate-slide-up h-60 overflow-y-auto p-4">
                    <div className="grid grid-cols-4 gap-3">
                        {previews.map((url, i) => (
                            <div key={i} onClick={() => { onSendEmoticon(i); setShowPicker(false); }} className="aspect-square p-2 hover:bg-white rounded-xl cursor-pointer shadow-sm bg-slate-50">
                                <img src={url} alt="" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="p-3 bg-white flex items-center border-t border-slate-100">
                <button onClick={() => setShowPicker(!showPicker)} className={`text-2xl mr-3 ${showPicker ? 'text-slate-800' : 'text-slate-400'}`}>😊</button>
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="메시지 입력" className="flex-1 bg-slate-100 rounded-2xl px-3 py-2 text-sm focus:outline-none" />
                <button onClick={handleSend} disabled={!inputText.trim()} className={`ml-3 font-bold text-sm px-4 py-2 rounded-xl transition-all ${inputText.trim() ? 'bg-[#FEE500]' : 'bg-slate-100 text-slate-300'}`}>전송</button>
            </div>
        </div>
    );
};

export default ChatScreen;