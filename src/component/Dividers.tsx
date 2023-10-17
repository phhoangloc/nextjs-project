'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
type Props = {
    data: {
        name: string,
        url: string,
        itemfunc?: () => void
    }[],
    func?: () => void
}

const Dividers = ({ data, func }: Props) => {
    const router = useRouter()
    return (
        <div className='dividers'>
            {
                data.map((item, index) =>
                    <div className='divider'
                        key={index}
                        onClick={() => { item.itemfunc && item.itemfunc(); func && func(); router.push(item.url) }}>
                        {item.name}
                    </div>
                )
            }
        </div>
    )
}

export default Dividers

