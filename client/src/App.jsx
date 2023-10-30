import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Error from './components/Error'
import Layout  from './components/Layout'
import Home,{loader as homeLoader} from './pages/Home'
import Shop,{loader as productsLoader} from "./pages/Shop"
import About from "./pages/About"
import Help from "./pages/Help"
import Contact from "./pages/Contact"
import Cart, {loader as cartLoader} from "./pages/Cart"
import ProductInfo,{loader as productInfoLoader} from "./pages/ProductInfo"
import Login, {loader as loginLoader, action as loginAction} from "./pages/Login"
import Signup, {action as signupAction} from "./pages/Signup"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route index loader={homeLoader} element={<Home />} />
    <Route path="shop" loader={productsLoader} element={<Shop />} />
    <Route path="shop/product/:id" loader={productInfoLoader} element={<ProductInfo />} />
    <Route path="about" element={<About />} />
    <Route path="help" element={<Help />} />
    <Route path="contact" element={<Contact />} />
    <Route path="cart" loader={cartLoader} element={<Cart />} />
    <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
    <Route path="signup" element={<Signup />} action={signupAction} />
  </Route>
))
export default function App(){
  return(
    <RouterProvider router={router} />
  )
}