import { Form, Link,useNavigation,useNavigate,useLoaderData,useActionData } from "react-router-dom"
import { useState,useEffect } from "react";
import { LoginUser } from '../api';
import { toast } from "react-toastify";

export function loader() {
  return new URL(window.location.href).searchParams.get("message")
}


export async function action({request}) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  const pathname = new URL(window.location.href).searchParams.get("redirectTo") || "/";

  try {
    // Attempt to log in the user
    const user = await LoginUser(email, password);
    if (user) {
      toast.success("Logged in successfully", {
        position: "bottom-left",
      });
      return { redirect: pathname };
    } else {
      return { error: "Invalid email or password" };
    }

  } catch (err) {
    return { error: err.message };
  }
}

export default function Login()
{ 
    const actionData= useActionData()
    const message = useLoaderData()
    const navigation = useNavigation() 
    const navigate = useNavigate()

    useEffect(() => {
      if (actionData && actionData.redirect) {
        return navigate(actionData.redirect);
      }
    }, [actionData, navigate]);

    const [showPassword, setShowPassword] = useState(false);
    
      const handleShowPassword = () => {
        setShowPassword(!showPassword); 
      };
    
      return (
        <>
          {/* form section */}
          <div className='flex items-center flex-col my-10 space-y-3 lg:ml-28 lg:mr-28 xsm:ml-7 xsm:mr-7'>
            <h1 className="font-bold text-xl">Login</h1>
            {message && <h3 className="text-red-500 font-bold">{message}</h3>}
            {actionData && actionData.error && <h3 className="text-red-500">{actionData.error}</h3>}
            <Form className='flex flex-col items-center space-y-7 shadow-md p-10' replace method="post">
              <input type='text' placeholder='email' name="email"  className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
              <input type={showPassword ? "text" : "password"} name="password" placeholder='Password' className='border md:w-96 md:p-4 xsm:p-2 xsm:w-72 rounded-lg' />
              <label className="cursor-pointer"><input type="checkbox" className="form-checkbox h-5 w-5" checked={showPassword} onChange={handleShowPassword} /> showPassword</label>
              <button
                disabled={navigation.state === "submitting"}
                type='submit'
                className="md:p-4 xsm:p-2 xsm:px-4 md:px-9 font-bold text-white bg-brightGreen rounded-md baseline hover:shadow-2xl"
              >
                {navigation.state === "submitting"
                    ? "Signing in..."
                    : "SIGN IN"
                }
              </button>
            </Form>
            <div>Do not have an account? <Link className="text-brightGreen" to='/signup'>Sign up</Link></div>
          </div>
        </>
      );
    } 

