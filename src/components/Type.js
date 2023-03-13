import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products";
import Options from "./Options";
import ErrorBanner from "./ErrorBanner";
import { OrderContext } from "../context/OrderContext";

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderData, updateItemCount] = useContext(OrderContext);

  const loadItems = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  }, [orderType]);

  const ItemComponent = orderType === "products" ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, orderType)
      }
    />
  ));

  useEffect(() => {
    loadItems(orderType);
  }, [loadItems, orderType]);

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  return (
    <>
      <h2>상품 종류</h2>
      <p>{orderType} 하나의 가격:</p>
      <p>
        {orderType} 총 가격: {orderData.totals[orderType]}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" && "column",
        }}
      >
        {optionItems}
      </div>
    </>
  );
};

export default Type;
