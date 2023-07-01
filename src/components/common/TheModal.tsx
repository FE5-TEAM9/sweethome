import { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { editProduct } from "~/api/requests";
import { SELECT_TAGS } from "~/constants";
import Loading from "~/components/common/Loading";
import Select from "~/components/common/Select";
import styles from "~/styles/TheModal.module.scss";

interface PropsType {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  allProducts: Product[];
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>
  productId: string;
  watch: boolean;
  setWatch: React.Dispatch<React.SetStateAction<boolean>>
  productIDX: number;
}

interface Product { 
  id: string 
  title: string 
  price: number 
  description: string 
  tags: string[]
  thumbnail: string
  isSoldOut: boolean
  discountRate: number
}

const TheModal = ({
  setModalOpen,
  title,
  allProducts,
  setAllProducts,
  productId,
  watch,
  setWatch,
  productIDX,
}: PropsType) => {
  const [isChecked, setIsChecked] = useState(false);
  const [productThumb] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [editInfo, setEditInfo] = useState({
    title: allProducts[productIDX].title,
    price: allProducts[productIDX].price,
    description: allProducts[productIDX].description,
    tags: allProducts[productIDX].tags,
    thumbnail: productThumb,
    discountRate: allProducts[productIDX].discountRate,
  });

  const closeModal = () => {
    setModalOpen(false);
  };

  // 썸네일 base64 인코딩
  // const thumbBase64Handler = (e: React.ChangeEvent) => {
  //   const target: any = e.target as HTMLInputElement;
  //   const file = target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   return new Promise<void>((resolve) => {
  //     reader.onload = () => {
  //       setProductThumb(reader.result as string);
  //       resolve();
  //     };
  //   });
  // };

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setEditInfo({
      ...editInfo,
      [name]: value,
    });
  };

  // 상품 수정
  const editProductHandler = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsLoading(true);
    if (editInfo.title.trim() === "") {
      alert("상품이름, 상품태그는 필수입니다.");
      return;
    }
    if (editInfo.discountRate < 0 || editInfo.discountRate >= 100) {
      alert("할인율은 0 ~ 99를 입력하세요.");
      return;
    }

    const body = {
      title: editInfo.title,
      price: editInfo.price,
      description: editInfo.description,
      tags: editInfo.tags,
      thumbnail: productThumb,
      isSoldOut: isChecked,
      discountRate: editInfo.discountRate,
    };

    try {
      const res = await editProduct(body, id);
      setAllProducts([...allProducts, res]);
      setWatch(!watch);
      setModalOpen(false);
    } catch (error: any) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.contents}>
            <label>
              <p>상품이름</p>
              <input
                name="title"
                value={editInfo.title}
                onChange={onChangeHandler}
              />
            </label>
            <label>
              <p>상품가격</p>
              <input
                name="price"
                value={editInfo.price}
                onChange={onChangeHandler}
              />
            </label>
            <label>
              <p>상품설명</p>
              <input
                name="description"
                value={editInfo.description}
                onChange={onChangeHandler}
              />
            </label>
            <label>
              <p>태그</p>
              <Select
                name="tags"
                options={SELECT_TAGS}
                value={editInfo.tags}
                onChange={onChangeHandler}
              />
            </label>
            {/* <label>
              <p>썸네일</p>
              <input 
              name="thumbnail"
              type="file"
              onChange={(e)=>thumbBase64Handler(e)}
              />
            </label> */}
            <label>
              <p>isSoldOut</p>
              <input
                name="isSoldOut"
                type="checkbox"
                onChange={() => setIsChecked(!isChecked)}
              />
            </label>
            <label>
              <p>할인율</p>
              <input
                name="discountRate"
                value={editInfo.discountRate}
                onChange={onChangeHandler}
              />
            </label>
            <input
              type="button"
              value="수정"
              className={styles.editBtn}
              onClick={(e) => editProductHandler(e, productId)}
            />
          </div>
          <div className={styles.closeBtn} onClick={closeModal}>
            <TfiClose />
          </div>
        </div>
      </div>
    </>
  );
};

export default TheModal;
