import { Form, Link} from "react-router-dom"
import { useState } from "react";

export default function Signup()
{
    const [showPassword, setShowPassword] = useState(false);

      const handleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle the showPassword state
      };
    return (
        <>
            {/* form section */}
            <div className='flex items-center flex-col my-10 space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
                <h1 className="font-bold text-xl">Sign Up</h1>
                <Form className='flex flex-col items-center space-y-7 shadow-md p-10' replace method="post">
                    <input type='email' placeholder='Email' name="email" className='border md:w-96 md:p-4  xsm:p-2 xsm:w-72 rounded-lg' />
                    <input type={showPassword ? "text" : "password"} name="password" placeholder='Password' className='border md:w-96  md:p-4  xsm:p-2 xsm:w-72 rounded-lg' />
                    <label className="cursor-pointer">
                    <input  type="checkbox" className="form-checkbox h-5 w-5" checked={showPassword} onChange={handleShowPassword} />Show Password</label>
                    <button
                        type='submit'
                        className="md:p-4 xsm:p-2 xsm:px-4 md:px-9 font-bold text-white bg-brightGreen rounded-md baseline hover:shadow-2xl"
                    >
                    SIGN UP
                    </button>

                </Form>
                <div>Do not have an account? <Link className="text-brightGreen" to='/login'>Sign in</Link></div>

            </div>
        </>
    )
}
    
  