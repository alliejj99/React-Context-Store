import React, { useCallback } from "react";

const Products = ({ name, imagePath, updateItemCount }) => {
  const handleChange = useCallback(
    (event) => {
      const currentValue = event.target.value;
      updateItemCount(name, currentValue);
    },
    [name, updateItemCount]
  );

  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:4000/${imagePath}`}
        alt={`${name} product`}
      />

      <form style={{ marginTop: "10px" }}>
        <label style={{ textAlign: "right" }}>{name}</label>
        <input
          style={{ marginLeft: "7px" }}
          name="quantity"
          main="0"
          type="number"
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Products;
