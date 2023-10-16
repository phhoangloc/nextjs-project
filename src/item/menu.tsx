'use client'
import Dividers from '@/component/Dividers'
import React from 'react'
import { useContext, useState } from 'react';
import { ThemeContext } from '@/context/themeContext';
type Props = {
    menuOpen: boolean;
    value: string;
    func?: () => void
}

const data = [
    { name: "About", url: "/about" },
    { name: "Book", url: "/book" },
    { name: "Blog", url: "/blog" },
    { name: "Contact", url: "/contact" },
]
const dataAccount = [
    { name: "Log In", url: "/log/login" },
    { name: "Sign Up", url: "/log/signup" },
]

const Menu = ({ menuOpen, value, func }: Props) => {
    const { theme }: any = useContext(ThemeContext)
    return (
        <div className={`menu ${!menuOpen && "menuClose"} ${theme === "light" ? "light" : "dark"}`}>
            <Dividers data={value === "menu" ? data : dataAccount} func={() => func && func()} />
        </div>
    )
}

export default Menu