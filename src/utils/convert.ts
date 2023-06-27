// 할인가격 계산
const discountPrice = (productPrice: number, productDiscount: number) => {
  return productPrice * ((100 - productDiscount) / 100);
};

// 금액 단위 표시
const convertPrice = (price: number) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 날짜 형식 변경
const convertDate = (target) => {
  const date = new Date(target);
  const year = String(date.getFullYear()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const today = String(date.getDate()).padStart(2, 0);
  const hour = String(date.getHours()).padStart(2, 0);
  const min = String(date.getMinutes()).padStart(2, 0);
  return `${year}.${month}.${today} | ${hour}:${min}`;
};

export {discountPrice, convertPrice, convertDate };