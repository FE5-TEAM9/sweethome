// Common Interface
export interface User {
  email: string;
  password: string;
}

// Sign-Up 회원가입
export interface SignUpBody extends User {
  displayName: string;
}

// Transactions 거래 내역
export interface TransactionsBody {
  detailId: string;
}

// Add-Product 상품등록
export interface AddProductBody {
  title: string;
  price: number;
  description: string;
  tags?: string;
  thumbnailBase64?: string;
  photoBase64?: string;
  discountRate?: number;
}

// Edit-Product 상품 수정
export interface EditProductBody {
  title?: string;
  price?: number;
  description?: string;
  tags?: string[];
  thumbnailBase64?: string;
  photoBase64?: string;
  isSoldOut?: boolean;
  discountRate?: number;
}

// Buy-Product 상품 거래 신청
export interface BuyProductBody {
  productId: string;
  accountId: string;
  reservation?: {
    start: string;
    end: string;
  };
}

// 상품 거래 내역 관리 (관리자 전용)
export interface adminTransactionsBody {
  isCanceled?: boolean;
  done?: boolean;
}

// 개인 정보 수정 (사용자 전용)
export interface EditInfoBody {
  displayName?: string;
  profileImgBase64?: string;
  oldPassword?: string;
  newPassword?: string;
}

// 계좌 연결 (사용자 전용)
export interface linkAccountBody {
  bankCode: string;
  accountNumber: string;
  phoneNumber: string;
  signature: boolean;
}

// 계좌 해지 (사용자 전용)
export interface DeleteAccountBody {
  accountId: string;
  signature: boolean;
}
