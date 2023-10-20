'use client'
import Loading from '@/app/loading'
import NotFound from '@/app/not-found'
import PageDetail from '@/item/PageDetail'
import EditBookCard from '@/item/editBookCard'
import { BookType, BlogType } from '@/type/dataType'
import React, { useEffect, useState } from 'react'

type Props = {
    params: { archive: string, slug: string }
}

const Edit = ({ params }: Props) => {

    const [dataBook, setDataBook] = useState<BookType>()
    const [dataBlog, setDataBlog] = useState<BlogType>()
    const [loading, setLoading] = useState<boolean>(true)
    const [err, setErr] = useState<string | undefined>()
    const [img, setImg] = useState<string | undefined>()

    const getBook = (slug: string) => {
        setLoading(true)
        fetch('http://localhost:3000/api/book?slug=' + slug)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) { setDataBook(data.data[0]) }
                setLoading(false)
                setErr(undefined)
            }).catch(error => {
                setLoading(false)
                setErr(error)
            })
    }
    const getBlog = (slug: string) => {
        setLoading(true)
        fetch('http://localhost:3000/api/blog?slug=' + slug)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) { setDataBlog(data.data[0]) }
                setLoading(false)
                setErr(undefined)
            }).catch(error => {
                setLoading(false)
                setErr(error)
            })
    }
    useEffect(() => {
        params.archive === "book" && getBook(params.slug)
        params.archive === "blog" && getBlog(params.slug)
    }, [params.slug, params.archive])
    if (err) {
        return <NotFound error={err.toString()} />
    }
    if (loading) {
        return <Loading />
    }

    switch (params.archive) {
        case "book":
            return <PageDetail
                name={dataBook && dataBook.name}
                img={img ? img : dataBook && dataBook.img}
                author={dataBook && dataBook.author}
                component={<EditBookCard data={dataBook} preAvata={(imgPre) => setImg(imgPre)} />}
            />
        case "blog":
            return <PageDetail
                name={dataBlog && dataBlog.title}
                img={dataBlog && '/img/bookcover/' + dataBlog.cover}
            />
        default:
            return <NotFound />
    }
}

export default Edit