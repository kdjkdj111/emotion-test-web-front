import React, { useState, useEffect, useRef } from 'react';

const ChatScreen = ({ isMyPhone, messages, previews, onSendText, onSendEmoticon, setStep, theme }) => {
    const [inputText, setInputText] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const chatEndRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // 메시지 추가 및 피커 토글 시 스크롤 최하단 유지
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, showPicker]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const handleSend = () => {
        if (inputText.trim()) {
            onSendText(inputText);
            setInputText("");
        }
    };

    const styles = {
        LIGHT: {
            bg: '#BACEE0', header: '#BACEE0', inputBg: '#FFFFFF',
            textMain: 'text-slate-900', textSub: 'text-slate-500',
            me: 'bg-[#FEE500] text-slate-900', other: 'bg-white text-slate-900'
        },
        DARK: {
            bg: '#2C2C2C', header: '#2C2C2C', inputBg: '#1E1E1E',
            textMain: 'text-white', textSub: 'text-gray-400',
            me: 'bg-[#FAE100] text-slate-900', other: 'bg-[#424242] text-white'
        },
        BLACK: {
            bg: '#000000', header: '#000000', inputBg: '#111111',
            textMain: 'text-gray-200', textSub: 'text-gray-500',
            me: 'bg-[#2C2C2C] text-gray-200', other: 'bg-[#191919] text-gray-300'
        },
        YELLOW: {
            bg: '#FEE500', header: '#FEE500', inputBg: '#FFFFFF',
            textMain: 'text-slate-900', textSub: 'text-slate-700',
            me: 'bg-white text-slate-900 shadow-sm', other: 'bg-white text-slate-900 shadow-sm'
        },
        WHITE: {
            bg: '#FFFFFF', header: '#FFFFFF', inputBg: '#F2F2F2',
            textMain: 'text-slate-900', textSub: 'text-slate-500',
            me: 'bg-[#FEE500] text-slate-900 shadow-sm', other: 'bg-white text-slate-900 shadow-sm'
        }
    };

    const s = styles[theme?.id] || styles.LIGHT;

    return (
        <div className="w-full h-full flex flex-col  relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: s.bg }}>

            <div className={`flex-shrink-0 h-11 px-7 flex items-end pb-[12px] justify-between z-50 transition-all ${theme?.isDark ? 'text-white/95' : 'text-slate-900'}`}>

                {/* 1. 왼쪽: 시간 (13px Black Weight 적용) */}
                <div className="flex-1 text-left pl-5 text-[13px] font-black tracking-tighter leading-none opacity-95">
                    {formatTime(currentTime)}
                </div>

                {/* 중앙: 다이내믹 아일랜드 여백 */}
                <div className="w-24"></div>

                {/* 2. 오른쪽: 13px 체급에 맞춘 아이콘 그룹 */}
                <div className="flex-1 flex items-center justify-end gap-1.5 pr-0.5">

                    {/* (A) 안테나: 13px 텍스트와 시각적 높이를 맞추기 위해 h-[12px]로 상향 */}
                    <div className="flex items-end gap-[1.5px] h-[12px] mb-[0.5px]">
                        <div className="w-[3.2px] h-[35%] bg-current rounded-[1.2px]"></div>
                        <div className="w-[3.2px] h-[55%] bg-current rounded-[1.2px]"></div>
                        <div className="w-[3.2px] h-[80%] bg-current rounded-[1.2px]"></div>
                        <div className="w-[3.2px] h-[100%] bg-current rounded-[1.2px] opacity-30"></div>
                    </div>

                    {/* (B) 5G 라벨: 요청하신 13px Black 스타일 */}
                    <span className="text-[13px] font-black tracking-tighter leading-none mb-[0.5px] opacity-95">5G</span>

                    {/* (C) 배터리: 13px 텍스트와 위아래 정렬이 맞도록 h-[12.5px]로 정밀 수정 */}
                    <div className="relative flex items-center ml-0.5 mb-[0.5px]">
                        {/* 배터리 몸체: 테두리 두께와 둥근 모서리 최적화 */}
                        <div className="w-[24px] h-[12.5px] border-[1.6px] border-current rounded-[4px] p-[1.2px] flex items-center shadow-sm">
                            <div
                                className="h-full bg-current rounded-[1.8px]"
                                style={{ width: '85%' }}
                            ></div>
                        </div>
                        {/* 배터리 캡: 본체 크기에 맞춰 비율 조정 */}
                        <div className="w-[1.5px] h-[4.5px] bg-current ml-[1.2px] rounded-r-[1.2px] opacity-60"></div>
                    </div>
                </div>
            </div>

            {/* 1. 헤더: transition-colors duration-500을 추가하여 부드러운 테마 전환 구현 */}
            <div
                className="flex-shrink-0 flex items-center justify-between px-4 h-8 z-20 transition-colors duration-500"
                style={{ backgroundColor: `${s.header}E6` }}
            >
                {isMyPhone ? (
                    <button onClick={() => setStep('upload')} className={`p-1 rounded-full transition-colors ${s.textMain}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                ) : <div className="w-6"></div>}

                <h2 className={`text-[13px] font-bold tracking-tight transition-colors duration-500 ${s.textMain}`}>
                    {/* 텍스트 색상 전환도 부드럽게 하기 위해 transition 추가 */}
                    {isMyPhone ? '내 휴대폰' : '상대방'}
                </h2>
                <div className="w-6"></div>
            </div>

            {/* 2. 채팅 메인 영역 (flex-1로 유연하게 조절) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-hide">
                {messages.map((msg) => {
                    const isMe = (isMyPhone && msg.sender === 'A') || (!isMyPhone && msg.sender === 'B');
                    return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}>
                            {!isMe && <span className={`text-[10px] mb-1.5 ml-1 font-bold opacity-80 ${s.textSub}`}>{msg.sender === 'A' ? '나' : '상대방'}</span>}
                            <div className={`flex items-end gap-1.5 ${isMe ? 'flex-row' : 'flex-row-reverse'}`}>
                                <span className={`text-[9px] mb-0.5 leading-none font-medium opacity-60 ${s.textSub}`}>{msg.time}</span>
                                {msg.type === 'text' ? (
                                    <div className={`px-3 py-2 rounded-[1.25rem] text-[13px] font-medium shadow-sm max-w-[210px] break-all ${isMe ? s.me + ' rounded-tr-none' : s.other + ' rounded-tl-none'}`}>{msg.content}</div>
                                ) : (
                                    <div className="max-w-[150px] py-1 transition-transform active:scale-95">
                                        <img src={msg.content} alt="sticker" className="w-full h-auto object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>

            {/* 3. 하단 인터페이스 컨테이너 (입력바 + 피커) */}
            <div className="flex-shrink-0 flex flex-col transition-all duration-300 z-40 border-none" style={{ backgroundColor: s.inputBg }}>

                {/* (A) 입력창 영역: 피커 상태에 따라 하단 패딩이 부드럽게 변함 */}
                <div className={`pt-2 px-2 flex items-center gap-1.5 transition-all duration-300 ease-in-out ${showPicker ? 'pb-2' : 'pb-9'}`}>
                    <button className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${theme?.isDark ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    </button>

                    <div className={`flex-1 flex items-center rounded-[18px] px-3.5 py-1 transition-colors ${theme?.isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                        <input
                            type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="메시지 입력"
                            className={`w-0 flex-1 bg-transparent text-[13px] focus:outline-none ${theme?.isDark ? 'text-white' : 'text-slate-900'}`}
                        />
                        <button onClick={() => setShowPicker(!showPicker)} className={`ml-1.5 transition-opacity ${showPicker ? 'opacity-100' : 'opacity-40'} ${s.textMain}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5.5 h-5.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm6 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z" /></svg>
                        </button>
                    </div>

                    <button onClick={handleSend} disabled={!inputText.trim()} className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all ${inputText.trim() ? 'bg-[#FEE500] text-slate-900' : theme?.isDark ? 'bg-white/10 text-white/20' : 'bg-slate-100 text-slate-300'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
                    </button>
                </div>

                {/* (B) 이모티콘 피커 영역: height 애니메이션 적용 */}
                <div
                    className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${showPicker ? 'h-[340px] opacity-100' : 'h-0 opacity-0'}`}
                    style={{ backgroundColor: theme?.isDark ? '#1e1e1e' : '#f6f6f6' }}
                >
                    {/* 내부 콘텐츠는 동일 */}
                    <div className="flex justify-center py-2 flex-shrink-0">
                        <div className="w-9 h-1 bg-slate-300 rounded-full opacity-40"></div>
                    </div>

                    <div className="flex-shrink-0 w-full px-4 pb-0">
                        <div className="flex justify-center items-center bg-black/5 dark:bg-white/5 rounded-full p-1 max-w-[100px] mx-auto">
                            <button className={`flex-1 py-1.5 text-[12px] font-bold rounded-full transition-all ${theme?.isDark ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm'}`}>
                                이모티콘
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center items-center px-4 py-1.5">
                        <div className={`w-9 h-9 flex items-center justify-center rounded-xl p-1.5 transition-all transform hover:scale-105 ${theme?.isDark ? 'bg-white/5 border border-white/5' : 'bg-white shadow-md border border-slate-100'}`}>
                            <img src={previews[0]} alt="current-set" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto min-h-0 p-4 scrollbar-hide">
                        <div className="grid grid-cols-4 gap-y-7 gap-x-4">
                            {previews.map((url, i) => (
                                <div key={i} onClick={() => onSendEmoticon(i)} className="aspect-square cursor-pointer active:scale-90 transition-transform flex items-center justify-center group">
                                    <img src={url} alt={`emo-${i}`} className="w-full h-auto max-h-full object-contain drop-shadow-sm group-hover:drop-shadow-md" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-8 flex-shrink-0" />
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;