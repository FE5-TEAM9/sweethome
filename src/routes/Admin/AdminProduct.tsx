import { useState, useEffect } from "react";
import { addProduct, getAllProducts, deleteProduct } from "~/api/requests";
import { TiDeleteOutline } from 'react-icons/ti'
import { BsPencilSquare } from 'react-icons/bs'
import styles from "~/styles/Admin/AdminProduct.module.scss";

const AdminProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productTag, setProductTag] = useState("");
  const [productThumb, setProductThumb]: any = useState(null);
  const [productPhoto, setProductPhoto]: any = useState(null);
  const [productSoldOut, setProductSoldOut] = useState(false);
  const [productDiscountRate, setProductDiscountRate] = useState(0);
  const [productNum, setProductNum] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [isChecked, setIsChecked] = useState(false)
  
  useEffect(()=> {
    getAllProductsHandler();
  }, [search])
  
  const tableHead = [
    "NO",
    "상품태그",
    "상품이름",
    "상품가격",
    "할인율",
    "품절여부",
  ];

  // 상품 목록 조회
  const getAllProductsHandler = async () => {
    try {
      const res = await getAllProducts();
      console.log(res);
      setAllProducts(res);
    } catch (error) {
      console.log("상품 출력", error)
    }
  }

  // 상품 등록
  const addProductHandler = async () => {
    const body = {
      title: productTitle,
      price: productPrice,
      description: productDesc,
      tags: productTag,
      thumbnailBase64: productThumb,
      photoBase64: productPhoto,
      discountRate: productDiscountRate,
      isSoldOut: productSoldOut
    };

    try {
      setIsLoading(true);
      await addProduct(body);
      setSearch(allProducts);
      setIsLoading(false);
    } catch (error) {
      console.log("addProduct error", error);
    }
  };

  // 썸네일 base64 인코딩
  const thumbBase64Handler = (e: any) => {
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

  // 상세사진 base64 인코딩
  const photoBase64Handler = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setProductPhoto(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  // 품절 여부
  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsChecked(!isChecked)
    }
  }

  // 상품 삭제
  const deleteProductHandler = async (id: any) => {
    try {
      const res = await deleteProduct(id);
      console.log(res);
      const updateProduct = allProducts.filter((product)=> product.id !== id);
      setAllProducts(updateProduct);
      setSearch(allProducts)
    } catch (error) {
      console.log('상품 삭제', error)
    }
  }

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
              <div className={styles.productName}>
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
                    onChange={(e) => thumbBase64Handler(e)}
                    accept="image/*"
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
                    onChange={(e) => photoBase64Handler(e)}
                    accept="image/*"
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
              <div className={styles.infoList}>
                <label htmlFor="productIsSoldOut" className={styles.label}>
                  <p>품절 여부</p>
                  <input
                    type="checkbox"
                    id="productIsSoldOut"
                    className={styles.input}
                    checked={isChecked}
                    onChange={(e) => checkboxHandler(e)}
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
                    <tbody>
                      {allProducts.map((product, i) => (
                        <tr key={product.id}>
                          <td>{i + 1}</td>
                          <td>{product.tags}</td>
                          <td>{product.title}</td>
                          <td>{product.price}</td>
                          <td>{product.discountRate}</td>
                          <td>{product.isSoldOut}</td>
                          <BsPencilSquare />
                          <TiDeleteOutline
                            className={styles.deleteBtn}
                            onClick={()=>deleteProductHandler(product.id)}
                          />
                        </tr>
                      ))}
                    </tbody>
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
