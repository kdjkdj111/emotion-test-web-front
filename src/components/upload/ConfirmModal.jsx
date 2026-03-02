import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        // [FIX] 배경 블러와 암전 효과를 상향하여 모달에 집중하게 함
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4 animate-fade-in" onClick={onCancel}>

            {/* 웹폰트 주입: 전체 일관성을 위한 Pretendard 스타일 */}
            <style>
                {`
                    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                    .font-studio { 
                        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important; 
                    }
                `}
            </style>

            <div
                className="font-studio bg-white rounded-[2.5rem] w-full max-w-[380px] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform transition-all animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="text-center">
                    {/* [UPDATE] 경고 아이콘 영역 디자인 개선 */}
                    <div className="bg-red-50 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-3xl shadow-inner border border-red-100/50 animate-bounce-subtle">
                        ⚠️
                    </div>

                    {/* [UPDATE] 타이포그래피: font-extrabold 및 tracking-tighter 적용 */}
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tighter">
                        {title}
                    </h3>
                    <p className="text-slate-500 font-bold leading-relaxed mb-10 text-[15px] break-keep opacity-90">
                        {message}
                    </p>
                </div>

                {/* [UPDATE] 버튼 레이아웃: 더 굵고 직관적인 디자인 */}
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 font-extrabold rounded-2xl transition-all active:scale-95"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-extrabold rounded-2xl shadow-xl shadow-red-200/50 transition-all active:scale-95"
                    >
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;