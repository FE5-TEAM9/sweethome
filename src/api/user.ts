import {
  User,
  SignUpBody,
  EditInfoBody,
  linkAccountBody,
  DeleteAccountBody
} from "~/types/apiTypes";

// Common Header
const headers = {
  "content-type": "application/json",
  apikey: import.meta.env.VITE_API_KEY,
  username: import.meta.env.VITE_USER_NAME
};

const signUp = async (body: SignUpBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// Log-In 로그인
const logIn = async (body: User) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });

  if (res.status === 200) {
    const json = await res.json();
    localStorage.setItem("token", json.accessToken);
    return json;
  } else return false;
};

// Log-Out 로그아웃
const logOut = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/logout`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (res.status === 200) {
    await res.json();
    window.localStorage.clear();
  } else return false;
};

// 로그인 인증
const authenticate = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/me`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (res.status === 200) {
    const json = await res.json();
    return json;
  } else return false;
};

// 개인 정보 수정
const editInfo = async (body: EditInfoBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/user`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(body)
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// 선택 가능한 은행 목록 조회
const getBankList = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/account/banks`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await res.json();
  return data;
};

// 계좌 목록 및 잔액 조회
const getAccountList = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/account`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await res.json();
  return data;
};

// 계좌 연결
const linkAccount = async (body: linkAccountBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/account`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(body)
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// 계좌 해지
const deleteAccount = async (body: DeleteAccountBody) => {
  await fetch(`${import.meta.env.VITE_API_BASE}/account`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(body)
  });
};

export {
  signUp,
  logIn,
  logOut,
  authenticate,
  editInfo,
  getBankList,
  getAccountList,
  linkAccount,
  deleteAccount
};
