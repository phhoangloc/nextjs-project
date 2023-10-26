'use client'
import Loading from '@/app/loading'
import NotFound from '@/app/not-found'
import PageDetail from '@/item/PageDetail'
import EditBLogCard from '@/item/editBlogCard'
import EditBookCard from '@/item/editBookCard'
import { BookType, BlogType } from '@/type/dataType'
import React, { useEffect, useState } from 'react'

type Props = {
    params: { archive: string, slug: string }
}

const Edit = ({ params }: Props) => {

    //data
    const [dataBook, setDataBook] = useState<BookType>()
    const [dataBlog, setDataBlog] = useState<BlogType>()
    const [loading, setLoading] = useState<boolean>(true)
    const [err, setErr] = useState<string | undefined>()
    const [img, setImg] = useState<string | undefined>()
    const [change, setChange] = useState<number>(0)

    //getData
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
    //useEffect
    useEffect(() => {
        params.archive === "book" && getBook(params.slug)
        params.archive === "blog" && getBlog(params.slug)
    }, [params.slug, params.archive, change])

    if (err) {
        return <NotFound error={err.toString()} />
    }
    if (loading) {
        return <Loading />
    }

    switch (params.archive) {
        case "book":
            return <PageDetail
                name={dataBook && dataBook.name || "New Book"}
                img={img && img || dataBook && dataBook.img || '/img/avata/avatar.png'}
                author={dataBook && dataBook.author}
                component={<EditBookCard data={dataBook} preAvata={(imgPre) => setImg(imgPre)} editfun={() => setChange(change + 1)} />}
            />
        case "blog":
            return <PageDetail
                name={dataBlog && dataBlog.title}
                img={dataBlog && dataBlog.cover || '/img/avata/avatar.png'}
                component={<EditBLogCard data={dataBlog} preAvata={(imgPre) => setImg(imgPre)} editfun={() => setChange(change + 1)} />}
            />
        default:
            return <NotFound />
    }
}

export default Edit