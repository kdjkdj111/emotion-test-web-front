import React, { useState, useRef, useEffect } from 'react';

/**
 * [Component] StartView
 * @description 서비스의 첫 진입점. 깔끔하고 임팩트 있는 랜딩 페이지.
 */
const StartView = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#111827] text-white animate-fade-in overflow-hidden relative">
            {/* 배경 데코레이션 (추후 서버 연동 시 애니메이션 효과 추가 가능) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>

            <div className="z-10 text-center">
                <div className="inline-block px-4 py-1.5 mb-6 border border-yellow-400/30 rounded-full bg-yellow-400/5 text-yellow-400 text-xs font-bold tracking-widest uppercase">
                    v1.0 Beta Simulator
                </div>
                <h1 className="text-6xl font-black mb-6 tracking-tighter">
                    Emoticon <span className="text-yellow-400">Lab</span>
                </h1>
                <p className="text-slate-400 text-lg mb-12 font-medium leading-relaxed">
                    카카오 이모티콘 규격 검증 및 <br/>
                    실시간 듀얼 시뮬레이션 환경을 경험하세요.
                </p>
                <button
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-xl font-black rounded-2xl transition-all shadow-[0_20px_40px_rgba(250,204,21,0.2)] hover:shadow-[0_25px_50px_rgba(250,204,21,0.3)] transform hover:-translate-y-1 active:scale-95"
                >
                    테스트 시작하기
                    <span className="ml-3 transition-transform group-hover:translate-x-2">→</span>
                </button>
            </div>
        </div>
    );
};

/**
 * [Sub Component] ChatScreen
 * @description 개별 스마트폰 화면을 렌더링하는 컴포넌트
 */
const ChatScreen = ({ isMyPhone, messages, previews, onSendText, onSendEmoticon, setStep }) => {
    const [inputText, setInputText] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const chatEndRef = useRef(null);

    // 새 메시지 수신 시 하단 스크롤
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSendText(inputText);
            setInputText("");
        }
    };

    const handleSendClick = () => {
        onSendText(inputText);
        setInputText("");
    };

    const handleEmoticonClick = (index) => {
        onSendEmoticon(index);
        setShowPicker(false);
    };

    return (
        <div className="w-full h-full bg-[#BACEE0] flex flex-col relative overflow-hidden">
            {/* 상단 헤더: 뒤로가기 아이콘 복구 */}
            <div className="flex items-center justify-between p-4 bg-[#BACEE0]/90 backdrop-blur-sm sticky top-0 z-10">
                {isMyPhone ? (
                    <button onClick={() => setStep('upload')} className="text-2xl hover:scale-110 transition-transform">⬅</button>
                ) : (
                    <div className="w-8"></div>
                )}
                <h2 className="font-bold text-base text-slate-800">{isMyPhone ? '내 휴대폰' : '상대방 휴대폰'}</h2>
                <div className="w-8"></div>
            </div>

            {/* 채팅 대화 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                <div className="text-center my-3">
                    <span className="bg-black/10 text-white text-[10px] px-3 py-1 rounded-full font-medium">2026년 2월 3일</span>
                </div>

                {messages.map((msg) => {
                    /** * [로직 핵심]
                     * 왼쪽 폰(A)에서 보낸 건 왼쪽 폰에선 노란색(오른쪽), 오른쪽 폰에선 흰색(왼쪽)으로 보입니다.
                     */
                    const isMe = (isMyPhone && msg.sender === 'A') || (!isMyPhone && msg.sender === 'B');

                    return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}>
                            {!isMe && <span className="text-[10px] text-slate-600 mb-1 ml-1 font-medium">{msg.sender === 'A' ? '상대방' : '상대방'}</span>}
                            <div className={`flex items-end space-x-1 ${isMe ? '' : 'flex-row-reverse space-x-reverse'}`}>
                                <span className="text-[9px] text-slate-500 pb-1">{msg.time}</span>
                                {msg.type === 'text' ? (
                                    <div className={`p-2.5 rounded-2xl text-sm shadow-sm max-w-[200px] break-all ${isMe ? 'bg-[#FEE500] text-slate-900 rounded-tr-sm' : 'bg-white text-slate-900 rounded-tl-sm'}`}>
                                        {msg.content}
                                    </div>
                                ) : (
                                    <div className="max-w-[140px] py-1">
                                        <img src={msg.content} alt="sticker" className="w-full h-auto object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={chatEndRef} />
            </div>

            {/* 이모티콘 피커 */}
            {showPicker && (
                <div className="absolute bottom-[70px] left-0 right-0 bg-[#EAEBEF] border-t border-slate-200 z-20 animate-slide-up h-60 overflow-y-auto p-4">
                    <div className="grid grid-cols-4 gap-3">
                        {previews.map((url, i) => (
                            <div key={i} onClick={() => handleEmoticonClick(i)} className="aspect-square p-2 hover:bg-white rounded-xl cursor-pointer transition-colors shadow-sm bg-slate-50">
                                <img src={url} alt="" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* [수정] 하단 입력바: 양쪽 모두 전송 가능하게 변경 */}
            <div className="p-3 bg-white flex items-center border-t border-slate-100">
                <button onClick={() => setShowPicker(!showPicker)} className={`text-2xl mr-3 transition-colors ${showPicker ? 'text-slate-800' : 'text-slate-400'}`}>😊</button>
                <div className="flex-1 bg-slate-100 rounded-2xl flex items-center px-3 py-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="메시지 입력"
                        className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                </div>
                <button
                    onClick={handleSendClick}
                    disabled={!inputText.trim()}
                    className={`ml-3 font-bold text-sm px-4 py-2 rounded-xl transition-all ${inputText.trim() ? 'bg-[#FEE500] text-slate-900' : 'bg-slate-100 text-slate-300'}`}
                >
                    전송
                </button>
            </div>
        </div>
    );
};

/**
 * [Component] ChatView
 * @description 듀얼 폰 시뮬레이터 메인 컨테이너 (고급 스튜디오 테마)
 */
const ChatView = ({ files, previews, setStep }) => {
    const [messages, setMessages] = useState([]);

    const sendMessage = (type, content, sender) => {
        const newMsg = {
            id: Date.now(),
            type,
            content,
            sender,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        };
        setMessages(prev => [...prev, newMsg]);
    };

    return (
        <div className="flex flex-col h-screen bg-[#0F172A] animate-fade-in relative overflow-hidden">
            {/* 1. 배경 그리드 패턴 (디자인 툴 느낌) */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                opacity: 0.3
            }}></div>

            {/* 2. 상단 네비게이션 바 (Simulator 전용) */}
            <header className="z-20 flex items-center justify-between px-8 py-4 bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
                <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-slate-400 text-sm font-bold tracking-widest ml-4 border-l border-slate-700 pl-4 uppercase">
                        Dual-Device Simulator
                    </span>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="text-slate-400 text-xs font-medium">
                        Session: <span className="text-yellow-400">Live Syncing...</span>
                    </div>
                    <button
                        onClick={() => setStep('upload')}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors border border-slate-600"
                    >
                        Exit Simulator
                    </button>
                </div>
            </header>

            {/* 3. 메인 시뮬레이션 영역 */}
            <main className="flex-1 flex justify-center items-center gap-16 p-10 overflow-x-auto z-10">
                {/* 📱 내 휴대폰 (User A) */}
                <div className="flex flex-col items-center shrink-0">
                    <div className="mb-6 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-tighter">
                        Local Device (Sender)
                    </div>
                    <div className="w-[380px] h-[780px] bg-white shadow-[0_0_100px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.2)] rounded-[3.5rem] border-[14px] border-slate-800 overflow-hidden relative transition-transform hover:scale-[1.01]">
                        <ChatScreen
                            isMyPhone={true}
                            messages={messages}
                            previews={previews}
                            onSendText={(txt) => sendMessage('text', txt, 'A')}
                            onSendEmoticon={(idx) => sendMessage('emoticon', previews[idx], 'A')}
                            setStep={setStep}
                        />
                    </div>
                </div>

                {/* 중앙 연결 데코레이션 */}
                <div className="hidden xl:flex flex-col items-center text-slate-600">
                    <div className="w-1 h-20 bg-gradient-to-b from-blue-500/50 to-purple-500/50 rounded-full"></div>
                    <span className="my-4 font-black text-xs tracking-widest opacity-30">SYNC</span>
                    <div className="w-1 h-20 bg-gradient-to-t from-blue-500/50 to-purple-500/50 rounded-full"></div>
                </div>

                {/* 📱 상대방 휴대폰 (User B) */}
                <div className="flex flex-col items-center shrink-0">
                    <div className="mb-6 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-tighter">
                        Remote Device (Mirror)
                    </div>
                    <div className="w-[380px] h-[780px] bg-white shadow-[0_0_100px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.2)] rounded-[3.5rem] border-[14px] border-slate-800 overflow-hidden relative opacity-95 transition-transform hover:scale-[1.01]">
                        <ChatScreen
                            isMyPhone={false}
                            messages={messages}
                            previews={previews}
                            onSendText={(txt) => sendMessage('text', txt, 'B')}
                            onSendEmoticon={(idx) => sendMessage('emoticon', previews[idx], 'B')}
                            setStep={setStep}
                        />
                    </div>
                </div>
            </main>

            {/* 하단 정보 바 */}
            <footer className="z-20 px-8 py-3 bg-slate-900/80 backdrop-blur-md border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <div>Active Assets: {files.length} Files Loaded</div>
                <div>Internal Latency: 0.001ms (Local Loop)</div>
            </footer>
        </div>
    );
};


// --- App 메인 컴포넌트 (동일) ---
function App() {
    const [step, setStep] = useState('start');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const fileInputRef = useRef(null);

    const handleUploadClick = () => { fileInputRef.current?.click(); };
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length === 0) return;
        setFiles(prev => [...prev, ...selectedFiles].slice(0, 32));
        event.target.value = '';
    };
    const handleRemoveFile = (index) => { setFiles(prev => prev.filter((_, i) => i !== index)); };

    useEffect(() => {
        if (files.length === 0) { setPreviews([]); return; }
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
        return () => newPreviews.forEach(url => URL.revokeObjectURL(url));
    }, [files]);

    return (
        <div className="w-full h-screen overflow-hidden bg-white font-sans">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/png, image/gif" className="hidden" />
            {step === 'start' ? (
                <StartView onStart={() => setStep('upload')} />
            ) : step === 'upload' ? (
                <div className="flex h-full w-full overflow-hidden">
                    {/* 좌측: 업로드 & 그리드 (디자인 유지) */}
                    <div className="w-3/5 border-r border-slate-200 p-8 flex flex-col bg-slate-50 h-full">
                        <header className="mb-6"><h1 className="text-2xl font-bold text-slate-800">1. 이모티콘 업로드</h1></header>
                        <div onClick={handleUploadClick} className="flex-shrink-0 border-2 border-dashed border-slate-300 bg-white rounded-3xl p-10 text-center hover:border-yellow-400 hover:bg-yellow-50 transition-all cursor-pointer mb-10 group shadow-sm">
                            <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">✨</div>
                            <p className="text-slate-700 font-bold text-lg">새로운 이미지 추가</p>
                        </div>
                        <div className="grid grid-cols-4 gap-x-6 gap-y-12 overflow-y-auto flex-1 px-2 py-4 content-start min-h-0 scrollbar-hide">
                            {[...Array(32)].map((_, i) => (
                                <div key={`slot-${i}`} className="relative w-full aspect-square bg-white rounded-2xl border border-slate-200 shadow-sm transition-all group hover:border-yellow-400 hover:shadow-md">
                                    {previews[i] ? (
                                        <>
                                            <div className="absolute inset-0 p-4 flex items-center justify-center"><img src={previews[i]} alt="" className="max-w-full max-h-full object-contain" /></div>
                                            <div className="absolute -top-3 -left-3 bg-yellow-400 text-white text-[11px] font-black rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10 border-2 border-white">{i + 1}</div>
                                            <button onClick={(e) => { e.stopPropagation(); handleRemoveFile(i); }} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">✕</button>
                                        </>
                                    ) : <div className="absolute inset-0 flex items-center justify-center text-slate-200 font-black text-2xl bg-slate-50/50 rounded-2xl">{i + 1}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* 우측: 리포트 & 버튼 (디자인 유지) */}
                    <div className="w-2/5 bg-white p-10 flex flex-col h-full shadow-2xl z-10">
                        <h2 className="text-2xl font-black text-slate-800 mb-8">2. 분석 리포트</h2>
                        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-6 overflow-y-auto mb-8 shadow-inner">
                            {files.length === 0 ? <p className="text-slate-300 text-center mt-20 font-medium">업로드된 파일이 없습니다.</p> : (
                                <div className="space-y-3">
                                    {files.map((file, i) => (
                                        <div key={`list-${i}`} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="flex items-center space-x-3 truncate text-slate-700 font-semibold"><span className="text-yellow-500 font-black w-5">{i+1}</span>{file.name}</div>
                                            <button onClick={() => handleRemoveFile(i)} className="text-slate-300 hover:text-red-500 transition-colors">✕</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={() => setStep('chat')} disabled={files.length === 0} className={`w-full py-6 text-xl font-black rounded-3xl transition-all shadow-xl ${files.length > 0 ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900 transform hover:-translate-y-1' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>🚀 시뮬레이션 시작</button>
                    </div>
                </div>
            ) : (
                <ChatView files={files} previews={previews} setStep={setStep} />
            )}
        </div>
    );
}

export default App;