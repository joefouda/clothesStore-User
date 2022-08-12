const ProductPrice = ({ product }) => {
    return product.discountPercentage > 0 ? (
      <p>
        <span className="old-sale-value">LE {product.price}</span>&nbsp;&nbsp;
        <span className="new-sale-value">LE {product.price - product.discountValue} ({product.discountPercentage}% OFF)</span>
      </p>
    ) : (
      <span>LE {product.price}</span>
    );
  };

  export default ProductPrice