import { IoChevronForward,IoChevronBack, IoTrashBin, IoAlertCircleOutline } from "react-icons/io5";
import { Link,defer,useLoaderData } from "react-router-dom";
import { getCart, getProducts,deleteCart,updateCartAmount, checkout } from "../api";
import iphone from "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.forbes.com%2Fsites%2Fgordonkelly%2F2023%2F04%2F01%2Fapple-iphone-15-pro-max-new-volume-mute-buttons-design-changes%2F&psig=AOvVaw3WWIvrcU2-IeJr3JNbbvYb&ust=1701794044371000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKiq8P6a9oIDFQAAAAAdAAAAABAE" ;
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

function shuffleArray(array) {
  
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function loader() {
  const loadedProducts = await getProducts();
  const loadedCart = await getCart()
  const shuffledProducts = shuffleArray(loadedProducts);
  return defer({ products: shuffledProducts, cartItems: loadedCart });
}
export default function Cart()
{
  const loaderData = useLoaderData()
  const products = loaderData.products
  const [cartItems, setCartItems] = useState(loaderData.cartItems);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCartItems(cartData);
        
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart(); 

    
  }, [cartItems]);

  let count = cartItems.length == undefined ? 0 : cartItems.length

  const deleteCartItem = async(product)=>{
    try {
       const deleted = await deleteCart(product._id);
       if(deleted)
       {
        toast.success(`${product.name} removed successfully`,{
          position: "bottom-left"
        })
       }
      
    } catch (error) {
      console.log(error)
    }
    
  }

  function renderYouMayLikeElements()
  {

    return(
      <>
        {products.slice(0,5).map((product)=>(
          <Link to={`/shop/product/${product._id}`} key={product._id} className='my-4 relative inline-block rounded-lg xsm:h-36 xsm:w-30 md:h-64 md:w-44 cursor-pointer hover:scale-105 ease-in-out duration-300 hover:shadow-xl'>
            <div className='flex justify-center'>
              <img className='rounded-lg xsm:h-20 xsm:w-20 md:w-40 md:h-40' src={iphone}/>
              <h1 className='absolute bg-gray-200 rounded-sm text-brightGreen top-1 right-2  font-bold xsm:text-sm md:text-md'>-23%</h1>
            </div>                      
            <div className='md:ml-4 ml-2 sm:mt-4'>
              <h1 className='text-xs md:text-lg'>{product.name}</h1>
              <h1 className=' font-bold md:text-xl text-sm'>{product.finalprice.toLocaleString()}</h1>
              <h1 className='text-sm hidden md:block line-through'>{product.initialprice.toLocaleString()}</h1>
            </div>
          </Link>
        ))}
      </>
    )
  }

  const handleAmountChange = async(change,product) => {
    const newAmount = product.amount + change;
      await updateCartAmount(newAmount, product._id); 
      toast.success(`${product.name} amount updated successfully`,{
        position: "bottom-left"
      })
    }
  

  const handleCheckout = async() => {
    try {
      
      await checkout();
  
       toast.success("Checked out successfully",{
         position: "bottom-left"
       })
      
     
   } catch (error) {
     console.log(error)
   }
  }

  // Check firstname from the firstname cookie
  const firstnameCookie = Cookies.get('firstname');
  const firstnameData = firstnameCookie ? JSON.parse(firstnameCookie) : {};
  const isAuthenticated = !!firstnameData.firstname;

  const pathname = new URL(window.location.href).pathname;

  
  // Calculate the subtotal
  const calculateSubtotal = () => {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      let subtotal = 0;
      cartItems.forEach((product) => {
        subtotal += product.finalprice * product.amount;
      });
      return subtotal.toLocaleString();
    } else {
      return "0"; 
    }
  };
  

  const renderCartItems = ()=>{
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return <div>No items in the cart</div>;
    }
    
    return(
      <>
        {cartItems.map((product)=>(
          <div key={product._id} className="p-4 border border-l-0 border-r-0 border-t-0">                           
              <div className="flex justify-between flex-wrap ">                            
                  <div className="flex ">
                      <img className="w-20 h-20" src={iphone} />
                      <div>
                      <h1 >{product.name}</h1>
                      <h1 className="text-red-600 text-xs flex items-center space-x-1"><IoAlertCircleOutline/><span>{product.quantity} units left</span></h1>
                      </div>
                  </div>
                  <div>
                      <h1 className="font-bold sm:text-xl text-sm">{product.finalprice.toLocaleString()} UGX</h1>
                      <div className="flex">
                          <h1 className="line-through sm:text-sm text-xs">{product.initialprice.toLocaleString()} UGX</h1>
                          <h1 className="text-brightGreen bg-veryLightGray rounded-sm sm:text-sm text-sm">-{product.discount}%</h1>
                      </div>
                  </div>
              </div>            
              <div>
                  <div className="flex justify-between">
                      <button
                        onClick={()=> deleteCartItem(product)}
                       className="flex items-center cursor-pointer text-brightGreen space-x-2"><IoTrashBin/> <span>REMOVE</span></button>
                      <div className="space-x-4">
                          <button onClick={() => handleAmountChange(-1,product)} className="bg-brightGreen text-white font-bold w-6 sm:w-10 sm:h-10 rounded-md sm:text-3xl">-</button>
                          <label className="sm:text-3xl text-lg">{product.amount}</label>
                          <button onClick={() => handleAmountChange(1,product)} className="bg-brightGreen text-white font-bold w-6 sm:w-10 sm:h-10 rounded-md sm:text-3xl">+</button>
                      </div>
                  </div>
              </div>
          </div>
        ))}
      </>
    )
  }
    // horizontal scroll slider buttons
  const slideLeft =()=>{
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const slideRight =()=>{
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 500
  }
    return(
        <div className="bg-veryLightGray space-y-4">
            {/* Cart section */}
            <section className="bg-white rounded-lg xsm:mx-6 lg:mx-20">
                <div className='h-12 items-center md:text-2xl rounded-t-md text-black  flex justify-between px-1 sm:px-4 border border-l-0 border-r-0 border-t-0'>
                  <div className='font-bold'>Cart ({count})</div>
                  <div className='md:text-lg'>Subtotal: <span className="font-bold md:text-2xl">UGX {calculateSubtotal()}</span></div>
                </div>
                <div>
                    {renderCartItems()}
                </div>
                {isAuthenticated 
                ? (<button
                  onClick={()=> handleCheckout()}
                  className="flex justify-center p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
                >
                  CHECKOUT (UGX {calculateSubtotal()})
                </button>)
                :(<Link to={`/login?message=You must log in first.&redirectTo=${pathname}`}
                  className="flex justify-center p-3 px-6 w-full  md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
                >
                  CHECKOUT (UGX {calculateSubtotal()})
                </Link>)}
                
            </section>

            {/*you may also like section  */}
            <div className='flex justify-center sm:mx-8   lg:mx-20 flex-col'>
                <div className='bg-white h-12 items-center md:text-2xl rounded-t-md text-black  flex font-bold px-1 sm:px-4'>
                  Top selling items
                </div>
                <div className='relative flex items-center bg-white rounded-b-md'>
                  <IoChevronBack className=' opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
                  <div id='slider' className='w-full  space-x-4  h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                  {renderYouMayLikeElements()}
                  </div>
                  <IoChevronForward className=' opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
                </div>
            </div>

            {/* newsletter section */}
            <section className=' flex h-48 bg-brightGreen mt-10'>
                <div className="flex text-white flex-col justify-center lg:flex-row mx-auto space-x-4 items-center xsm:space-y-3 ">
                    
                    <div className="pl-4">
                        <p>NEW TO HEINREACH?</p>
                        <p className='md:text-2xl text-lg font-bold'>Subscribe to our newsletter to get updates on our latest offers!</p>
                    </div>

                    
                    <div className="sm:flex space-x-1 grid grid-cols-2">
                        <input type="text" className="flex-1 px-4 rounded-md outline-none" placeholder="Email Address"/>
                        <div className="p-3 px-6 pt-2 text-white bg-veryDarkBlue rounded-md baseline hover:bg-slate-800 " >
                        SUBSCRIBE</div>
                    </div>
                    
                    
                </div>
            </section> 
        </div>
    )

}