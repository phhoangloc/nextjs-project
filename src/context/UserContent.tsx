'use client'

import React, { FC } from 'react'
import { createContext, useEffect } from 'react'

export type UserContextType = {
    id: string,
    username: string,
    theme?: string
    infor?: {
        avata: string,
        fullname: string,
        address: string,
        phone: string
    }
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const [id, setId] = React.useState<string>('');
    const [username, setUsername] = React.useState<string>('');
    const [theme, setTheme] = React.useState<string>('light');
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
        await fetch("http://localhost:3000/api/auth/auth", {
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

    useEffect(() => {
        UserFecth()
    }, [localStorage.token])

    return (
        <UserContext.Provider value={{ id, username, theme, infor }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider