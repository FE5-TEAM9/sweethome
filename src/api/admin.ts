import { adminTransactionsBody } from "~/types/apiTypes";

// Common Header
const headers = {
  "content-type": "application/json",
  apikey: import.meta.env.VITE_API_KEY,
  username: import.meta.env.VITE_USER_NAME
};

// Users 사용자 목록 조회
const users = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/users`, {
    method: "GET",
    headers: {
      ...headers,
      masterKey: "true"
    }
  });
  const data = await res.json();
  return data;
};

// 전체 거래 내역 조회 (관리자)
const adminAllTransactions = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/products/transactions/all`,
    {
      method: "GET",
      headers: {
        ...headers,
        masterKey: "true"
      }
    }
  );
  const data = await res.json();
  return data;
};

// 상품 거래 내역 관리 - 완료, 취소, 해제
const adminTransactions = async (id: string, body: adminTransactionsBody) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/products/transactions/${id}`,
    {
      method: "PUT",
      headers: {
        ...headers,
        masterKey: "true"
      },
      body: JSON.stringify(body)
    }
  );
  const data = await res.json();
  return data;
};

export { users, adminAllTransactions, adminTransactions };
