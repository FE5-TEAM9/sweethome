import { useState } from "react";
import { addProducts } from "~/api/requests";
import styles from "~/styles/AdminProduct.module.scss";

const AdminProduct = () => {
  const tableHead = [
    "NO",
    "상품태그",
    "상품이름",
    "상품가격",
    "할인율",
    "품절여부",
  ];

  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productTag, setProductTag] = useState("");
  const [productThumb, setProductThumb] = useState(null);
  const [productPhoto, setProductPhoto] = useState(null);
  const [productSoldOut, setProductSoldOut] = useState(false);
  const [productDiscountRate, setProductDiscountRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  
  const addProductHandler = async () => {
    const body = {
      title: productTitle,
      price: productPrice,
      description: productDesc,
      tags: productTag,
      thumbnailBase64: productThumb,
      photoBase64: productPhoto,
      discountRate: productDiscountRate,
    };

    try {
      setIsLoading(true);
      await addProducts(body);
      setIsLoading(false);
    } catch (error) {
      console.log("addProduct error", error);
    }
  };

  const thumbBase64Handler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setProductThumb(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  const photoBase64Handler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setProductThumb(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  // 할인율 계산
  // const priceBeforeDiscount = (productPrice) => {
  //   return productPrice * 100 / (100 - productDiscount)

  // }

  return (
    <>
      <section className={styles.adminProduct}>
        <div className={styles.addProductContainer}>
          <div className={styles.addProduct}>
            <div className={styles.title}>
              <h2>상품 등록</h2>
            </div>
            <form>
              <div className={styles.infoList}>
                <label htmlFor="productTitle" className={styles.label}>
                  <p>상품명</p>
                  <input
                    type="text"
                    id="productTitle"
                    className={styles.input}
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label htmlFor="productPrice" className={styles.label}>
                  <p>상품 가격</p>
                  <input
                    type="number"
                    id="productPrice"
                    className={styles.input}
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.valueAsNumber)}
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label htmlFor="productDescription" className={styles.label}>
                  <p>상품 설명</p>
                  <input
                    type="text"
                    id="productDescription"
                    className={styles.input}
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label htmlFor="productTag" className={styles.label}>
                  <p>상품 태그</p>
                  <input
                    type="text"
                    id="productTag"
                    className={styles.input}
                    value={productTag}
                    onChange={(e) => setProductTag(e.target.value)}
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label htmlFor="productThumbnail" className={styles.label}>
                  <p>썸네일 사진</p>
                  <input
                    type="file"
                    id="productThumbnail"
                    className={styles.input}
                    onChange={e => photoBase64Handler(e)}
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label htmlFor="productPhoto" className={styles.label}>
                  <p>상세 사진</p>
                  <input
                    type="file"
                    id="productPhoto"
                    className={styles.input}
                    onChange={e => thumbBase64Handler(e)}
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label htmlFor="productDiscount" className={styles.label}>
                  <p>할인율</p>
                  <input
                    type="number"
                    id="productDiscount"
                    className={styles.input}
                    value={productDiscountRate}
                    onChange={(e) =>
                      setProductDiscountRate(e.target.valueAsNumber)
                    }
                  />
                </label>
              </div>
              <input
                type="button"
                value="상품 등록"
                className={styles.btn}
                onClick={addProductHandler}
                disabled={isLoading ? true : false}
              />
            </form>
          </div>

          <div className={styles.adminProductList}>
            <div className={styles.title}>
              <p>모든 상품 조회</p>
            </div>
            <div className={styles.adminProduct}>
              <div className={styles.wrapper} key="index">
                <div className={styles.inner}>
                  <table>
                    <thead>
                      <tr>
                        {tableHead.map((item) => (
                          <th key={item}>{item}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProduct;
