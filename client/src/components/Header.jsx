// import { useState,useEffect, } from 'react';
// import { Link, NavLink ,useLocation, Form,useSearchParams, useNavigate } from 'react-router-dom';
// import image from '../imgs/logo.png';
// import {IoSearch,IoCart,IoPersonCircleOutline } from "react-icons/io5";
// import { getCart,logoutUser } from '../api';
// import { toast } from "react-toastify"
// import Cookies from "js-cookie"
// import { selectFirstName } from '../slice/userSlice';
// import { useAppSelector } from '../store';

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [count, setCount] = useState(0);
//   const [cartItems, setCartItems] = useState([]);
//   const [setSearchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const firstName = useAppSelector(selectFirstName);

//   useEffect(() => {
//     // Scroll to the top of the page when the location changes
//     window.scrollTo(0, 0);
//   }, [location.pathname]);
 
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const cartData = await getCart();
//         setCartItems(cartData);
//         cartData.length == undefined ? setCount(0) : setCount(cartData.length)
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };

//     fetchCart(); 

    
//   }, [cartItems]);


//   const activeStyles = {
//     fontWeight: "bold",
//     textDecoration: "underline",
//     color: "#161616",
// }

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//     // Close the account slider when opening the menu
//     setShowDiv(false);
//   };

//   // Close the menu when a navigation occurs
//   useEffect(() => {
//     setMenuOpen(false);
//     setShowDiv(false);
//   }, [location.pathname]);
 
//   const [showDiv, setShowDiv] = useState(false);

//   // Access the firstname from the firstname cookie
//   // const firstnameCookie = Cookies.get('firstname');
//   // const firstnameData = firstnameCookie ? JSON.parse(firstnameCookie) : {};
//   // const isAuthenticated = !!firstnameData.firstname;
//   // const username = firstnameData.firstname || "";

//   const isAuthenticated = !!firstName;
//   const username = firstName || "";

//   const toggleDiv = () => {
//     setShowDiv(!showDiv);
//     // Close the menu when opening the account slider
//     setMenuOpen(false);
//   };

//   const handleSearch = async (event) => {
//     event.preventDefault();
  
//     let searchQuery = event.target.search.value;  
  
//     setSearchParams({ search: searchQuery });
  
//     // You can navigate to the search results page with the query parameter
//     navigate(`/shop?search=${searchQuery}`);
//   };

//   const handleLogout = async () => {
//     try {
//       // Call the logout API function
//       await logoutUser();
  
//       // Remove the 'firstname' cookie
//       Cookies.remove('firstname');
  
//       toast.success(" logged out successfully",{
//         position: "bottom-left"
//       })
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <nav className="flex flex-col justify-center mx-auto px-4 pb-4 fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
//       <div className='flex items-center justify-between'>
//           <Link to="/" className="pt-2 flex items-center">
//             <img className="h-16" src={image}  alt="heinReach Logo" />
//             <h2 className="font-bold text-xl">HeinReach</h2>
//           </Link>

//           {/* search section  */}
//           <div className='hidden sm:flex  '>
//             <Form className='flex' onSubmit={handleSearch}>
//               <input 
//               name='search' 
//               className='flex border shadow-inner sm:w-32 md:w-72 rounded-md pl-2' 
//               placeholder='Search products and categories' 
//               //value={searchQuery}
//               //onChange={(e) => setSearchQuery(e.target.value)}  
//               />
//               <button type='submit' className="block p-1.5 text-2xl text-white bg-brightGreen rounded-full baseline hover:bg-brightGreenLight"><IoSearch/></button>
//             </Form>
//           </div>
          
//           <div className='flex space-x-6'>
//             {/* Show on screens smaller than LG (976px) */}
//             <div className={`lg:flex space-x-6 hidden `}>

//             <NavLink 
//             to="shop"           
//             className="hover:text-brightGreen"
//             style={({isActive}) => isActive ? activeStyles : null}>
//               Shop
//             </NavLink>

//             <NavLink 
//             to="about"           
//             className="hover:text-brightGreen"
//             style={({isActive}) => isActive ? activeStyles : null}>
//               About Us
//             </NavLink>

