import {
  AddProductBody,
  EditProductBody,
  BuyProductBody,
  TransactionsBody
} from "~/types/apiTypes";

// Common Header
const headers = {
  "content-type": "application/json",
  apikey: import.meta.env.VITE_API_KEY,
  username: import.meta.env.VITE_USER_NAME
};

// Add-Product 상품 추가
const addProduct = async (body: AddProductBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: "KDT5_nREmPe9B",
      username: "KDT5_Team9",
      masterKey: "true"
    },
    body: JSON.stringify(body)
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// Get-All-Products 전체 상품 조회
const getAllProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products`, {
    method: "GET",
    headers: {
      ...headers,
      masterKey: "true"
    }
  });
  const data = await res.json();
  return data.map((data: any) => ({ ...data, isChecked: false }));
};

// Get-Product 단일 상품 조회
const getProduct = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/${id}`, {
    method: "GET",
    headers
  });
  const data = await res.json();
  return data;
};

// Edit-Product 상품 정보 수정
const editProduct = async (body: EditProductBody, id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      masterKey: "true"
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
};

// Delete-Product 상품 삭제
const deleteProduct = async (id: string) => {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
    {
      method: "DELETE",
      headers: {
        ...headers,
        masterKey: "true"
      }
    }
  );
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// Buy-Product 상품 거래 신청 (구매)
const buyProduct = async (body: BuyProductBody) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/buy`, {
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
    } else return res.status;
  } catch (error) {
    alert("결제 실패하였습니다.");
  }
};

// Cancel-Product 상품 거래 취소
const cancelTransaction = async (body: TransactionsBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/cancel`, {
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

// Confirmed-Transaction 상품 거래 확정
const confirmedTransaction = async (body: TransactionsBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/ok`, {
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

// 전체 거래 내역 조회 (사용자)
const getAllTransactions = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/products/transactions/details`,
    {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// 단일 거래 내역 (사용자)
const getTransaction = async (body: TransactionsBody) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/products/transactions/detail`,
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(body)
    }
  );
  const data = await res.json();
  return data;
};

export {
  addProduct,
  getAllProducts,
  getProduct,
  editProduct,
  deleteProduct,
  buyProduct,
  cancelTransaction,
  confirmedTransaction,
  getAllTransactions,
  getTransaction
};
