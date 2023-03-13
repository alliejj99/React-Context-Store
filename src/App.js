import React, { useState } from "react";
import SummaryPage from "./pages/SummaryPage";
import OrderPage from "./pages/OrderPage";
import CompletePage from "./pages/CompletePage";
import "./App.css";

const App = () => {
  const [pageNumber, setPageNumber] = useState(0);
  return (
    <div style={{ padding: "4rem" }}>
      {pageNumber === 0 && <OrderPage setPageNumber={setPageNumber} />}
      {pageNumber === 1 && <SummaryPage setPageNumber={setPageNumber} />}
      {pageNumber === 2 && <CompletePage setPageNumber={setPageNumber} />}
    </div>
  );
};

export default App;
