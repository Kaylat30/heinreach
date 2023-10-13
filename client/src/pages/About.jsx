import team from "../imgs/Our_Team.jpg"
export default function About()
{
    return(
        <div className="bg-veryLightGray space-y-4">
        
           <section className="bg-white rounded-lg xsm:mx-6 lg:mx-20 space-y-10">
                <div className="space-y-4">
                    <h4 className="font-bold">Company Profile</h4>
                    <p>HeinReach was founded in 2022, 
                    it was original born in Mbarara,Uganda, and that is why we call Mbarara our second Home. HeinReach has independently 
                    created a cross-border e-commerce trading platform and is committed to helping global businesses to develop 
                    B2C services in Uganda through serving the end user customers directly. With the help of Mobile penetration
                    and internet (4G) user growth,  we can serve our customers in Uganda with confidence.
                    </p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold">The HeinReach Team</h4>
                    <p>
                    We work to connect Uganda with Africa by offering them online experience and best customer services.
                    Our Tem is from leading e-commerce industries.
                    </p>
                    <p>
                    HeinReach will always strive to recruit and develop the best talents in Uganda and Africa.
                    </p>
                    <img  src={team}/>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold">HeinReach Advantages</h3>
                    <div>
                    <h4 className="font-bold">1.Affordable Prices</h4>
                    <p>Our products are directly sourced from suppliers in Uganda. This gives us an advantage of 
                        negotiating prices of quality products.
                    </p>
                    </div>
                    <div>
                    <h4 className="font-bold">2.Quality Products</h4>
                    <p>We always choose the suppliers with a capacity of producing high-quality products.
                        We strive to offer the latest fashion and trends in all products we offer.
                    </p>
                    </div>
                    <div>
                    <h4 className="font-bold">3.Customer services</h4>
                    <p>We have set up online and offline customers services team in
                        all countries we operate that offer personalized services to our customers.
                    </p>
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