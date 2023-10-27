'use client'
import React from 'react'
import { createContext, useEffect } from 'react'

// Truy cập thông tin người dùng từ cookie

export type UserContextType = {
    id: string,
    username: string,
    theme?: string
    i: number
    infor?: {
        avata: string,
        fullname: string,
        address: string,
        phone: string
    }
    UserFecth: () => void
    NoFecth: () => void
    changeI: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [id, setId] = React.useState<string>('');
    const [i, setI] = React.useState<number>(0);
    const [username, setUsername] = React.useState<string>('');
    const [infor, setInfor] = React.useState<{
        avata: string,
        fullname: string,
        address: string,
        phone: string
    }>({
        avata: "",
        fullname: "",
        address: "",
        phone: ""
    })

    const UserFecth = async () => {
        await fetch("/api/auth/auth", {
            headers: {
                'Authorization': `${localStorage.token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setId(result.data._id)
                setUsername(result.data.username)
                setInfor(result.data.infor)
            })
    }
    const NoFecth = async () => {
        await fetch("api/auth/checkuser?username=user", {
            headers: {
                'Authorization': `${localStorage.token}`,
                'Content-Type': 'application/json'
            },
        })
    }


    const changeI = () => {
        setI(i + 1)
    }

    return (
        <UserContext.Provider value={{ i, id, username, infor, UserFecth, changeI, NoFecth, }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider