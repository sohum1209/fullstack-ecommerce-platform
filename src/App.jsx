import "./App.css";
import {Route, Routes} from "react-router-dom"
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DetailProduct from "./components/pages/DetailProduct";
import Products from "./components/pages/Products.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Cart from "./components/pages/Cart.jsx";
import { CartProvider } from "./components/context/Cartcontext.jsx";

function App() {
  return (
    <>
      <CartProvider>
      <Header />
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<Container/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
        <Route path="/product/:id" element={<DetailProduct />} />
      </Routes>
      <Footer />
      </CartProvider>
    </>
  );
}

export default App;
