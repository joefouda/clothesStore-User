import "./SearchContent.css";
import { Input } from "antd";
import ProductCard from "../../ProductCard/ProductCard";
import { useState } from "react";
import axios from "axios";

const SearchContent = () => {
  const [searchName, setSearchName] = useState("");
  const [searched, toggleSearched] = useState(false);
  const [products, setProducts] = useState([]);

  const handleChange = (event) => {
    setSearchName(event.target.value);
    if (!event.target.value.length) {
      setProducts([]);
      toggleSearched();
    } else {
      axios
        .get(
          `http://localhost:3000/api/v1/product/search/${event.target.value}`
        )
        .then((res) => {
          if (res.data.products) {
            setProducts(res.data.products);
          }
          toggleSearched(true);
        });
    }
  };
  return (
    <div className="search-container">
      <Input
        placeholder="input search text"
        size="large"
        onChange={handleChange}
      />
      {products.length === 0 && searched && (
        <h2 style={{ textAlign: "center" }}>
          No results found for '{searchName}'
        </h2>
      )}
      <div className="search-results-container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchContent;
