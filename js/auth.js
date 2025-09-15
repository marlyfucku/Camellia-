const apiurl = "http://92.255.79.122:9999/api/v1/auth"

async function register(login, email, password){
    try{
        const res = await fetch(`${apiurl}/register`, {
            method: "POST",
            body: JSON.stringify({
                login,
                email,
                password
            })
        })
        if(!res.ok) throw await res.json()

        return await res.json()
    }
    catch(e){
        console.log("error")
    }
}

async function login(login, password){
    const res = await fetch(`${apiurl}/login`, {
        method: "POST",
        body: {
            login,
            password
        }
    })
    return await res.json()
}

export { register, login }
