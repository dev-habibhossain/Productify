import api from "./axios.js";

export const syncUser = async (userData) => {
    const {data} =await api.post('/users/sync', userData);
    return data;
};