export const getIsLogin = state => state.auth.isLogin;
export const getEmail = state => state.auth?.user?.email;
export const getName = state => state.auth?.user?.name;
export const getToken = state => state.auth?.token;
