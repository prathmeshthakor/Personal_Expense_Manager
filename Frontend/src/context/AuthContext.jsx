import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvoider = ({ childern }) => {
    const [ token, setToken] = useState(localStorage.getItem("token"))

    const login = (token) => {
        localStorage.setItem("token", token)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout}}>{childern}</AuthContext.Provider>
    )
}