// Common Header
const headers = {
  "content-type": "application/json",
  apikey: "KDT5_nREmPe9B",
  username: "KDT5_Team9"
};

// Common Interface
interface User {
  email: string;
  password: string;
}

// Sign-Up 회원가입
interface SignUpBody extends User {
  displayName: string;
}

const signUp = async (body: SignUpBody) => {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup",
    {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};

// Log-In 로그인

const logIn = async ( body: User) => {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
    {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }
  );
  
  console.log('로그인 상태',res.status)
  if ( res.status === 200 ) {
    const json = await res.json();
    localStorage.setItem("token", json.accessToken);
    return json;
  } else return false

};

// Log-Out 로그아웃
const logOut = async () => {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout",
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
  const json = await res.json();
  console.log("로그아웃 API", json);
};

// 로그인 인증
const authenticate = async () => {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me",
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
  const json = await res.json();
  console.log("로그인 인증 API", json);
  return json;
};

// Users 사용자 목록
const users = async () => {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/users",
    {
      method: "GET",
      headers: {
        ...headers,
        masterKey: "true"
      }
    }
  );
  const data = await res.json();
  console.log(data);
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
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_Team9",
        masterKey: "true"
      },
      body: JSON.stringify(body)
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};

// 상품 조회
type ResponseValue = Product[]; // 관리하는 모든 제품의 목록

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string | null;
  isSoldOut: boolean;
  discountRate: number;
}

const getAllProducts = async () => {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_Team9",
        masterKey: "true"
      }
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};

// 상품 삭제
const deleteProduct = async (id: string) => {
  try {
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_Team9",
          masterKey: "true"
        }
      }
    );
  } catch (error) {
    console.log("상품 삭제 error", error);
  }
};
}

// 개인 정보 수정
interface EditInfoBody {
  displayName?: string 
  profileImgBase64?: string 
  oldPassword?: string 
  newPassword?: string 
}

const editInfo = async (body: EditInfoBody) => {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
    {
      method: "PUT",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(body)
    }
  );
  if (res.status === 200) {
    const data = await res.json();
    console.log('개인정보수정 API',data);
    return data;
  } else return false;
};

//선택 가능한 은행 목록 조회
const getBankList = async () => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks',
    {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  const data = await res.json()
  console.log(data)
  return data
}

//계좌 목록 및 잔액 조회
const getAccountList = async () => {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
    {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  const data = await res.json()
  console.log(data)
  return data
}

// 계좌 연결
interface linkAccountBody {
  bankCode: string 
  accountNumber: string 
  phoneNumber: string
  signature: boolean 
}

const linkAccount = async (body: linkAccountBody) => {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
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
  console.log('개인정보수정 API',data);
  return data;
};

// 계좌 해지
interface DeleteAccountBody {
  accountId: string 
  signature: boolean
}

const deleteAccount = async (body: DeleteAccountBody) => {
  try {
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/account `,
      {
        method: "DELETE",
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body),
      })
  } catch (error) {
    console.log ('상품 삭제 error', error)
  }

}


export { 
  signUp, logIn, logOut, authenticate,
  users,
  addProduct, getAllProducts, deleteProduct,
  editInfo,
  getBankList, getAccountList, linkAccount, deleteAccount,
};
