import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Registeration from './components/Registeration/Registeration';
import Categories from './components/Categories/Categories';
import Notfound from './components/NotFound/Notfound';
import AuthProvider from './context/authentication';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/productDetails/ProductDetails';
import CartContextProvider from './context/cartContext';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/CashPayment';
import AllOrders from './components/AllOrders/AllOrders';
import OnlinePayment from './components/OnlinePayment/OnlinePayment';
import { Offline } from 'react-detect-offline';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyPassword from './components/VerifiyPassword/VerifyPassword';
import UpdateResetPassword from './components/UpdateResetPassword/UpdateResetPassword';
import ScrollToTop from 'react-scroll-to-top';
import { Flip, ToastContainer } from 'react-toastify';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import BrandsDetails from './components/BrandsDetails/BrandsDetails';
import WishList from './components/WishList/WishList';
import WithListProvider from './context/wishListContext';







let clientQuery = new QueryClient();
const MyRouter = createHashRouter([
  {
    path: "/", element: <Layout />, children: [
      {
        index: true, element: <Products />
      },
      {
        path: "products", element: <Products />
      },
      {
        path: "brands", element: <Brands />
      },
      {
        path: "brandsDetails/:id", element: <BrandsDetails />
      },
      { path: "login", element: <Login /> },
      { path: "Registeration", element: <Registeration /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "verifypassword", element: <VerifyPassword /> },
      { path: "updateresetpassword", element: <UpdateResetPassword /> },
      {
        path: "categories", element: <Categories />
      },
      {
        path: "categoriesDetails/:id", element: <CategoryDetails />
      },

      {
        path: "allorders", element:
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>

      },
      {
        path: "CashPayment", element:
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>

      },
      {
        path: "OnlinePayment", element:
          <ProtectedRoute>
            <OnlinePayment />
          </ProtectedRoute>

      },
      {
        path: "productDetails/:id", element:
          <ProductDetails />

      },
      {
        path: "cart", element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      },
      {
        path: "wishList", element: <ProtectedRoute>
          <WishList />
        </ProtectedRoute>
      },
      {
        path: "profile", element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      { path: "*", element: <Notfound /> },

    ]
  }
])
function App() {
  return (
    <>
      <QueryClientProvider client={clientQuery}>

        <CartContextProvider>
          <AuthProvider>
            <WithListProvider>

              <RouterProvider router={MyRouter} />
            </WithListProvider>
          </AuthProvider>
        </CartContextProvider>

        <ToastContainer limit={3} autoClose={2000} transition={Flip} stacked closeOnClick theme='colored' position='top-right' />

      </QueryClientProvider>

      <Offline >
        <div className='position-fixed bottom-0 start-0 main-bg-color text-white p-3 rounded-3'>
          Oops.... YOU ARE OFFLINE NOW <i className="fa-solid fa-wifi"></i>
        </div>
      </Offline>
      <ScrollToTop smooth color="#0AAD0A" />
    </>
  );
}

export default App;
