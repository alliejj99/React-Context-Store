import React, { useContext } from "react";
import Type from "../../components/Type";
import { OrderContext } from "../../context/OrderContext";

const OrderPage = ({ setPageNumber }) => {
  const [orederData] = useContext(OrderContext);

  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType="products" />
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ width: "50%" }}>
          <Type orderType="options" />
        </div>

        <div style={{ width: "50%" }}>
          <h2>Total Price: {orederData.totals.total}</h2>
          <button onClick={() => setPageNumber(1)}>주문</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
