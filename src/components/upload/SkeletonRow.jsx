import React from 'react';

const SkeletonRow = () => {
    return (
        /* [FIX] p-4 -> p-3.5로 축소하여 실제 로드될 리스트와 높이 일치 */
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-white animate-pulse shadow-sm">
            <div className="flex items-center space-x-2.5 w-full">
                {/* 번호 아이콘 자리: w-5 -> w-4 */}
                <div className="w-4 h-4 bg-slate-200 rounded-md shrink-0"></div>

                {/* 파일명 텍스트 자리: h-4 -> h-3.5 */}
                <div className="h-3.5 bg-slate-100 rounded-md w-3/5"></div>
            </div>

            {/* 상태 라벨 자리: w-12/h-6 -> w-10/h-5 */}
            <div className="w-10 h-5 bg-slate-100 rounded-md shrink-0"></div>
        </div>
    );
};

export default SkeletonRow;