// Admin Edit Product Modal (상품 수정 모달)
export interface EditProductModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  allProducts: Product[];
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  productId: string;
  watch: boolean;
  setWatch: React.Dispatch<React.SetStateAction<boolean>>;
  productIDX: number;
}

// 상품 정보
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string;
  isSoldOut: boolean;
  discountRate: number;
}

// SignUp - SignUp
export interface SignUpBody {
  email: string;
  password: string;
  displayName: string;
  profileImgBase64?: string;
  pwConfirm?: string;
}

// AdminOrder
export interface TransactionDetail {
  detailId: string;
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  account: {
    bankName: string;
    bankCode: string;
    accountNumber: string;
  };
  product: {
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    discountRate: number;
  };
  timePaid: string;
  isCanceled: boolean;
  done: boolean;
}

// AdminProduct
export type AllProduct = Product[];

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string;
  isSoldOut: boolean;
  discountRate: number;
}

export interface AddProductBody {
  title: string;
  price: number;
  description: string;
  tags?: string;
  thumbnailBase64?: string;
  photoBase64?: string;
  discountRate?: number;
  isSoldOut?: boolean;
}

// AdminUser
export interface User {
  email: string;
  displayName: string;
  profileImg: string;
}

export interface orderApplyBody {
  productId: string;
  accountId: string;
  reservation?: {
    start: string;
    end: string;
  };
}

// CartList
export interface MyCartItem {
  id: string;
  title: string;
  price: number;
  discountPrice?: number;
  quantity?: number;
  description?: string;
  tags?: string;
  thumbnail?: string;
  photo?: string;
  isSoldOut?: boolean;
  reservations?: Reservation[];
  discountRate?: number;
  isChecked?: boolean;
}

// Shop - Shop
export type ShopAllProduct = GetProduct[];

// Shop - Shop
export interface GetProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string;
  thumbnail: string | null;
  isSoldOut: boolean;
  discountRate: number;
}

// Components - common - Select
export interface SelectProps {
  name: string;
  options: { name: string; value: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
}

// Components - common - SubNav
export interface SubNavProps {
  subNav: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

// Shop- ShopDetail
export type Params = {
  id: string | undefined;
};

// Components - MyPage - MyBankAccount
export interface AccountProps {
  item: Bank;
  watch: boolean;
  setWatch: React.Dispatch<React.SetStateAction<boolean>>;
}

// Components - MyPage - MyBankAccount
export interface Bank {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
}

// Components - MyPage - MyBankAccount - Modal
export interface AccountModalProps {
  bankList: BankModal[];
  watch: boolean;
  setWatch: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BankModal {
  // 선택 가능한 은행 정보
  name: string; // 은행 이름
  code: string; // 은행 코드
  digits: number[]; // 은행 계좌 자릿수
  disabled: boolean; // 사용자가 추가한 계좌 여부
}

export interface InputState {
  input0: string;
  input1: string;
  input2: string;
  input3: string;
  phone0: string;
  phone1: string;
  phone2: string;
}

// My-Page - MyInfo
export interface Password {
  oldPassword: string;
  newPassword: string;
}

// MyPage - MyOrder
export type AllTransactions = AllTransactionDetail[];

export interface AllTransactionDetail {
  detailId: string;
  product: {
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string;
    discountRate: number;
  };
  reservation: Reservation | null;
  timePaid: string;
  isCanceled: boolean;
  done: boolean;
}

export interface Reservation {
  start: string;
  end: string;
  isCanceled: boolean;
  isExpired: boolean;
}

// routes - mypage - my order detail
export interface DetailsProps {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  orderDetails: TransactionOrderDetails;
}
export interface TransactionOrderDetails {
  detailId: string;
  product: {
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string;
    discountRate: number;
    photo: string;
  };
  timePaid: string;
  done: boolean;
  account: {
    bankName: string;
    accountNumber: string;
  };
}
