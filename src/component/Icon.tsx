'use client'
import React, { useState } from 'react'
import "./style.css"

type Props = {
    data: {
        icon: React.ReactNode,
    }[],
    func?: () => void
}

const Icon = ({ data, func }: Props) => {

    const [i, setI] = useState<number>(0)

    return (
        <div onClick={() => { setI(i === data.length - 1 ? 0 : i + 1); func && func() }}>
            {data[i].icon}
        </div>
    )
}

export default Icon