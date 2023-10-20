'use client'
import React, { useContext, useRef, useState } from 'react'
import BookCard from './bookCard'
import { ThemeContext } from '@/context/themeContext'
import './style.css'
import { BookType } from '@/type/dataType'
import { BlogType } from '@/type/dataType'
type ParalaxType = {
    data: (BookType | BlogType)[]
}


const Paralax = ({ data }: ParalaxType) => {
    const { theme }: any = useContext(ThemeContext)

    const mainRef: React.MutableRefObject<any> = useRef({ scrollTop: 0, scrollLeft: 0 })
    const parallaxLoad = () => {
        mainRef.current.scrollLeft = 0
        mainRef.current.scrollTop = 0
        setScrollStartX(mainRef.current.scrollLeft);
        setScrollStartY(mainRef.current.scrollTop);
    };
    const [mouseDown, setMouseDown] = useState<boolean>(false)
    const [scrollStartX, setScrollStartX] = useState<number>(0)
    const [scrollStartY, setScrollStartY] = useState<number>(0)
    type mousePositionType = {
        x: number
        y: number
    }
    const [mousePositionStart, setMousePositionStart] = useState<mousePositionType>({ x: 0, y: 0 })

    const getMousePosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (mouseDown) {
            mainRef.current.scrollLeft = scrollStartX + (mousePositionStart.x - e.clientX) * 0.9
            mainRef.current.scrollTop = scrollStartY + (mousePositionStart.y - e.clientY) * 0.9
        }
    }

    const reCom =
        <div className="parallaxs"
            ref={mainRef}
            onMouseDown={(e) => { setMouseDown(true), setMousePositionStart({ x: e.clientX, y: e.clientY }) }}
            onMouseUp={(e) => {
                setMouseDown(false);
                setScrollStartX(mainRef.current.scrollLeft);
                setScrollStartY(mainRef.current.scrollTop);
            }}
            onMouseMove={(e) => getMousePosition(e)}
            onLoad={() => parallaxLoad()}
        >
            {data.length ?
                <div className={`parallax ${theme === "light" ? "lightBackground" : "darkBackground"}`}>
                    {data.map((item: any, index: any) =>
                        <div className="item" key={index}>
                            {item.genre === "book" ? <BookCard name={item.name} img={item.img} genre={item.genre} slug={`book/${item.slug}`} pdf='' author='' owner='' detail='' /> : null}
                            {item.genre === "blog" ? <BookCard name={item.title} img={item.cover} genre={item.genre} slug={`blog/${item.slug}`} pdf='' author='' owner='' detail='' /> : null}
                        </div>
                    )}
                </div> :
                <div className='parallax'><h1>dont see any book</h1></div>}
        </div>

    return reCom
}

export default Paralax