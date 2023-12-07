import { Suspense } from "react";
import { getProducts,addCart } from "../api";
import { Await, Form, Link, defer, useLoaderData,useSearchParams } from "react-router-dom";
import { useState, } from "react";
import Slider from 'react-slider';
import { toast } from "react-toastify";


function shuffleArray(array) {
  
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function loader()
{
  let loadedproducts = await getProducts()
  const shuffledProducts = shuffleArray(loadedproducts);
  return defer({products:shuffledProducts})
}
export default function Shop()
{

  const [isFiltering, setIsFiltering] = useState(false); 
  const loaderData = useLoaderData()  
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize the current page state
  const [currentPage, setCurrentPage] = useState(1);
  
   const [min, max] = [0, 7000000]; 
   const [values, setValues] = useState([min, max]);

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    try {      
        const category = event.target.category.value 
        const discount = event.target.discount.value
        const minprice = values[0]
        const maxprice = values[1]
        const searchQuery = searchParams.get('search')

      setIsFiltering(true);
      // Build the query parameters based on the selected options
      const queryParameters = {};


      if (searchQuery) {
        queryParameters.search = searchQuery;
      }
      if (category) {
        queryParameters.category = category;
      }
      if (discount) {
        queryParameters.discount = discount.toString();
      }
      if (minprice) {
        queryParameters.minPrice = minprice.toString();
      }
      if (maxprice !== max) {
        queryParameters.maxPrice = maxprice.toString();
      }

      // Update the search parameters in the URL
      setSearchParams(queryParameters);

    } catch (error) {
      console.error('Filtering error:', error);
    }finally {
      setIsFiltering(false);
    }
    
  };

  
  const addToCart = async (product) => {
    try {

     const Itemadded = await addCart(product._id);
     if(Itemadded)
     {
      toast.success(`${product.name} added to cart successfully`,{
        position: "bottom-left"
      })
     }else{
      toast.error(`${product.name} not added to cart`,{
        position: "bottom-left"
      })
     }
        
  
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = (products) =>{
    return products.filter((product) => {
      const categoryParam = searchParams.get('category')
      const discountParam = parseInt(searchParams.get('discount'), 10)
      const minPriceParam = parseInt(searchParams.get('minPrice'), 10);
      const maxPriceParam = parseInt(searchParams.get('maxPrice'), 10);
      const searchQueryParams = searchParams.get('search')

      if (searchQueryParams && !product.name.toLowerCase().includes(searchQueryParams.toLowerCase())) {
        return false;
      }
      if (categoryParam && product.category !== categoryParam) {
        return false;
      }
      if (discountParam && product.discount < discountParam) {
        return false;
      }
      if (maxPriceParam && product.finalprice >= maxPriceParam) {
        return false;
      }
      if (minPriceParam && product.finalprice <= minPriceParam) {
        return false;
      }
      return true;
    });
  }

  function renderProductsElements(products)
  {
    // Define the number of safaris to display per page
    const productsPerPage = 28; 

    if (filterProducts(products).length === 0) {
      // Display a message indicating no matching products
      return <p>No products match the selected filters.</p>;
    }

    // If there are no filtered products, display all products
    const filteredProducts = filterProducts(products) ? filterProducts(products) : products;

    
    // Calculate the start and end indexes of the current page's products
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Get the current page's products
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Function to handle page navigation
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);  
    };

    

    return(
    <>
      {/* Products section */}          
      <div className="relative grid lg:grid-cols-4 md:grid-cols-3 xsm:grid-cols-2 items-center bg-white rounded-b-md sm:mx-8 lg:mx-20 space-x-4 ">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="my-4 relative inline-block rounded-lg cursor-pointer hover:scale-105 ease-in-out duration-300 hover:shadow-xl "
          >
            <Link
            to={`product/${product._id}`}
            state={{search: `?${searchParams.toString()}`,cat: searchParams.get('category')}}
            >
              <div className="flex justify-center">
                <img
                  className="rounded-lg w-40 h-40 md:w-60 md:h-60"
                  src={product.image}
                />
                <h1 className="absolute bg-gray-200 rounded-sm text-brightGreen top-1 right-2 font-bold text-md sm:text-sm md:text-md">-{product.discount}%</h1>
              </div>
              <div className="ml-2 mt-4">
                <h1 className="text-lg md:text-lg">{product.name}</h1>
                <h1 className="font-bold text-lg md:text-xl">{product.finalprice.toLocaleString()} UGX</h1>
                <h1 className="text-sm line-through">{product.initialprice.toLocaleString()} UGX</h1>
              </div>
            </Link>            
            <button
              onClick={()=> addToCart(product)}
              className="block p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Page numbers */}
      <div className='flex justify-center mt-4'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-2 text-brightGreen hover:underline focus:outline-none ${
                currentPage === index + 1
                  ? 'bg-brightGreen text-yellow-50 rounded-full'
                  : 'bg-white text-brightGreen border border-brightGreen rounded-full'
              }`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </>
    )
    
  }
    
    return(
        <div className="bg-veryLightGray space-y-4">
          
          {/* Form Filter section */}
          <div>
            <Form className="md:flex md:flex-auto md:justify-between grid grid-cols-2 grid-rows-2 xsm sm:mx-8 lg:mx-16 "
            onSubmit={handleFilterSubmit}
            >
            <select
             name="category"
             className="shadow-xl w-36 md:w-48 rounded-md m-2"
           >
             <option value="">Select Category</option>
             <option value="Phones & Tablets">Phones & Tablets</option>
             <option value="TV'S & Audio">TVs & Audio</option>
             <option value="Appliances">Appliances</option>
             <option value="Fashion">Fashion</option>
             <option value="Home">Home</option>
             <option value="Supermarket">Supermarket</option>
             <option value="Health & Beauty">Health & Beauty</option>
             <option value="Baby Products">Baby Products</option>
             <option value="Gaming">Gaming</option>
             <option value="Computing">Computing</option>
           </select>

           <select
             name="discount"
             className="shadow-xl w-40 lg:w-48 rounded-md m-2"
           >
             <option value="">Select Discount %</option>
             <option value="80">80% or more</option>
             <option value="60">60% or more</option>
             <option value="40">40% or more</option>
             <option value="20">20% or more</option>
             <option value="0">0% or more</option>
           </select>

              <div className="shadow-xl w-40 lg:w-48 rounded-md m-2">
              <span className={'value'}>UGX{values[0].toLocaleString()} - UGX{values[1].toLocaleString()}</span>
                <Slider className='slider w-auto h-0.5 bg-blue-100 mt-4' onChange={setValues} value={values} min={min} max={max} />
              </div>

              <button
                  disabled={isFiltering}
                  className="block p-3 px-6 w-28 sm:w-52 m-2 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
                >                  
                {isFiltering ? 'Filtering...' : 'Filter'}
              </button>
              
            </Form>
          </div>

          <Suspense fallback={<h1>Loading Products...</h1>}>
            <Await resolve={loaderData.products}>{(products) => renderProductsElements(products)}</Await>
          </Suspense>

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