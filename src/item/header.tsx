'use client'
import React from 'react'
import './style.css'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@/component/Icon';
import { useContext, useState } from 'react';
import { ThemeContext } from '@/context/themeContext';
import { UserContext } from '@/context/UserContent';
import Menu from './menu';
import Link from 'next/link';

type Props = {}

const Header = (props: Props) => {
    const { theme, toggleTheme }: any = useContext(ThemeContext)
    const { id, infor }: any = useContext(UserContext)
    console.log(infor)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("menu")

    return (
        <div className={`header ${theme === "light" ? "light" : "dark"}`}>
            <div className="headerBox">
                <div className="pagetitle">
                    <Link href="/"><h1><span>Lockheart And</span><br></br>Coffee</h1></Link>
                </div>
                <Menu menuOpen={menuOpen} value={value} func={() => { setMenuOpen(false); window.innerWidth > 768 && setValue("menu") }} />
                <div className="icons">
                    <div className="icon">
                        <Icon data={[{ icon: <DarkModeIcon /> }, { icon: <LightModeIcon /> }]} func={() => toggleTheme()} />
                    </div>
                    <div className="icon">
                        <Icon data={[{ icon: <PersonIcon /> }]} func={() => {
                            setValue("account")
                            menuOpen && value === "account" ? (setMenuOpen(!menuOpen), window.innerWidth > 768 && setValue("menu")) : setMenuOpen(true)
                        }} />
                    </div>
                    <div className="icon">
                        <Icon data={[{ icon: <MenuIcon /> }]} func={() => {
                            setValue("menu")
                            menuOpen && value === "menu" ? setMenuOpen(!menuOpen) : setMenuOpen(true)
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header