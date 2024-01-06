import { Link } from "react-router-dom"
import { IoLogoFacebook,IoLogoTwitter,IoLogoYoutube,IoLogoPinterest,IoLogoInstagram } from "react-icons/io5";
import image from '../imgs/logo.png';
export default function Footer()
{
    const currentYear = new Date().getFullYear();
    return(
        <>
           
    <footer className="bg-veryDarkBlue">
        
        <div className="container grid lg:flex lg:flex-row-reverse sm:grid-cols-2 grid-cols-1 lg:justify-between px-4 py-10 mx-auto space-y-5 lg:space-y-0">
               
               <div className="flex flex-col justify-center space-y-8">
                    <h3 className="flex flex-col items-center text-white font-bold">Customer Services</h3>                                  
                    <div className="flex flex-col items-center space-y-3 text-white">                    
                        <Link to="/" className="hover:text-brightGreen">Help Center</Link>
                        <Link to="about" className="hover:text-brightGreen">Contact Us</Link>
                        <Link to="team" className="hover:text-brightGreen">Report a case</Link>
                    </div>                   
               </div>

               <div className="flex flex-col justify-center space-y-8">
                    <h3 className="flex flex-col items-center text-white font-bold">About HeinReach</h3>                                  
                    <div className="flex flex-col items-center space-y-3 text-white">                    
                        <Link to="/" className="hover:text-brightGreen">About Us</Link>
                        <Link to="about" className="hover:text-brightGreen">Return & Refund Policy</Link>
                        <Link to="team" className="hover:text-brightGreen">Terms & Conditions</Link>
                    </div>                   
               </div>

               <div className="flex flex-col justify-center space-y-8">
                    <h3 className="flex flex-col items-center text-white font-bold">Sell on HeinReach</h3>                                  
                    <div className="flex flex-col items-center space-y-3 text-white">                    
                        <Link to="/" className="hover:text-brightGreen">Supplier membership</Link>
                        <Link to="about" className="hover:text-brightGreen">Learning center</Link>
                        <Link to="team" className="hover:text-brightGreen">Partner program</Link>
                    </div>                   
               </div>

               <div className="flex flex-col items-center justify-between space-y-2 ">
                               
                <div className="flex items-center">
                    <img src={image} className="h-20" alt=""/>
                    <h1 className="font-bold text-xl text-white">HeinReach</h1>
                </div>                
                {/* social media */}
                <div className="flex justify-center text-2xl space-x-4 text-white">                    
                    <Link to="/"> <IoLogoFacebook/> </Link>                    
                    <Link to="/"> <IoLogoYoutube/> </Link>                    
                    <Link to="/"> <IoLogoTwitter /> </Link>                    
                    <Link to="/"> <IoLogoPinterest /> </Link>                    
                    <Link to="/"> <IoLogoInstagram /> </Link>
                </div>
                <div className=" text-white ">
                    Copyright &copy; {currentYear}, All Rights Reserved 
                </div>                
            </div>
            
        </div>
        <div className="flex text-white justify-center pb-4">Developed by Kayondo Abdulatif</div>
    </footer>
        </>
    )
}