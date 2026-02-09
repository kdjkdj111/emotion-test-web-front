import axios from 'axios';

// 백엔드 주소
const API_BASE_URL = 'http://localhost:8080/api/emoticons';

export const uploadEmoticon = async (userId, file) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data; // { fileName, status, errorMessage } 반환
    } catch (error) {
        console.error("업로드 실패:", error);
        // 서버가 죽었거나 네트워크 오류일 때 가짜 실패 응답 생성
        return {
            fileName: file.name,
            status: 'FAILED',
            errorMessage: '서버와 통신할 수 없습니다.'
        };
    }
};