//             {/* This link is hidden on screens smaller than LG */}           

//             <NavLink 
//             to="help" 
//             className="hover:text-brightGreen"
//             style={({isActive}) => isActive ? activeStyles : null}>
//               Help
//             </NavLink>

//             <NavLink 
//             to="contact" 
//             className="hover:text-brightGreen"
//             style={({isActive}) => isActive ? activeStyles : null}>
//               Contact Us
//             </NavLink>

//             </div>

//             <div className='flex space-x-6'>
//                 <NavLink
//                   to="cart"
//                   className="hover:text-brightGreen text-2xl relative"
//                   style={({isActive}) => isActive ? activeStyles : null}
//                 >
//                   <IoCart />                  
//                     <span className="absolute flex justify-center -top-1 -right-1 bg-brightGreen text-xs text-white  h-4 w-4 rounded-full">
//                       {count}
//                     </span>
                  
//                 </NavLink>

//                 <button 
//                 className="hover:text-brightGreen text-2xl"
//                 onClick={toggleDiv}>
//                   <IoPersonCircleOutline/>
//                 </button>
//             </div>

//             <button
//               id="menu-btn"
//               className={`hamburger lg:hidden focus:outline-none ${
//                 menuOpen ? 'open' : ''
//               }`}
//               onClick={toggleMenu}
//             >
//               <span className="hamburger-top"></span>
//               <span className="hamburger-middle"></span>
//               <span className="hamburger-bottom"></span>
//             </button>
//         </div>
        
        
//       </div>

//       {/* search section mobile  */}
//       <div className='flex justify-center sm:hidden'>
//             <Form className='flex'onSubmit={handleSearch}>
//               <input 
//               name='search' 
//               className='flex border shadow-inner w-80 sm:w-96 rounded-md pl-1' 
//               placeholder='Search products and categories'
//               //value={searchQuery} 
//               //onChange={(e) => setSearchQuery(e.target.value)}  
//               />
//               <button type='submit' className="block p-1 text-2xl text-white bg-brightGreen rounded-full baseline hover:bg-brightGreenLight"><IoSearch/></button>
//             </Form>
//       </div>

//         {/* Account slider section */}
//         {showDiv && (
//           <div className="fixed right-5 top-20 h-32 shadow-2xl w-1/3 bg-white overflow-hidden transition-all duration-1000">
//             <div className="p-4 space-y-4">
              
//               {isAuthenticated ?
//               ( <>
//                 <h1>hello, {username}</h1>
//                 <button
//                   to="login"
//                   onClick={handleLogout}
//                   className="flex justify-center p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
//                 >
//                   Logout
//                 </button>
//                 </>):
//                 ( <>
//                   <h1>Welcome </h1>
//                   <Link
//                   to="login"
//                   className="flex justify-center p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
//                 >
//                   Login
//                 </Link>
//                 </>)
//                 }
              
//             </div>
//           </div>
//         )}

//         {/* hamburg menu div */}      
//         <div
//           id="menu"
//           className={`lg:hidden  ${
//             menuOpen ? 'flex flex-col' : 'hidden'
//           } items-center self-end py-8 mt-10 space-y-6 font-bold bg-white xsm:w-64 xsm:self-center left-6 right-6 drop-shadow-md`}
//         >
          
//           <Link to="shop">Shop</Link>
//           <Link to="about">About Us</Link>
//           <Link to="help">Help</Link>
//           <Link to="contact">Contact Us</Link>        
                  
//         </div>
//     </nav>
//   );
// }





