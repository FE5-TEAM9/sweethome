import { getAllProducts } from "~/api/requests";
import styles from "~/styles/TheSearchBar.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const TheSearchBar = ({ search, onChange }) => {
  const getAllProductsHandler = async () => {
    try {
      const res = await getAllProducts();
      console.log(res);
      setAllProducts(res);
    } catch (error) {
      console.log("상품 출력", error);
    }
  };
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getAllProductsHandler();
  }, []);
  useEffect(() => {}, [params]);
  return (
    <>
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
              onClick={e => {
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
    </>
  );
};
export default TheSearchBar;
