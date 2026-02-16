/**
 * [Auth Service Module]
 * 비회원(UUID)에서 정식 회원(OAuth/JWT)으로의 마이그레이션을 고려한 설계
 */

const STORAGE_KEYS = {
    USER_ID: 'emoticon_lab_user_id',
    AUTH_TOKEN: 'emoticon_lab_token' // 나중에 JWT 사용 시 활용
};

export const authService = {
    /**
     * 현재 유저의 식별자를 반환합니다.
     * 1. 로그인된 유저라면 서버에서 받은 식별자 반환 (확장성)
     * 2. 비회원이라면 로컬 스토리지의 UUID 반환
     */
    getUserId: () => {
        // [Migration Point] 만약 서버 로그인을 구현하면 여기서 토큰 존재 여부를 먼저 확인합니다.
        let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

        if (!userId) {
            userId = authService.generateGuestId();
        }

        return userId;
    },

    /**
     * 비회원용 고유 ID 생성 및 저장
     */
    generateGuestId: () => {
        const newId = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEYS.USER_ID, newId);
        return newId;
    },

    /**
     * [Migration Point] 실제 로그인 구현 시 호출할 함수 (미리 선언)
     */
    login: (token, userId) => {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    },

    /**
     * 로그아웃 (스토리지 클리어)
     */
    logout: () => {
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
        window.location.reload(); // 상태 초기화를 위한 새로고침
    }
};