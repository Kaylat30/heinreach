import iphone from "../imgs/Apple_Iphone_14.png" ;
import slide_img1 from '../imgs/slide_img1.jpg'; 
import slide_img2 from '../imgs/slide_img2.jpg'; 
import slide_img3 from '../imgs/slide_img3.jpg'; 
import slide_img4 from "../imgs/slide_img4.jpg" 
import { Form, Link } from "react-router-dom";
export default function Shop()
{
  const imagescroll = [
    {
      image: slide_img1, 
      category: "Gaming",
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
    
    return(
        <div className="bg-veryLightGray space-y-4">
          {/* grid lg:grid-cols-4 grid-cols-2 */}
          <div>
            <Form className="md:flex md:flex-auto md:justify-between grid grid-cols-2 grid-rows-2 xsm sm:mx-8 lg:mx-16 ">
              <select name="category" className="shadow-xl w-36 md:w-48 rounded-md m-2">
                <option value="">Select Category</option>
                <option value="Gaming">Gaming</option>
                <option value="Supermarket">Supermarket</option>
                <option value="Phones">Phones</option>
                <option value="Clothes">Clothes</option>
                <option value="Shoes">Shoes</option>
              </select>              

              <select name="category" className="shadow-xl w-40 lg:w-48 rounded-md m-2">
                <option value="">Select Discount %</option>
                <option value="Gaming">80% or more</option>
                <option value="Supermarket">60% or more</option>
                <option value="Phones">40% or more</option>
                <option value="Clothes">20% or more</option>
              </select>

              <select name="category" className="shadow-xl w-40 lg:w-48 rounded-md m-2">
                <option value="">Select Discount %</option>
                <option value="Gaming">80% or more</option>
                <option value="Supermarket">60% or more</option>
                <option value="Phones">40% or more</option>
                <option value="Clothes">20% or more</option>
              </select>

              <button
                  to="login"
                  className="block p-3 px-6 w-28 sm:w-52 m-2 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
                >
                  Filter
                </button>
            </Form>
          </div>
          
          {/* Products section */}          
          <div className="relative grid lg:grid-cols-4 md:grid-cols-3 xsm:grid-cols-2 items-center bg-white rounded-b-md sm:mx-8 lg:mx-20 space-x-4 ">
            {imagescroll.map((image, index) => (
              <Link
                key={index}
                to={`product/${index}`}
                className="my-4 relative inline-block rounded-lg cursor-pointer hover:scale-105 ease-in-out duration-300 hover:shadow-xl "
              >
                <div className="flex justify-center">
                  <img
                    className="rounded-lg w-40 h-40 md:w-60 md:h-60"
                    src={iphone}
                  />
                  <h1 className="absolute bg-gray-200 rounded-sm text-brightGreen top-1 right-2 font-bold text-md sm:text-sm md:text-md">-23%</h1>
                </div>
                <div className="ml-2 mt-4">
                  <h1 className="text-lg md:text-lg">{image.name}</h1>
                  <h1 className="font-bold text-lg md:text-xl">{image.price} UGX</h1>
                  <h1 className="text-sm line-through">{image.price} UGX</h1>
                </div>
                <button
                  to="login"
                  className="block p-3 px-6 w-full md:mt-4 text-white font-bold bg-brightGreen rounded-lg baseline hover:bg-brightGreenLight"
                >
                  Add to Cart
                </button>
              </Link>
            ))}
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