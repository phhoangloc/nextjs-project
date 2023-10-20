'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import Paralax from '@/item/paralax'
import NotFound from '../not-found'
import { BookType } from '@/type/dataType'
import { BlogType } from '@/type/dataType'
type Props = {
    params: { archive: string }
}

const Book = ({ params }: Props) => {
    const [book, setBook] = useState<BookType[]>([])
    const [blog, setBlog] = useState<BlogType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const getBook = () => {
        setLoading(true)

        fetch('http://localhost:3000/api/book')
            .then((res) => res.json())
            .then((data) => {
                setBook(data.data)
                setLoading(false)
            })
    }
    const getBlog = () => {
        setLoading(true)

        fetch('http://localhost:3000/api/blog')
            .then((res) => res.json())
            .then((data) => {
                setBlog(data.data)
                setLoading(false)
            })
    }


    useEffect(() => {
        if (params.archive === "book") {
            getBook()
        }
        if (params.archive === "blog") {
            getBlog()
        }
    }, [params, params.archive])

    switch (params.archive) {
        case "book":
            const reComBook =
                loading ?
                    <Loading /> :
                    <div className='main book'>
                        <Paralax data={book} />
                    </div>
            return reComBook
        case "blog":
            const reComBlog =
                loading ?
                    <Loading /> :
                    <div className='main book'>
                        <Paralax data={blog} />
                    </div>
            return reComBlog
        default:
            return <NotFound error='Page Not Found' />
    }


}

export default Book