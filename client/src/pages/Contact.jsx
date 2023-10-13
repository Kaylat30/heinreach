import service from "../imgs/Service-Delivery.png"
import { Form } from "react-router-dom"
import { IoCall, IoLocation, IoMailSharp } from "react-icons/io5";
export default function Contact()
{
    return(
        <div className="bg-veryLightGray space-y-4">
            <section className="bg-white rounded-lg xsm:mx-6 lg:mx-20 space-y-10">
            <p>
                HeinReach is looking forward to assisting you in any query you may have about your shopping, Payment, order or Delivery, Returns, and Refunds.
                Please do not hesitate to contact us during our working times.
            </p>

            <div className="flex items-center justify-evenly flex-wrap">
                <img className="w-96" src={service}/>
                <div className="space-y-5">
                    <h1 className="text-3xl font-bold">Want to talk with someone?  </h1>
                    <h5>Get help by emailing us during our working hours</h5>
                </div>
            </div>
            </section>

            {/* form section */}
            <div className='space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
                <Form className='flex flex-col items-center space-y-7 '>
                    <input type='text' placeholder='Your name' className='bg-gray-100 md:w-96 md:p-4  xsm:p-2 xsm:w-72 rounded-lg' />
                    <input type='email' placeholder='Email Address' className='bg-gray-100 md:w-96  md:p-4  xsm:p-2 xsm:w-72 rounded-lg' />
                    <input type='tel' placeholder='Phone Number' className='bg-gray-100 md:w-96  md:p-4  xsm:p-2 xsm:w-72 rounded-lg' />
                    <input type='text' placeholder='Subject' className='bg-gray-100 md:w-96  md:p-4  xsm:p-2 xsm:w-72 rounded-lg' />
                    <textarea rows={4} cols={50} placeholder='Write message here...' className='bg-gray-100 md:w-96  md:p-4  xsm:p-2 xsm:w-72 rounded-lg'></textarea>
                    <button
                        type='submit'
                        className="md:p-6 xsm:p-3 xsm:px-5 md:px-9 font-bold text-white bg-brightGreen rounded-xl baseline hover:shadow-2xl"
                    >
                        SEND A MESSAGE
                    </button>

                </Form>

            </div>

            <section className='flex flex-col justify-between  lg:flex-row m-10 '>
                <div className='flex justify-around items-center lg:w-72  h-40 rounded-lg border border-solid mb-3 '> 
                    <div to="/" className="text-brightGreen text-3xl">
                        <IoLocation />
                    </div>
                    <div>
                        <h1 className='font-bold text-xl'>Address</h1>
                        <h5>Uganda Plot 10 Tif Towers</h5>
                    </div>
                </div> 
                <div className='flex justify-around items-center lg:w-72  h-40 rounded-lg border border-solid mb-3'> 
                    <div to="/" className="text-brightGreen text-3xl">
                        <IoCall />
                    </div>
                    <div>
                        <h1 className='font-bold text-xl'>Phone</h1>
                        <h5>+256 400 444 987 </h5>
                        <h5>+256 456 678 809</h5>
                    </div>
                </div>
                <div className='flex justify-around items-center lg:w-72  h-40 rounded-lg border border-solid mb-3'> 
                    <div to="/" className="text-brightGreen text-3xl">
                        <IoMailSharp />
                    </div>
                    <div>
                        <h1 className='font-bold text-xl'>Email</h1>
                        <h5>info@heinreach.com</h5>
                    </div>
                </div>                
            </section>

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