import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register"
    const data = { name, email, password }
    return axios.post(URL_API, data)
}
const loginApi = (email, password) => {
    const URL_API = "/v1/api/login"
    const data = { email, password }
    return axios.post(URL_API, data)
}
const getUserApi = () => {
    const URL_API = "/v1/api/user"
    return axios.get(URL_API)
}
const delUserApi = (id) => {
    return axios.delete(`/v1/api/user/${id}`);
};


const getTagApiHome = () => {
    const URL_API = "/v1/api/?populate=listSystem"
    return axios.get(URL_API)
}
const updateUserApi = (data) => {
    const URL_API = `/v1/api/user/${data.id}`;
    return axios.put(URL_API, data); // data không cần chứa `id`, nhưng không sao nếu có
};
const getTagApi = () => {
    const URL_API = "/v1/api/tag?populate=listSystem"
    return axios.get(URL_API)
}
const createTagApi = (name, description) => {
    const URL_API = "/v1/api/tag";
    const data = { name, description }
    return axios.post(URL_API, data)
}
const updateTagApi = (data) => {
    const URL_API = `/v1/api/tag/${data.id}`;
    return axios.put(URL_API, data);
};
const delTagApi = (id) => {
    return axios.delete(`/v1/api/tag/${id}`);
};

const getSystemApi = () => {
    const URL_API = "/v1/api/system"
    return axios.get(URL_API)
}
const createSystemApi = (name, description, linkAccess, linkInstruct, managingUnit, contactPoint) => {
    const URL_API = "/v1/api/system";
    const data = { name, description, linkAccess, linkInstruct, managingUnit, contactPoint }
    return axios.post(URL_API, data)
}
const updateSystemApi = (data) => {
    const URL_API = `/v1/api/system/${data.id}`;
    return axios.put(URL_API, data);
};
const delSystemApi = (id) => {
    return axios.delete(`/v1/api/system/${id}`);
};
const getImageSystemApi = async (id) => {
    const URL_API = `/v1/api/system/${id}/image`;
    try {
        const response = await axios({
            method: 'get',
            url: URL_API,
            responseType: 'blob',
        });

        console.log("Response:", response.data); // Blob object
        console.log("Data type", typeof response.data, response.data?.type); // blob, image/jpeg

        // 👉 KHÔNG cần kiểm tra instanceof nữa
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error("Lỗi lấy ảnh cho system", id, error.message);
        return null;
    }
};


export {
    createUserApi,
    loginApi,
    getUserApi,
    getTagApi,
    getSystemApi,
    getTagApiHome,
    delUserApi,
    updateUserApi,
    createTagApi,
    updateTagApi,
    delTagApi,
    createSystemApi,
    updateSystemApi,
    delSystemApi,
    getImageSystemApi
}