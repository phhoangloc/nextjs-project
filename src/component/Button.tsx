import React from 'react'
import './style.css'
type Props = {
    name: string,
    onClick: () => void
}

const Button = ({ name, onClick }: Props) => {
    return (
        <div className='button'>
            <button onClick={() => onClick()}>{name}</button>
        </div>
    )
}

export default Button