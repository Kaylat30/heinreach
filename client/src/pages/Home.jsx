import { useState, useEffect } from 'react';
import slide_img1 from '../imgs/slide_img1.jpg'; 
import slide_img2 from '../imgs/slide_img2.jpg'; 
import slide_img3 from '../imgs/slide_img3.jpg'; 
import slide_img4 from "../imgs/slide_img4.jpg" 
import pads from "../imgs/pads.jpg" ;
import design from "../imgs/design.jpg" ;
import iphone from "../imgs/pads.jpg" ;
import {IoChevronForward,IoChevronBack} from "react-icons/io5";
import { Link,defer, useLoaderData } from 'react-router-dom';
import { getProducts } from "../api";

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
  const shuffledProducts = shuffleArray(loadedProducts);
  return defer({ products: shuffledProducts });
}
export default function Home() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const loaderData = useLoaderData()
    const products = loaderData.products;
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    // useeffet for calculating time left
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000); // Update every 1 second

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to calculate the remaining time
  function calculateRemainingTime() {
    const targetDate = new Date('2024-01-01 00:00:00');
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      // Timer has expired
      return '0d 00:00:00';
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return `${days}d ${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;
  }

  const slides = [
    {
      image: slide_img1,      
    },
    {
      image: slide_img2
      
    },
    {
      image: slide_img3,
      
    },
    {
      image: slide_img4,
    },
    {
      image: slide_img2,
    },
  ];
  const imagescroll = [
    {
      image: slide_img1, 
      category: "Clothes",
      name: "Infinix Hot 30 Play",
      price: 239000     
    },
    {
      image: slide_img2,
      category: "Gaming" ,
      name: "Hp Elite X2",
      price: 239000 
    },
    {
      image: slide_img3,
      category: "Gaming",
      name: "Electric dry Iron",
      price: 239000   
    },
    {
      image: slide_img4,
      category: "Gaming",
      name: "Stabex Gas",
      price: 239000  
    },
    {
      image: slide_img2,
      category: "Gaming",
      name: "Minute Maid",
      price: 239000 
    },
    {
      image: slide_img1, 
      category: "Gaming",
      name: "Lato Milk",
      price: 239000      
    },
    {
      image: slide_img2,
      category: "Gaming",
      name: "Shoes",
      price: 239000  
    },
    {
      image: slide_img3,
      category: "Gaming",
      name: "Sugar",
      price: 239000  
    },
    {
      image: slide_img4,
      category: "Gaming",
      name: "Bue Band",
      price: 239000  
    },
    {
      image: slide_img2,
      category: "Gaming",
      name: "Soap",
      price: 239000  
    },
  ];

  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentSlideData = slides[currentSlide];

  const renderCatIntroProducts =()=>{
    let category = ["Furniture","Drinks","Clothes","Phones","Fashion","Home"]

      return category.map((cat,i)=>(
        <div key={i} className='space-y-5'>
          {/*Category intro section  */}
          <div className='flex justify-center sm:mx-8   lg:mx-20 flex-col'>
                <div className='bg-brightGreenLight h-12 items-center md:text-2xl rounded-t-md text-black  flex justify-center px-1 sm:px-4'>
                    Deals on {cat}
                </div>
                <div className='relative flex items-center bg-white rounded-b-md'>
                    {renderCategoryIntro(cat)}
                </div>
            </div>


            {/*Phones section  */}
            <div className='flex justify-center sm:mx-8   lg:mx-20 flex-col'>
                <div className='bg-brightGreenLight h-12 items-center md:text-2xl rounded-t-md text-black  flex justify-between px-1 sm:px-4'>
                  <div className='font-bold'>{cat} </div>
                  <Link to={`shop?category=${cat}`}> See All</Link>
                </div>
                <div className='relative flex items-center bg-white rounded-b-md'>
                  <IoChevronBack className=' opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideLeft(i)} size={40} />
                  <div id={`slider${i}`} className='w-full  space-x-4  h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                  {renderFlashCategoryProducts(cat)}
                  </div>
                  <IoChevronForward className=' opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideRight(i)} size={40} />
                </div>
            </div>
        </div>
      ))
    
  }

  

  const renderSlideIndicators = () => {
    return (
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'dotactive' : ''}`}
            onClick={() => showSlide(index)}
          ></span>
        ))}
      </div>
    );
  };  

  const renderFlashCategoryProducts = (category)=>{
    
    if (category) {
      const categoryProducts = products.filter(product => product.category === category).slice(0, 5);
      
      return (
        <>
          {categoryProducts.map((product) => (
            <Link to={`/shop/product/${product._id}`} key={product._id} className='my-4 relative inline-block rounded-lg xsm:h-36 xsm:w-30 md:h-64 md:w-44 cursor-pointer hover:scale-105 ease-in-out duration-300 hover:shadow-xl'>
            <div className='flex justify-center'>
               <img className='rounded-lg xsm:h-20 xsm:w-20 md:w-40 md:h-40' src={iphone}/>
               <h1 className='absolute bg-gray-200 rounded-sm text-brightGreen top-1 right-2  font-bold xsm:text-sm md:text-md'>-{product.discount}%</h1>
             </div>                      
             <div className='md:ml-4 ml-2 sm:mt-4'>
               <h1 className='text-xs md:text-lg'>{product.name}</h1>
               <h1 className=' font-bold md:text-xl text-sm'>{product.finalprice.toLocaleString()}</h1>
               <h1 className='text-sm hidden md:block line-through'>{product.initialprice.toLocaleString()}</h1>
             </div>
            </Link>
          ))}
        </>
      );
    } else {
      // If no category is provided, display all products
      return (
        <>
          {products.slice(0,5).map((product)=>(
           <Link to={`/shop/product/${product._id}`} key={product._id} className='my-4 relative inline-block rounded-lg xsm:h-36 xsm:w-30 md:h-64 md:w-44 cursor-pointer hover:scale-105 ease-in-out duration-300 hover:shadow-xl'>
             <div className='flex justify-center'>
               <img className='rounded-lg xsm:h-20 xsm:w-20 md:w-40 md:h-40' src={iphone}/>
               <h1 className='absolute bg-gray-200 rounded-sm text-brightGreen top-1 right-2  font-bold xsm:text-sm md:text-md'>-{product.discount}%</h1>
             </div>                      
             <div className='md:ml-4 ml-2 sm:mt-4'>
               <h1 className='text-xs md:text-lg'>{product.name}</h1>
               <h1 className=' font-bold md:text-xl text-sm'>{product.finalprice.toLocaleString()}</h1>
               <h1 className='text-sm hidden md:block line-through'>{product.initialprice.toLocaleString()}</h1>
             </div>
           </Link>
         ))}
        </>
      );
    }
  }

  const renderCategoryIntro = (category)=>{
      const categoryIntro = products.filter(product => product.category === category).slice(0, 3);
      
    return (
      <>
        {categoryIntro.map((product)=>(
          <div key={product._id} className='relative flex md:m-3 lg:mx-7 m-1 cursor-pointer hover:scale-105 ease-in-out duration-300 hover:shadow-xl'>
            <img className='h-auto w-auto sm:h-60 sm:w-80 md:h-72 rounded-md' src={design} />
            <div className='absolute flex flex-wrap-reverse justify-center items-center lg:top-14 lg:left-10 md:top-16 md:left-12 sm:top-12 top-14 left-4'>
              <div>
                <h1 className='md:text-lg text-sm text-white'>{product.name}</h1>
                <h1 className=' font-bold sm:text-xl text-xs text-white'>{product.finalprice.toLocaleString()}UGX</h1>
                <h1 className='text-xs line-through text-white'>{product.initialprice.toLocaleString()}</h1>
              </div>
              <div>
                <img className='sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-36 lg:w-36 h-10 w-10' src={iphone} />
              </div>
            </div>
            
          </div>
        ))}
      </>
    );
    
  }

  // horizontal scroll slider buttons
  const slideLeft =(i)=>{
    
    let slider = document.getElementById(`slider${i}`)
    slider.scrollLeft = slider.scrollLeft - 500
    
    
  }
  const slideRight =(i)=>{
    
    let slider = document.getElementById(`slider${i}`)
    slider.scrollLeft = slider.scrollLeft + 500
    
    
  }

    return(
        <div className='bg-brightGreen space-y-4'>
            {/* first slider section */}
            <div>
                <div className="slideshow-container">       
                    <img className="slideshow-image w-full" src={currentSlideData.image} alt={`Image ${currentSlide + 1}`} />       
                    <button className="slideshow-button prev rounded-full opacity-0 hover:opacity-100" onClick={prevSlide}>
                    <IoChevronBack/>
                    </button>
                    <button className="slideshow-button next rounded-full opacity-0 hover:opacity-100" onClick={nextSlide}>
                    <IoChevronForward/>
                    </button>
                </div>
                {renderSlideIndicators()}
            </div>

            {/* categories section */}
            <div className='flex justify-center sm:mx-8   lg:mx-20 flex-col'>
                <div className='bg-green-700 h-12 items-center md:text-2xl rounded-t-md text-black  flex justify-center'>Categories</div>
                <div className='relative flex items-center bg-white rounded-b-md'>
                  <IoChevronBack className=' opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideLeft(-1)} size={40} />
                  <div id='slider-1' className='w-full  space-x-4  h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                  {imagescroll.map((image,index)=>(
                    <Link key={index} to={`shop?category=${image.category}`} className='my-4 relative inline-block rounded-lg xsm:h-20 xsm:w-20 md:h-32 md:w-32'>
                      <img className='rounded-lg xsm:h-20 xsm:w-20 md:w-32 md:h-32 cursor-pointer hover:scale-105 ease-in-out duration-300' src={pads}/>
                      <h1 className='absolute text-white md:top-14 md:left-8 xsm:top-8 xsm:left-3 font-bold xsm:text-sm md:text-md'>{image.category}</h1>
                    </Link>
                  ))}
                  </div>
                  <IoChevronForward className=' opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideRight(-1)} size={40} />
                </div>
            </div>         

            {/*Flash Sales section  */}
            <div className='flex justify-center sm:mx-8   lg:mx-20 flex-col'>
              <div className='bg-red-700 h-12 items-center md:text-2xl rounded-t-md text-white  flex justify-between px-1 sm:px-4'>
                <div>Flash Sales</div>
                <div> Time Left: <span className='font-bold'>{remainingTime}</span></div>
              </div>
              <div className='relative flex items-center bg-white rounded-b-md'>
                <IoChevronBack className=' opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideLeft(-2)} size={40} />
                <div id='slider-2' className='w-full  space-x-4  h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                {renderFlashCategoryProducts()}
                </div>
                <IoChevronForward className=' opacity-50 cursor-pointer hover:opacity-100' onClick={()=>slideRight(-2)} size={40} />
              </div>
          </div> 

            {renderCatIntroProducts()}

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
