import 'antd/dist/antd.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './shared/Nav/Nav';
import MainFooter from './shared/Footer/Footer';
import HomePage from './pages/Home';
import FilterPage from './pages/Filter'
import ProductDetailsPage from './pages/ProductDetails'
import UserProfilePage from './pages/UserProfile';
import CheckoutPage from './pages/Checkout';
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import PageNotFound from './components/PageNotFound';
import MayRender from './shared/MayRender';
import { LogInGuard, LogOutGuard, Redirect } from './auth/authGuards';
import CartProvider from './contexts/cartContext';
import FavoriteProvider from './contexts/favoriteContext';
import NotificationProvider from './contexts/notificationContext';
import UserProvider from './contexts/userContext';


function App() {
  return (
    <NotificationProvider>
      <UserProvider>
        <FavoriteProvider>
          <CartProvider>
            <BrowserRouter>
              <MayRender>
                <Nav />
              </MayRender>
              <Routes>
                <Route path='/login' element={<LogOutGuard />}>
                  <Route path="/login" element={<LoginPage />} />
                </Route>
                <Route path='/signup' element={<LogOutGuard />}>
                  <Route path="/signup" element={<SignupPage />} />
                </Route>
                <Route path='/' element={<HomePage />} />
                <Route path='/filter/:category' element={<FilterPage />} />
                <Route path='/filter/:category/:subCategory' element={<FilterPage />} />
                <Route path='/:category/:subCategory/:model/:product/:id' element={<ProductDetailsPage />} />
                <Route path='/profile' element={<LogInGuard />}>
                  <Route path='/profile' element={<UserProfilePage />} />
                </Route>
                <Route path='/checkout' element={<LogInGuard />}>
                  <Route path='/checkout' element={<CheckoutPage />} />
                </Route>
                <Route path="*" element={<Redirect />} />
                <Route path="/404" element={<PageNotFound />} />
              </Routes>
              <MayRender>
                <MainFooter />
              </MayRender>
            </BrowserRouter>
          </CartProvider>
        </FavoriteProvider>
      </UserProvider>
    </NotificationProvider>
  );
}

export default App;
