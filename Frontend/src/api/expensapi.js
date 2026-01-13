import api from "./axios"

export const addExpense = (data) => api.post(("/expense/post", data))
export const getExpenses =() => api.get("/expense/get")