import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, Form, useSearchParams, useNavigate } from 'react-router-dom';
import image from '../imgs/logo.png';
import { IoSearch, IoCart, IoPersonCircleOutline } from "react-icons/io5";
import { getCart } from '../api';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../store';
import { LogoutUser, selectFirstName } from '../slice/userSlice';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const firstName = useAppSelector(selectFirstName);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCartItems(cartData);
        setCount(cartData.length ?? 0);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCart();
  }, [cartItems]);

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setShowDiv(false);
  };

  useEffect(() => {
    setMenuOpen(false);
    setShowDiv(false);
  }, [location.pathname]);

  const [showDiv, setShowDiv] = useState(false);

  const isAuthenticated = !!firstName;
  const username = firstName || "";

  const toggleDiv = () => {
    setShowDiv(!showDiv);
    setMenuOpen(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    let searchQuery = event.target.search.value;
    setSearchParams({ search: searchQuery });
    navigate(`/shop?search=${searchQuery}`);
  };

  const handleLogout = async () => {
    try {
      // Dispatch the logout thunk
      await dispatch(LogoutUser());
      toast.success("Logged out successfully", {
        position: "bottom-left"
      });
      navigate('/login');  // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed', {
        position: 'bottom-left'
      });
    }
  };

  return (
    <nav className="flex flex-col justify-center mx-auto px-4 pb-4 fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className='flex items-center justify-between'>
        <Link to="/" className="pt-2 flex items-center">
          <img className="h-16" src={image} alt="heinReach Logo" />
          <h2 className="font-bold text-xl">HeinReach</h2>
        </Link>

        <div className='hidden sm:flex'>
          <Form className='flex' onSubmit={handleSearch}>
            <input
              name='search'
              className='flex border shadow-inner sm:w-32 md:w-72 rounded-md pl-2'
              placeholder='Search products and categories'
            />
            <button type='submit' className="block p-1.5 text-2xl text-white bg-brightGreen rounded-full baseline hover:bg-brightGreenLight"><IoSearch /></button>
          </Form>
        </div>

        <div className='flex space-x-6'>
          <div className={`lg:flex space-x-6 hidden`}>
            <NavLink to="shop" className="hover:text-brightGreen" style={({ isActive }) => isActive ? activeStyles : null}>Shop</NavLink>
            <NavLink to="about" className="hover:text-brightGreen" style={({ isActive }) => isActive ? activeStyles : null}>About Us</NavLink>
            <NavLink to="help" className="hover:text-brightGreen" style={({ isActive }) => isActive ? activeStyles : null}>Help</NavLink>
            <NavLink to="contact" className="hover:text-brightGreen" style={({ isActive }) => isActive ? activeStyles : null}>Contact Us</NavLink>
          </div>

          <div className='flex space-x-6'>
            <NavLink
              to="cart"
              className="hover:text-brightGreen text-2xl relative"
              style={({ isActive }) => isActive ? activeStyles : null}
            >
              <IoCart />
              <span className="absolute flex justify-center -top-1 -right-1 bg-brightGreen text-xs text-white h-4 w-4 rounded-full">
                {count}
              </span>
            </NavLink>

            <button className="hover:text-brightGreen text-2xl" onClick={toggleDiv}>
              <IoPersonCircleOutline />
            </button>
          </div>

          <button
            id="menu-btn"
            className={`hamburger lg:hidden focus:outline-none ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>

      <div className='flex justify-center sm:hidden'>
        <Form className='flex' onSubmit={handleSearch}>
          <input
            name='search'
            className='flex border shadow-inner w-80 sm:w-96 rounded-md pl-1'
            placeholder='Search products and categories'
          />
          <button type='submit' className="block p-1 text-2xl text-white bg-brightGreen rounded-full baseline hover:bg-brightGreenLight"><IoSearch /></button>
        </Form>
      </div>

      {showDiv && (
        <div className="fixed right-5 top-20 h-32 shadow-2xl w-1/3 bg-white overflow-hidden transition-all duration-1000">
          <div className="p-4 space-y-4">
            {isAuthenticated ? (
              <>
                <h1>Hello, {username}</h1>
                <button
                  onClick={handleLogout}
                  className="flex justify-center p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <h1>Welcome</h1>
                <Link
                  to="login"
                  className="flex justify-center p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <div
        id="menu"
        className={`lg:hidden ${menuOpen ? 'flex flex-col' : 'hidden'} items-center self-end py-8 mt-10 space-y-6 font-bold bg-white xsm:w-64 xsm:self-center left-6 right-6 drop-shadow-md`}
      >
        <Link to="shop">Shop</Link>
        <Link to="about">About Us</Link>
        <Link to="help">Help</Link>
        <Link to="contact">Contact Us</Link>
      </div>
    </nav>
  );
}
