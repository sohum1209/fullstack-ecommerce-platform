import "./App.css";
import { Route, Routes } from "react-router-dom"
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DetailProduct from "./components/pages/DetailProduct";
import Products from "./components/pages/Products.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Login from "./components/pages/Login.jsx";
import VerifyEmail from "./components/pages/VerifyEmail.jsx";
import Cart from "./components/pages/Cart.jsx";
import Checkout from "./components/pages/Checkout.jsx";
import Orders from "./components/pages/Orders.jsx";
import { CartProvider } from "./components/context/Cartcontext.jsx";
import { AuthProvider } from "./components/context/Authcontext.jsx";
import Signup from "./components/pages/SignUp.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Header />
          <ScrollToTop></ScrollToTop>
          <Routes>
            <Route path="/" element={<Container />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/product/:id" element={<DetailProduct />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/verify" element={<VerifyEmail/>}/>
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
