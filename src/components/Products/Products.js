import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";

const Products = (props) => {
  const [usd, setUsd] = useState();
  const [currtype, setCurrtype] = useState(["INR", "USD"]);
  const [val, setVal] = useState(0);

  const Add = currtype.map((Add) => Add);

  const handleCurrTypeChange = (e) => {
    setVal(e.target.value);
  };

  const { productDetails } = props;

  useEffect(() => {
    axios
      .get(
        "http://api.exchangeratesapi.io/v1/latest?access_key=1e0e49c0da622ebc14268da2f51576bb"
      )
      .then((res) => {
        setUsd(res.data.rates["USD"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getUSDCurrency = (num) => {
    const usd_curr = usd * num;
    return usd_curr;
  };

  const indCurr = (num) => {
    if (
      String(num).split(".").length < 2 ||
      String(num).split(".")[1].length <= 2
    ) {
      num = num.toFixed(2);
    }
    return num;
  };

  return (
    <div className="products">
      {productDetails.map((product) => (
        <div className="products--Item" key={product.id}>
          <div className="products--Item--ImageDiv">
            <img
              src={product.imageUrl}
              alt="product"
              className="products--Item--ImageDiv--Image"
            />
          </div>
          <span className="products--Item--Name span font--style">
            {product.productName}
          </span>
          <span className="products--Item--Price span .font--style">
            {parseInt(val) === 0
              ? indCurr(product.price)
              : getUSDCurrency(product.price)}
          </span>
        </div>
      ))}
      <div className="products--Currency">
        <span className="font--style products--Currency--Span"> Currency </span>
        <select
          onChange={(e) => handleCurrTypeChange(e)}
          className="browser-default custom-select"
        >
          {Add.map((curr, key) => (
            <option value={key} key={key}>
              {curr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Products;
