'use client'
import React, { useEffect } from 'react'
import './style.css'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@/component/Icon';
import { useContext, useState } from 'react';
import { ThemeContext } from '@/context/themeContext';
import { UserContext } from '@/context/UserContext';
import Menu from './menu';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {

    const { theme, toggleTheme }: any = useContext(ThemeContext)
    const { i, id, infor, UserFecth, NoFecth }: any = useContext(UserContext)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("menu")

    useEffect(() => {
        localStorage && localStorage.token ? UserFecth() : NoFecth()
    }, [i])

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
                        <Icon data={
                            id ?
                                infor.avata ?
                                    [{ icon: <Image src={"/img/avata/" + infor.avata} width={50} height={50} alt='' /> }] :
                                    [{ icon: <Image src={"/img/avata/avatar.png"} width={50} height={50} alt='' /> }] :
                                [{ icon: <PersonIcon /> }]
                        }
                            func={() => {
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