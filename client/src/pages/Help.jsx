import helpcenter from "../imgs/customer_care.png"
import { IoCartOutline, IoPerson } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { AiOutlineShop } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
export default function Help()
{
    return(
        <div className="bg-veryLightGray space-y-4">
            <section className="bg-white rounded-lg xsm:mx-6 lg:mx-20 space-y-10 flex flex-col items-center justify-center">
                <div className="flex items-center ">
                    <img className="h-10 w-10" src={helpcenter}/>
                    <h1>HELP CENTER</h1>
                </div>
                <h1 className="text-brightGreen font-bold sm:text-3xl text-xl">HeinReach Customer Care</h1>
                <div className="space-y-4">
                    <h1>Hi , how can we help you?</h1>
                    <div className="flex space-x-1">
                        <input type="text" className="flex-1 bg-gray-100 px-4 rounded-md outline-none" placeholder="Describe your issue"/>
                        <div className="p-3 px-6 pt-2 text-white bg-veryDarkBlue rounded-md baseline hover:bg-slate-800 " >
                        SEND</div>
                    </div>
                </div>

                <div className="lg:flex lg:flex-auto grid grid-cols-2 grid-rows-3">
                    <div className="flex items-center justify-between border rounded-md md:p-5 p-2 m-2 cursor-pointer">
                        <span>Order Placement</span>
                        <span className="text-2xl text-brightGreen"><IoCartOutline /></span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md md:p-5 p-2 m-2 cursor-pointer">
                        <span>Payments</span>
                        <span className="text-2xl text-brightGreen"><MdPayment /></span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md md:p-5 p-2 m-2 cursor-pointer">
                        <span>Returns & Refunds</span>
                        <span className="text-2xl text-brightGreen"><GiReturnArrow /></span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md md:p-5 p-2 m-2 cursor-pointer">
                        <span>Products</span>
                        <span className="text-2xl text-brightGreen"><AiOutlineShop /></span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md md:p-5 p-2 m-2 cursor-pointer">
                        <span>Account</span>
                        <span className="text-2xl text-brightGreen"><IoPerson /></span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md md:p-5 p-2 m-2 cursor-pointer">
                        <span>Delivery</span>
                        <span className="text-2xl text-brightGreen"><TbTruckDelivery /></span>
                    </div>
                </div>
            </section>

            {/* newsletter section */}
            <section className=' flex h-48 bg-brightGreen mt-10'>
                <div className="flex text-white flex-col justify-center lg:flex-row mx-auto space-x-4 items-center xsm:space-y-3 ">
                    
                    <div className="pl-4">
                        <p>NEW TO HEINREACH?</p>
                        <p className="md:text-2xl text-lg font-bold">Subscribe to our newsletter to get updates on our latest offers!</p>
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