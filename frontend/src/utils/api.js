const BASE_URL = "http://localhost:8000/api"

export const loginUser = async(params) => {
    try {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: params
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const signUpUser = async(params) => {
    try {
        const response = await fetch(`${BASE_URL}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: params
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const FetchAllProducts = async() => {
    try{
        const response = await fetch(`${BASE_URL}/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json();
        return data;
    } catch {
        console.log(error);
    }
}

export const GetProductDetails = async(param) => {
    try{
        const response = await fetch(`${BASE_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param)
        })
        const data = await response.json();
        return data;
    } catch {
        console.log(error);
    }
}
