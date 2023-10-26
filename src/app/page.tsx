'use client'
import { useState, useEffect } from 'react'
import Loading from "./loading"
import Paralax from "@/item/paralax"
import { BookType } from '@/type/dataType'
import { BlogType } from '@/type/dataType'
export default function Home() {


  const [book, setBook] = useState<BookType[]>([])
  const [blog, setBlog] = useState<BlogType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getBook = () => {
    setLoading(true)

    fetch(process.env.HOMEPAGE_URL + 'api/book')
      .then((res) => res.json())
      .then((data) => {
        setBook(data.data)
        setLoading(false)
      })
  }
  const getBlog = () => {
    setLoading(true)

    fetch(process.env.HOMEPAGE_URL + 'http://localhost:3000/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getBook();
    getBlog()
  }, [])

  //return component
  const reCom =
    loading ?
      <Loading /> :
      <div className='main'>
        <Paralax data={[...book, ...blog].sort(function (a: any, b: any) {
          const dateA = new Date(a.createDate);
          const dateB = new Date(b.createDate);
          return dateA > dateB ? -1 : -1;
        })} />
      </div>

  return reCom
}
