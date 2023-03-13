import React from "react";

const ErrorBanner = ({ message }) => {
  let errorMessage = message || "Error";
  return <div style={{ backgroundColor: "red" }}>{errorMessage}</div>;
};

export default ErrorBanner;
