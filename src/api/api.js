import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/emoticons';

/**
 * @param {string} userId - 사용자 ID
 * @param {File} file - 이미지 파일
 * @param {string} type - 이모티콘 종류 (STILL, ANIMATED, MINI 등) [추가]
 */
export const uploadEmoticon = async (userId, file, type, fileId) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);
    formData.append('type', type);
    formData.append('fileId', fileId);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error("업로드 실패:", error);
        return {
            fileName: file.name,
            status: 'FAILED',
            errorMessage: '부적절한 파일 업로드 (기본 양식 확인)'
        };
    }
};