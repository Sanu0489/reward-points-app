import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/apiConstants";

export const getTransactions = async () => {
    const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS);
    return response.data;
};