/******************************************************************* 
// 위치 : src/utils/convert.ts
// 설명 : 프로젝트 전반에 걸쳐 자주 사용되는 함수를 한 곳에 모아서 관리합니다.
********************************************************************/

// 할인 가격 계산
const discountPrice = (productPrice: number, productDiscount: number) => {
  return productPrice * ((100 - productDiscount) / 100);
};

// 할인 전 가격 계산 
const priceBeforeDiscount = (price:number, discountRate:number) => {
  return price * 100 / (100 - discountRate)
};

// 금액 단위 표시
const convertPrice = (price: number) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 날짜 형식 변경
const convertDate = (dateBody: string) => {
  const date = new Date(dateBody);
  const year = String(date.getFullYear()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const today = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${today} | ${hour}:${min}`;
};

// 날짜 정렬
const sortDate = (dateBody: string) => {
  const date = new Date(dateBody);
  const times = date.getTime();
  return times;
}
  
export { priceBeforeDiscount, discountPrice, convertPrice, convertDate, sortDate };