import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/productList/productListSlice";
import { addItemToCart } from "../../redux/slices/cart/cartSlice";
import "./ProductList.css";
import Spinner from "../../utils/Spinner/Spinner";
import ButtonSpinner from "../../utils/ButtonSpinner/ButtonSpinner";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productList);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [adding, setAdding] = useState(null);
  const productsPerPage = 20;
  const totalNoofProducts = 100;

  useEffect(() => {
    // Dispatch the fetchProducts action on component mount
    dispatch(fetchProducts(productsPerPage));
  }, [dispatch]);

  useEffect(() => {
    // Initialize with the first set of products
    setLoadedProducts(products);
  }, [products]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
      !loadingMore &&
      loadedProducts.length < totalNoofProducts
    ) {
      // Debounce the loading function
      setLoadingMore(true);
      setTimeout(() => {
        setLoadedProducts((prevProducts) => [
          ...prevProducts,
          ...products.map((product) => ({ ...product, id: product.id + prevProducts.length })), // Ensure unique keys
        ]);
        setLoadingMore(false);
      }, 1000); // Wait for 1 second before loading more products
    }
  }, [loadedProducts.length, loadingMore, products]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!loadedProducts.length) {
    return <Spinner />;
  }

  const handleAddToCart = (product) => {
    setAdding(product.id);
    dispatch(addItemToCart(product));
    setTimeout(() => {
      setAdding(null);
    }, 1000); // Hide Button spinner after  1 second
  };

  return (
    <div className="product-list">
      {loadedProducts.map((product, index) => (
        <div key={`${product.id}-${index}`} className="product-item">
          <img className="product-image" src={product.image} alt={product.title} />
          <h6 className="product-title">{product.title}</h6>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
            {adding === product.id ? <ButtonSpinner /> : "Add to Cart"}
          </button>
        </div>
      ))}
      {loadingMore && <Spinner />}
    </div>
  );
};

export default ProductList;
