import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
                <div className="text-center">
                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">⚠️</div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">{message}</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95"
                    >
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;