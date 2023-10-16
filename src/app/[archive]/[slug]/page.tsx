'use client'
import Loading from '@/app/loading'
import NotFound from '@/app/not-found'
import { BookType } from '@/item/PageDetail'
import PageDetail from '@/item/PageDetail'
import { error } from 'console'
import React, { useEffect, useState } from 'react'

type Props = {
    params: { archive: string, slug: string }
}

const BookDetial = ({ params }: Props) => {
    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [err, setErr] = useState<string | undefined>()

    const getBook = (slug: string) => {
        setLoading(true)
        fetch('http://localhost:3000/api/book?slug=' + slug)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) { setData(data.data[0]) }
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
                if (data.success) { setData(data.data[0]) }
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
    }, [])
    if (err) {
        return <NotFound error={err.toString()} />
    }
    if (loading) {
        return <Loading />
    }
    switch (params.archive) {
        case "book":
            return <PageDetail
                name={data.name}
                img={'/img/bookcover/' + data.img}
                author={data.author}
                detail={data.detail}
            />
        case "blog":
            return <PageDetail
                name={data.title}
                img={'/img/blog/' + data.cover}
                detail={data.detail}
            />
        default:
            return <NotFound />
    }

}

export default BookDetial