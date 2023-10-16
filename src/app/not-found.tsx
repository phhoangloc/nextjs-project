import Link from 'next/link'
import React from 'react'

type Props = {
    error?: string | undefined
}

const NotFound = ({ error }: Props) => {
    return (
        <div className='main center'>
            <h1>Opp!</h1>
            <h3>{error ? error : "Page Not Found"}</h3>
            <Link href={"/"}><h2>Home</h2></Link>
        </div>
    )
}

export default NotFound
