import './App.css';
import 'antd/dist/antd.css'
import Nav from './shared/Nav/Nav';
import { Layout } from 'antd';
import HomePage from './pages/Home';
import FilterPage from './pages/Filter'
import ProductDetailsPage from './pages/ProductDetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartProvider from './contexts/cartContext';

const { Footer } = Layout;

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/filter/:category' element={<FilterPage />} />
          <Route exact path='/filter/:category/:subCategory' element={<FilterPage />} />
          <Route exact path='/filter/:category/:subCategory/:product/:model/:id' element={<ProductDetailsPage />} />
        </Routes>
        <Footer style={{ textAlign: 'center' }}>BUTRO'N ©2022 Created by joeFouda</Footer>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
