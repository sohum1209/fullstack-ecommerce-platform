const BASE_URL = "http://localhost:8000/api"

const request = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || data.message || "Request failed");
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const loginUser = async (params) => {
    return request(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: params,
    });
};

export const signUpUser = async (params) => {
    return request(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: params,
    });
};

export const sendVerificationEmail = async (params) => {
    return request(`${BASE_URL}/user-verification/send-verification-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: params,
    });
};

export const verifyEmail = async (params) => {
    return request(`${BASE_URL}/user-verification/verify-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: params,
    });
};

export const FetchAllProducts = async () => {
    return request(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const GetProductDetails = async (param) => {
    return request(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
    });
};
