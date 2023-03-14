import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";

// 주문서 페이지
const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  /** useContext 사용
   * OrderContext라는 Context를 호출하고 해당 내용을 orderDetails에 할당합니다.
   *  */
  const [orderDetails] = useContext(OrderContext);

  /** Array.from()
   * Array.from() 메서드는 유사 배열 객체(array-like object)나
   * 반복 가능한 객체(iterable object)를 얕게 복사해 새로운Array 객체를 만듭니다.
   */
  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderDetails.options.size > 0;
  let optionsDisplay = null;

  if (hasOptions) {
    const optionsArray = Array.from(orderDetails.options.keys());
    const optionList = optionsArray.map((key) => <li key={key}>{key}</li>);
    optionsDisplay = (
      <>
        <h2>옵션: {orderDetails.totals.options}</h2>
        <ul>{optionList}</ul>
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDetails.totals.products} </h2>
      <ul>{productList}</ul>

      {optionsDisplay}

      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};
export default SummaryPage;
