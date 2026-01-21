import api from "./axios.js";

// USER API
export const syncUser = async (userData) => {
    const {data} =await api.post('/users/sync', userData);
    return data;
};

// PRODUCT API
export const getAllProducts = async () => {
    const {data} = await api.get('/products');
    return data;
};

export const getProductById = async (id) => {
    const {data} = await api.get(`/products/${id}`);
    return data;
};

export const myProducts = async () => {
    const {data} = await api.get('/products/my');
    return data;
};

export const createProduct = async (productData) => {
    const {data} = await api.post('/products', productData);
    return data;
};

export const updateProduct = async ({id, ...productData}) => {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
}