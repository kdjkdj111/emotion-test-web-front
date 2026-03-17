import React, { useEffect, useState } from 'react';
import { getProjectList, getProjectHistory } from '../api/api';

export default function HistoryView({ userId, onBack }) {
    // 1. 상태 관리
    const [viewMode, setViewMode] = useState('LIST'); // 'LIST' 또는 'DETAIL'
    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [detailData, setDetailData] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. 초기 로드: 사용자의 전체 프로젝트 목록 가져오기
    useEffect(() => {
        if (viewMode === 'LIST') {
            fetchList();
        }
    }, [viewMode, userId]);

    const fetchList = async () => {
        setLoading(true);
        const data = await getProjectList(userId);
        setProjectList(data);
        setLoading(false);
    };

    // 3. 특정 프로젝트 클릭 시 상세 내역 가져오기
    const handleProjectClick = async (project) => {
        setLoading(true);
        setSelectedProject(project);
        const data = await getProjectHistory(project.projectId);
        setDetailData(data);
        setViewMode('DETAIL');
        setLoading(false);
    };

    // 💡 상세 데이터 분류
    const successFiles = detailData.filter(item => item.status === 'SUCCESS');
    const failedFiles = detailData.filter(item => item.status === 'FAILED');

    return (
        /* 🚀 [FIX] 전체 화면 스크롤 가능하게 수정 */
        <div className="flex flex-col items-center w-full h-screen overflow-y-auto bg-slate-50 font-sans tracking-tight scrollbar-hide">
            <div className="w-full max-w-5xl p-8 mb-10">

                {/* 헤더 영역 */}
                <div className="flex items-center justify-between mb-10 sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-20">
                    <button
                        onClick={viewMode === 'LIST' ? onBack : () => setViewMode('LIST')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:shadow-md transition-all active:scale-95"
                    >
                        {viewMode === 'LIST' ? "← 돌아가기" : "← 목록으로"}
                    </button>
                    <div className="text-right">
                        <h1 className="text-2xl font-black text-slate-800 tracking-tighter">
                            {viewMode === 'LIST' ? "내 작업 대시보드" : "프로젝트 상세 분석"}
                        </h1>
                        <p className="text-xs font-bold text-slate-400 mt-1">
                            {viewMode === 'LIST' ? "과거에 작업한 모든 프로젝트를 확인하세요." : `Project ID: ${selectedProject?.projectId}`}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-bold text-slate-400">데이터를 불러오는 중입니다...</p>
                    </div>
                ) : (
                    <>
                        {/* --- [MODE: LIST] 프로젝트 목록 화면 --- */}
                        {viewMode === 'LIST' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projectList.length === 0 ? (
                                    <div className="col-span-full py-40 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-300 font-bold">
                                        아직 저장된 프로젝트가 없습니다.
                                    </div>
                                ) : (
                                    projectList.map((proj) => (
                                        <div
                                            key={proj.projectId}
                                            onClick={() => handleProjectClick(proj)}
                                            className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-yellow-400 hover:shadow-xl transition-all cursor-pointer active:scale-98"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-md uppercase">
                                                    {proj.mainType}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-medium">
                                                    {new Date(proj.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="font-black text-slate-800 text-lg mb-4 truncate">
                                                작업 세션 #{proj.projectId.substring(0, 8)}
                                            </h3>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase">준비율</span>
                                                    <span className="text-lg font-black text-slate-700">
                                                        {Math.round((proj.successCount / proj.totalCount) * 100)}%
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase">진행 상태</span>
                                                    <p className="text-xs font-bold text-slate-600">
                                                        <span className="text-green-500">{proj.successCount}</span> / {proj.totalCount} 통과
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* --- [MODE: DETAIL] 프로젝트 상세 화면 --- */}
                        {viewMode === 'DETAIL' && (
                            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                                {/* 🟢 통과한 파일 섹션 */}
                                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-2 h-6 bg-green-500 rounded-full"></div>
                                        <h2 className="text-xl font-black text-slate-800">통과 완료 ({successFiles.length})</h2>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {successFiles.map(file => (
                                            <div key={file.fileId} className="p-4 bg-green-50/50 rounded-2xl border border-green-100 text-center text-xs font-bold text-green-700 truncate">
                                                {file.fileName}
                                            </div>
                                        ))}
                                        {successFiles.length === 0 && <p className="text-slate-300 font-bold py-10">통과한 파일이 없습니다.</p>}
                                    </div>
                                </div>

                                {/* 🔴 [FIXED] 실패한 파일 섹션 (잘림 현상 해결) */}
                                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-2 h-6 bg-red-500 rounded-full"></div>
                                        <h2 className="text-xl font-black text-slate-800">수정 권고 ({failedFiles.length})</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {failedFiles.map(file => (
                                            /* 🚀 [FIX] h-fit 추가하여 내용이 길어지면 카드도 같이 늘어남 */
                                            <div key={file.fileId} className="flex flex-col p-6 bg-red-50/30 rounded-3xl border border-red-100">
                                                <div className="flex justify-between items-center mb-4 pb-3 border-b border-red-100/50">
                                                    <span className="font-black text-slate-800 break-all pr-4 text-sm">{file.fileName}</span>
                                                    <span className="shrink-0 px-2.5 py-1 bg-red-500 text-white text-[9px] font-black rounded-lg shadow-sm">수정 필요</span>
                                                </div>
                                                <ul className="space-y-3">
                                                    {file.errorMessage.split('\n').map((msg, idx) => (
                                                        /* 🚀 [FIX] break-all로 텍스트 짤림 방지, 텍스트 가독성 향상 */
                                                        <li key={idx} className="flex items-start gap-3 text-[13px] leading-relaxed font-bold text-red-600/90">
                                                            <span className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full shrink-0"></span>
                                                            <span className="break-words">{msg}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                        {failedFiles.length === 0 && <p className="text-slate-300 font-bold py-10">수정할 파일이 없습니다. 완벽합니다! ✨</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}