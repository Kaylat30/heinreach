import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Error from './components/Error'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from "./pages/Shop"
import About from "./pages/About"
import Help from "./pages/Help"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import ProductInfo from "./pages/ProductInfo"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route index element={<Home />} />
    <Route path="shop" element={<Shop />} />
    <Route path="shop/product/:id" element={<ProductInfo />} />
    <Route path="about" element={<About />} />
    <Route path="help" element={<Help />} />
    <Route path="contact" element={<Contact />} />
    <Route path="cart" element={<Cart />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
  </Route>
))
export default function App(){
  return(
    <RouterProvider router={router} />
  )
}