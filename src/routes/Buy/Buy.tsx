import { useLocation } from "react-router";
const Buy = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div>This is Buy Page</div>
      
    </>
  );
};

export default Buy;
