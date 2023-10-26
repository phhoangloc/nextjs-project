import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/context/themeContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BookType } from '@/type/dataType'


const BookCard = ({ img, name, genre, slug }: any) => {

    const router = useRouter()
    const { theme }: any = useContext(ThemeContext)
    const [hover, setHover] = useState<Boolean>(false)

    const effHover = theme === "light" && hover ? "hover_light" : theme === "dark" && hover ? "hover_dark" : ""
    return (
        <div className={`bookCard ${effHover}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => router.push(`${slug}`)}>
            <div className="picture">
                <Image src={img} alt="" width={500} height={500} />
            </div>
            <div className="title">
                <p className='name'>{name}</p>
                <p className='genre'>{genre}</p>
            </div>
        </div>
    )
}

export default BookCard