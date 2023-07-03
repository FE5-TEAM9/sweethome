import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "~/api/requests";
import styles from "~/styles/TheSearchBar.module.scss";

const TheSearchBar = ({ search, onChange }: any) => {
  const [allProducts, setAllProducts] = useState([]);

  // 전체 상품 조회
  const getAllProductsHandler = async () => {
    try {
      const res = await getAllProducts();
      setAllProducts(res);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const navigate = useNavigate();
  
  useEffect(() => {
    getAllProductsHandler();
  }, []);

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

  return (
    <>
      <div className={styles.searchContainer}>
        <form className={styles.search}>
          <input
            type="text"
            placeholder="제품을 검색해보세요."
            className={styles.searchBar}
            name="searchText"
            value={search || ""}
            onChange={onChange}
          />
        </form>
        {}
        <div className={`${styles.searchForm} ${styles.none}`}>
          {allProducts.map((product:Product, index:number) =>
            search === "" ? (
              <div key={index}></div>
            ) : product.title
                .replace(" ", "")
                .toLocaleLowerCase()
                .includes(search?.toLocaleLowerCase().replace(" ", "")) ? (
              <div
                key={index}
                onClick={() => {
                  navigate(`/sweethome/shop/${product.id}`, { replace: true });
                }}>
                {product.title}
              </div>
            ) : (
              <div key={index}></div>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default TheSearchBar;
