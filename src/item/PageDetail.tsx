'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '@/context/themeContext'
import './style.css'
import Image from 'next/image'

export type PageType = {
    img?: string,
    name?: string,
    author?: string,
    detail?: string | TrustedHTML
    component?: React.ReactNode
}

const PageDetail = ({ img, detail, name, author, component }: PageType) => {

    const { theme }: any = useContext(ThemeContext)

    return (
        <div className='main page'>
            <div className={`leftCol ${theme === "light" ? "lightPlus borderlight" : "darkPlus borderdark"}`}>
                <Image src={img ? img : ""} alt='' width={500} height={500} />
            </div>
            <div className={`rightCol`}>
                {(name || author) &&
                    <div className="title">
                        <h1>{name}</h1>
                        <h2>{author}</h2>
                    </div>}
                {detail && <div className="contents" dangerouslySetInnerHTML={{ __html: detail ? detail : "" }} />}

                {component ? <div className="component">{component}</div> : null}
            </div>
        </div>
    )


}

export default PageDetail