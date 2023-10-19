'use client'
import { useState, useEffect } from 'react'
import Loading from "./loading"
import Paralax from "@/item/paralax"

export default function Home() {


  const [book, setBook] = useState<any[]>([])
  const [blog, setBlog] = useState<any[]>([])
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
    getBook();
    getBlog()
  }, [])

  //return component
  const reCom =
    loading ?
      <Loading /> :
      <div className='main'>
        <Paralax data={[...book, ...blog].sort(function (a, b) {
          const dateA = new Date(a.createDay);
          const dateB = new Date(b.createDay);
          return dateA > dateB ? 1 : -1;
        })} />
      </div>

  return reCom
}
