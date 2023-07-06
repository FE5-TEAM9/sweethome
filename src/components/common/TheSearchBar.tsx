import { useEffect, useState } from "react";
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

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search.trim() === "") {
      onChange = "";
      return;
    }
    allProducts.map((product: Product) => {
      if (
        product.title
          .replace(" ", "")
          .toLocaleLowerCase()
          .includes(search?.toLocaleLowerCase().replace(" ", ""))
      ) {
        window.location.href = `/sweethome/shop/${product.id}`;
      } else {
        return;
      }
    });
  };
  return (
    <>
      <div className={styles.searchContainer}>
        <form
          className={styles.search}
          onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="제품을 검색해보세요."
            className={styles.searchBar}
            name="searchText"
            defaultValue={search || ""}
            onChange={e => onChange(e.target.value)}
          />
        </form>
        <div className={`${styles.searchForm} ${styles.none}`}>
          {allProducts.map((product: Product, index: number) =>
            search === "" ? (
              <div key={index}></div>
            ) : product.title
                .replace(" ", "")
                .toLocaleLowerCase()
                .includes(search?.toLocaleLowerCase().replace(" ", "")) ? (
              <a href={`/sweethome/shop/${product.id}`}>{product.title}</a>
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
