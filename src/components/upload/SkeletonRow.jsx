import React from 'react';

const SkeletonRow = () => {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white animate-pulse shadow-sm">
            <div className="flex items-center space-x-3 w-full">
                {/* 번호 아이콘 자리 */}
                <div className="w-5 h-5 bg-slate-200 rounded-md shrink-0"></div>

                {/* 파일명 텍스트 자리 */}
                <div className="h-4 bg-slate-100 rounded-md w-3/5"></div>
            </div>

            {/* 상태 라벨(통과/오류) 자리 */}
            <div className="w-12 h-6 bg-slate-100 rounded-lg shrink-0"></div>
        </div>
    );
};

export default SkeletonRow;