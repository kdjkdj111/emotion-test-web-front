import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/emoticons';

/**
 * @param {string} userId - 사용자 ID
 * @param {File} file - 이미지 파일
 * @param {string} type - 이모티콘 종류 (STILL, ANIMATED, MINI 등) [추가]
 */
export const uploadEmoticon = async (userId, file, type = 'STILL') => { // 기본값은 정지형
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);
    formData.append('type', type); // [추가] 서버로 종류 정보 전송

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
            errorMessage: '서버와 통신할 수 없습니다. (네트워크 확인)'
        };
    }
};