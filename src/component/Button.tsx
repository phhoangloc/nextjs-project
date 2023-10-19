import React from 'react'
import './style.css'
import { ButtonType } from '@/type/componentType'

const Button = ({ name, onClick }: ButtonType) => {
    return (
        <div className='button'>
            <button onClick={() => onClick()}>{name}</button>
        </div>
    )
}

export default Button