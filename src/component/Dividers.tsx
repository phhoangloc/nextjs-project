'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { DividersType } from '@/type/componentType'

const Dividers = ({ data, func }: DividersType) => {
    const router = useRouter()
    return (
        <div className='dividers'>
            {
                data && data.length ?
                    data.map((item, index) =>
                        <div className='divider'
                            key={index}
                            onClick={() => {
                                item && item.url && router.push(item.url)
                                item && item.itemfunc && item.itemfunc();
                                func && func();
                            }}>
                            <p className='name'>{item.name}</p>
                        </div>
                    )
                    : null
            }
        </div>
    )
}

export default Dividers

