import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        // [FIX] 배경 블러와 암전 효과 유지, 애니메이션 최적화
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onCancel}>

            {/* 웹폰트 주입: 전체 일관성을 위한 Pretendard 스타일 */}
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    .font-studio { 
                        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                    }
                    @keyframes slide-up-subtle {
                        from { transform: translateY(15px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .animate-slide-up-subtle {
                        animation: slide-up-subtle 0.3s ease-out forwards;
                    }
                `}
            </style>

            {/* [UPDATE] 모달 너비 축소 (max-w-[380px] -> max-w-[310px]) 및 패딩 조정 */}
            <div
                className="font-studio bg-white rounded-[2rem] w-full max-w-[310px] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] transform transition-all animate-slide-up-subtle"
                onClick={e => e.stopPropagation()}
            >
                <div className="text-center">
                    {/* [UPDATE] 아이콘 영역 크기 축소 (80px -> 64px) */}
                    <div className="bg-red-50 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 text-2xl shadow-inner border border-red-100/50">
                        ⚠️
                    </div>

                    {/* [UPDATE] 타이포그래피 크기 하향 조정 (24px -> 20px) */}
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tighter">
                        {title}
                    </h3>
                    {/* [UPDATE] 메시지 폰트 크기 조정 (15px -> 13px) 및 여백 최적화 */}
                    <p className="text-slate-500 font-bold leading-relaxed mb-8 text-[13px] break-keep opacity-85 px-2">
                        {message}
                    </p>
                </div>

                {/* [UPDATE] 버튼 레이아웃: 높이 및 폰트 크기 축소 */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-500 text-[13px] font-extrabold rounded-xl transition-all active:scale-95"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white text-[13px] font-extrabold rounded-xl shadow-lg shadow-red-200/40 transition-all active:scale-95"
                    >
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;