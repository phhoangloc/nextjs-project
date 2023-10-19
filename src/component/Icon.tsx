'use client'
import React, { useState } from 'react'
import "./style.css"
import { IconType } from '@/type/componentType'

const Icon = ({ data, func }: IconType) => {

    const [i, setI] = useState<number>(0)

    return (
        <div onClick={() => { setI(i === data.length - 1 ? 0 : i + 1); func && func() }}>
            {data[i].icon}
        </div>
    )
}

export default Icon