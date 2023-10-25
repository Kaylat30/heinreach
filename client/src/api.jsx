export async function getProducts()
{
    const res = await fetch("http://localhost:3000/shop")
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
    const res = await fetch(`http://localhost:3000/product/${id}`)
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
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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

export async function registerUser(firstname,lastname,email,password)
{
    const requestBody = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };
  
      try {
        const res = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
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