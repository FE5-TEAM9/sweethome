import { getAllProducts } from "~/api/requests";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/common/Loading";
import styles from "~/styles/TheSearchBar.module.scss";

const TheSearchBar = ({ search, onChange }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProductsHandler = async () => {
    setIsLoading(true);
    try {
      const res = await getAllProducts();
      console.log(res);
      setAllProducts(res);
    } catch (error) {
      console.log("상품 출력", error);
    }
    setIsLoading(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    getAllProductsHandler();
  }, []);

  return (
    <>
      <div className={styles.searchContainer}>
        {isLoading ? <Loading /> : null}
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
        <div className={styles.searchForm}>
          {allProducts.map((product, index) =>
            search === "" ? (
              <div key={index}></div>
            ) : product.title
                .replace(" ", "")
                .toLocaleLowerCase()
                .includes(search?.toLocaleLowerCase().replace(" ", "")) ? (
              <div
                key={index}
                onClick={() => {
                  navigate(`/shop/${product.id}`, { replace: true });
                  // navigate(0);
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
