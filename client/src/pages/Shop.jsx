import { Suspense } from "react";
import { getProducts } from "../api";
import { Await, Form, Link, defer, useLoaderData,useSearchParams } from "react-router-dom";
import { useState } from "react";
export function loader()
{
  let loadedproducts = getProducts()
  return defer({products:loadedproducts})
}
export default function Shop()
{

  const [isFiltering, setIsFiltering] = useState(false); 
  const loaderData = useLoaderData()  
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize the current page state
  const [currentPage, setCurrentPage] = useState(1);

  // const min = 1000;
  // const max = 4000;

  const handleFilterSubmit = (event) => {
    try {

        const category = event.target.category.value 
        const discount = event.target.discount.value
        //const maxPrice = values[0]
        //const minPrice = values[1]

      setIsFiltering(true);
      // Build the query parameters based on the selected options
      const queryParameters = {};

      if (category) {
        queryParameters.category = category;
      }
      if (discount) {
        queryParameters.discount = discount.toString();
      }
      // if (maxPrice) {
      //   queryParameters.maxPrice = maxPrice.toString();
      // }
      // if (minPrice) {
      //   queryParameters.minPrice = minPrice.toString();
      // }

      // Update the search parameters in the URL
      setSearchParams(queryParameters);

    } catch (error) {
      console.error('Filtering error:', error);
    }finally {
      setIsFiltering(false);
    }
    
  };

  const clearFilters = () => {
    // Clear the search parameters in the URL
    setSearchParams({});
  };

  const filterProducts = (products) =>{
    return products.filter((product) => {
      const categoryParam = searchParams.get('category') || ""
      const discountParam = parseInt(searchParams.get('discount'), 10) || ""
      const minPriceParam = parseInt(searchParams.get('minPrice'), 10) || "";
      const maxPriceParam = parseInt(searchParams.get('maxPrice'), 10) || "";

      if (categoryParam && product.category !== categoryParam) {
        return false;
      }
      if (discountParam && product.discount < discountParam) {
        return false;
      }
      if (maxPriceParam && product.finalprice > maxPriceParam) {
        return false;
      }
      if (minPriceParam && product.finalprice < minPriceParam) {
        return false;
      }
      return true;
    });
  }

  function renderProductsElements(products)
  {
    // Define the number of safaris to display per page
    const productsPerPage = 3; 

    // If there are no filtered products, display all safaris
    const filteredProducts = filterProducts(products).length === 0 ? products : filterProducts(products);

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
          <Link
            key={product._id}
            to={`product/${product._id}`}
            state={{search: `?${searchParams.toString()}`,cat: searchParams.get('category')}}
            className="my-4 relative inline-block rounded-lg cursor-pointer hover:scale-105 ease-in-out duration-300 hover:shadow-xl "
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
              <h1 className="font-bold text-lg md:text-xl">{product.finalprice} UGX</h1>
              <h1 className="text-sm line-through">{product.initialprice} UGX</h1>
            </div>
            <button
              className="block p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
            >
              Add to Cart
            </button>
          </Link>
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
             <option value="Phones">Phones</option>
             <option value="Fashion">Fashion</option>
             <option value="Drinks">Drinks</option>
             <option value="Clothes">Clothes</option>
             <option value="Home">Home</option>
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

              <select name="category" className="shadow-xl w-40 lg:w-48 rounded-md m-2">
                <option value="">Select Discount %</option>
                <option value="Gaming">80% or more</option>
                <option value="Supermarket">60% or more</option>
                <option value="Phones">40% or more</option>
                <option value="Clothes">20% or more</option>
                <option value="Clothes">0% or more</option>
              </select>

              <button
                  disabled={isFiltering}
                  className="block p-3 px-6 w-28 sm:w-52 m-2 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
                >                  
                {isFiltering ? 'Filtering...' : 'Filter'}
              </button>
              
            </Form>
            {searchParams !== null && Object.keys(searchParams).length > 0 && (
              <button
                className="block p-3 px-6 w-28 sm:w-52 m-2 text-white font-bold bg-gray-500 rounded-lg baseline hover:bg-gray-600"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
              )}
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