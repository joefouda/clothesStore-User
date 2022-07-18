import './App.css';
import 'antd/dist/antd.css'
import Nav from './shared/Nav/Nav';
import { Layout } from 'antd';
import HomePage from './pages/Home';
import FilterPage from './pages/Filter'
import ProductDetailsPage from './pages/ProductDetails'
import UserProfilePage from './pages/UserProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartProvider from './contexts/cartContext';
import FavoriteProvider from './contexts/favoriteContext';
import NotificationProvider from './contexts/notificationContext';

const { Footer } = Layout;

function App() {
  return (
    <NotificationProvider>
      <FavoriteProvider>
        <CartProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route exact path='/filter/:category' element={<FilterPage />} />
              <Route exact path='/filter/:category/:subCategory' element={<FilterPage />} />
              <Route exact path='/:category/:subCategory/:model/:product/:id' element={<ProductDetailsPage />} />
              <Route exact path='/profile' element={<UserProfilePage />} />
            </Routes>
            <Footer style={{ textAlign: 'center' }}>BUTRO'N ©2022 Created by joeFouda</Footer>
          </BrowserRouter>
        </CartProvider>
      </FavoriteProvider>
    </NotificationProvider>
  );
}

export default App;
