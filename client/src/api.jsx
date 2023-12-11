// const url = "http://localhost:3000"
const url = "https://heinreach-server.vercel.app"

export async function getProducts()
{
    const res = await fetch(`${url}/shop`)
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data   

}

export async function getProductInfo(id)
{
    const res = await fetch(`${url}/product/${id}`)
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
 
}

export async function LoginUser(email,password)
{
    const requestBody = {
        email: email,
        password: password,
    };

    try {
    const res = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: 'include' 
    });

    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data;

    } catch (error) {
    console.error("Login error: " + error.message);
    
    }
}

export async function registerUser(firstname,lastname,email,password)
{
    const requestBody = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };
  
      try {
        const res = await fetch(`${url}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          credentials: 'include' 
        });

        const data = await res.json();

        if (!res.ok) {
            throw {
                message: data.error,
                statusText: res.statusText,
                status: res.status
            }
        }

        const { token, user } = data;

        // Store the token and user data in local storage or state for authentication
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);

        return data;
  
      } catch (error) {
        console.error("Login error: " + error.message);
        
      }
}

export async function logoutUser() {
    try {
      const res = await fetch('https://heinreach-server.vercel.app/logout', {
        method: 'POST',
        credentials: 'include' 
      });
  
      if (!res.ok) {
        throw new Error(`Logout failed with status ${res.status}`);
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
}  

export async function addCart(id)
{

    try {
    const res = await fetch(`${url}/addToCart`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
        credentials: 'include' 
    });

    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }


    return data;

    } catch (error) {
    console.error("Error: " + error.message);
    
    }
}
export async function deleteCart(id)
{

    try {
    const res = await fetch(`${url}/deleteCart`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemId: id }),
        credentials: 'include' 
    });

    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }


    return data;

    } catch (error) {
    console.error("Error: " + error.message);
    
    }
}

export async function getCart()
{
    const res = await fetch(`${url}/cart`, {
        method: "POST",
        credentials: 'include',    
  });
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
 
}

export async function updateCartAmount(newAmount, id) {
    try {
        const res = await fetch(`${url}/updateCartAmount`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id,newAmount:newAmount }),
      credentials: 'include' 
    })

    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.error,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
    } catch (error) {
        console.log(error)
    }
    
}

export async function checkout() {
    try {
        const response = await fetch(`${url}/checkout`, {
            method: 'POST',
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                message: data.error,
                statusText: response.statusText,
                status: response.status,
            };
        }

    } catch (error) {
        console.error('Error during checkout:', error.message);
    }
}