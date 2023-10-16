'use client'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import './style.css'
type Props = {
    type?: string
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    checkicon?: React.ReactNode,
    closefunc: () => void,
    checkfunc: () => void
}


const Input = ({ type, name, value, onChange, checkicon, closefunc, checkfunc }: Props) => {
    const [focus, setFocus] = useState<boolean>(false)
    const [check, setCheck] = useState<boolean>(false)
    return (
        <div className={`input ${focus ? "inputFocus" : ""} ${value ? "inputFocus inputBlur" : ""}`}>
            <p>{name}</p>
            <div className="inputBox">
                <input
                    type={`${type ? type : "text"}`}
                    value={value}
                    onChange={(e) => onChange(e)}
                    onFocus={() => { setFocus(true), setCheck(false) }}
                    onBlur={() => setFocus(false)}>
                </input>
                <div className="closeicon" onClick={() => closefunc()}>
                    <CloseIcon />
                </div>
                <div className={`checkicon ${check ? "none" : ""}`} onClick={() => { setCheck(true), checkfunc() }}>
                    {checkicon ? checkicon : <CheckIcon />}
                </div>
            </div>
        </div>
    )
}

export default Input