import { createContext, useEffect, useMemo, useState } from "react";

/** 작성자가 생각한 context
 * 같은 props를 여러 컴포넌트에서 사용할때,
 * store개념으로 데이터들을 생성하고 저장한 후
 * 각각 props를 사용해야 할 컴포넌트에서 context를 호출하거나 변경하는 것을 뜻한다.
 */

// React 기능을 사용하여 context를 생성합니다.
export const OrderContext = createContext();

export function OrderContextProvider(props) {
  // orderCounts라는 state에 map함수를 가진 객체를 할당.
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  // 상품과 옵션, 총 가격을 확인하기 위해 작성한 데이터 객체
  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  // 상품과 옵션의 기본 값을 설정한 데이터 객체(변하지 않는 값으로 const 변수)
  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  // 가격을 계산하기 위해 작성한 함수
  const calculateSubtotal = (orderType, orderCounts) => {
    let optionCount = 0; // 처음 옵션의 갯수는 선택하지 않으면 0입니다.
    for (const count of orderCounts[orderType].values()) {
      // 변수 count는 주문수량[주문종류]의 갯수만큼 다음을 실행
      optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
  };

  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
