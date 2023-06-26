import { useState, useEffect, useMemo } from "react";
import { addProduct, getAllProducts, editProduct, deleteProduct } from "~/api/requests";
import { TiDeleteOutline } from 'react-icons/ti'
import { BsPencilSquare } from 'react-icons/bs'
import styles from "~/styles/Admin/AdminProduct.module.scss";
// import TheModal from "~/components/TheModal"

const AdminProduct = () => {
  type AllProduct = Product[] // 관리하는 모든 제품의 목록

  interface Product {
    id: string
    title: string
    price: number
    description: string
    tags: string[]
    thumbnail: string | null
    isSoldOut: boolean
    discountRate: number
  }
  interface PhotoConvert {
    productThumb: string | undefined;
    productPhoto: string | undefined;
  }

  const [allProducts, setAllProducts] = useState<AllProduct>([]);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [productDesc, setProductDesc] = useState("");
  const [productTag, setProductTag] = useState("");
  const [productThumb, setProductThumb] = useState<PhotoConvert | null>(null);
  const [productPhoto, setProductPhoto] = useState<PhotoConvert | null>(null);
  const [productSoldOut, setProductSoldOut] = useState(false);
  const [productDiscountRate, setProductDiscountRate] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true)
  }
  
  useEffect(()=> {
    getAllProductsHandler();
  }, [allProducts])
  
  const tableHead = [
    "NO",
    "상품태그",
    "상품이름",
    "상품가격",
    "할인율",
    "품절여부"
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
    } else {
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
    } catch (error) {
      console.log('상품 삭제', error)
    }
  }

  return (
    <>
      <section className={styles.adminProduct}>
        <div className={styles.addProductContainer}>
          <div className={styles.addProduct}>
            <div className={styles.title}>
              <h2>상품 등록</h2>
            </div>
            <form>
              <div className={styles.productTitle}>
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
              <div className={styles.productPrice}>
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
              <div className={styles.productDescription}>
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
              <div className={styles.productTag}>
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
              <div className={styles.productThumbnail}>
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
              <div className={styles.productPhoto}>
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
              <div className={styles.productDiscount}>
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
              <div className={styles.productIsSoldOut}>
                <label htmlFor="productIsSoldOut" className={styles.label}>
                  <span>품절 여부</span>
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
            <div className={styles.allProduct}>
              <div className={styles.wrapper} key="index">
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
                        <div className={styles.icon}>
                          <BsPencilSquare
                            className={styles.modifyBtn}
                            onClick={showModal}
                          />
                          {modalOpen && <TheModal id={<p>Named content</p>} setModalOpen={setModalOpen} />}
                          <TiDeleteOutline
                            className={styles.deleteBtn}
                            onClick={() => deleteProductHandler(product.id)}
                          />
                        </div>
                      </tr>
                    ))}
                  </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProduct;
