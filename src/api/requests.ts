// Common Header
const headers = {
  "content-type": "application/json",
  apikey: import.meta.env.VITE_API_KEY,
  username: import.meta.env.VITE_USER_NAME,
};

// Common Interface
interface User {
  email: string;
  password: string;
}

// Transactions Interface
interface TransactionsBody {
  detailId: string;
}

// Sign-Up 회원가입
interface SignUpBody extends User {
  displayName: string;
}

const signUp = async (body: SignUpBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
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
    body: JSON.stringify(body),
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) {
    const json = await res.json();
    return json;
  } else return false;
};

// Users 사용자 목록
const users = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/users`, {
    method: "GET",
    headers: {
      ...headers,
      masterKey: "true",
    },
  });
  const data = await res.json();
  return data;
};

// Add-Product 상품등록
interface AddProductBody {
  title: string;
  price: number;
  description: string;
  tags?: string;
  thumbnailBase64?: string;
  photoBase64?: string;
  discountRate?: number;
}

const addProduct = async (body: AddProductBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: "KDT5_nREmPe9B",
      username: "KDT5_Team9",
      masterKey: "true",
    },
    body: JSON.stringify(body),
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
      masterKey: "true",
    },
  });
  const data = await res.json();
  return data.map((data: any) => ({ ...data, isChecked: false }));
};

// Get-Product 단일 상품 조회
const getProduct = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/${id}`, {
    method: "GET",
    headers,
  });
  const data = await res.json();
  return data;
};

// Edit-Product 상품 수정
interface EditProductBody {
  title?: string;
  price?: number;
  description?: string;
  tags?: string[];
  thumbnailBase64?: string;
  photoBase64?: string;
  isSoldOut?: boolean;
  discountRate?: number;
}

const editProduct = async (body: EditProductBody, id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      masterKey: "true",
    },
    body: JSON.stringify(body),
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
        masterKey: "true",
      },
    }
  );
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// 개인 정보 수정
interface EditInfoBody {
  displayName?: string;
  profileImgBase64?: string;
  oldPassword?: string;
  newPassword?: string;
}

const editInfo = async (body: EditInfoBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/user`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();
  return data;
};

// 계좌 연결
interface linkAccountBody {
  bankCode: string;
  accountNumber: string;
  phoneNumber: string;
  signature: boolean;
}

const linkAccount = async (body: linkAccountBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/account`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// 계좌 해지
interface DeleteAccountBody {
  accountId: string;
  signature: boolean;
}

const deleteAccount = async (body: DeleteAccountBody) => {
  await fetch(`${import.meta.env.VITE_API_BASE}/account`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });
};

// 상품 거래 신청 (구매)

interface BuyProductBody {
  productId: string; // 거래할 제품 ID (필수!)
  accountId: string; // 결제할 사용자 계좌 ID (필수!)
  reservation?: {
    // 예약 정보(예약 시스템을 사용하는 경우만 필요)
    start: string; // 예약 시작 시간(ISO)
    end: string; // 예약 종료 시간(ISO)
  };
}
const buyProduct = async (body: BuyProductBody) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/buy`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else return res.status;
  } catch (error) {
    alert("결제 실패하였습니다.")
  }
};

// 상품 거래 취소
const cancelTransaction = async (body: TransactionsBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/cancel`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// 상품 거래 확정
const confirmedTransaction = async (body: TransactionsBody) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/products/ok`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else return false;
};

// 전체 거래 내역 (사용자)
const getAllTransactions = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/products/transactions/details`,
    {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return data;
};

// 전체 거래 내역 (관리자)
const adminAllTransactions = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/products/transactions/all`,
    {
      method: "GET",
      headers: {
        ...headers,
        masterKey: "true",
      },
    }
  );
  const data = await res.json();
  return data;
};

// 거래 내역 관리 - 완료, 취소, 해제 (관리자)
interface adminTransactionsBody {
  isCanceled?: boolean;
  done?: boolean;
}

const adminTransactions = async (id: string, body: adminTransactionsBody) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/products/transactions/${id}`,
    {
      method: "PUT",
      headers: {
        ...headers,
        masterKey: "true",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return data;
};

export {
  signUp,
  logIn,
  logOut,
  authenticate,
  users,
  addProduct,
  getAllProducts,
  getProduct,
  editProduct,
  deleteProduct,
  editInfo,
  getBankList,
  getAccountList,
  linkAccount,
  deleteAccount,
  buyProduct,
  cancelTransaction,
  confirmedTransaction,
  getAllTransactions,
  getTransaction,
  adminAllTransactions,
  adminTransactions,
};
