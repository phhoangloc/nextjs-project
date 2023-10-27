'use client'
import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import PageDetail from '@/item/PageDetail'

import EditInforCard from '@/item/editInforCard'
import Dividers from '@/component/Dividers'
const Profile = () => {

    const { id, username, infor }: any = useContext(UserContext)
    const [avata, setAvata] = useState<any>("")

    const [books, setbooks] = useState<any[]>([])
    const [blogs, setblogs] = useState<any[]>([])

    useEffect(() => {
        const getBooks = () => {
            fetch("/api/auth/book", {
                headers: {
                    "Authorization": localStorage.token,
                    "Content-Type": "application/json"
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setbooks(data.data)
                })
        }
        const getBlogs = () => {
            fetch("/api/auth/blog", {
                headers: {
                    "Authorization": localStorage.token,
                    "Content-Type": "application/json"
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setblogs(data.data)
                })
        }
        getBooks()
        getBlogs()
    }, [])

    const deviderBooks = books && books.length && books.map((item: any, index: any) => { return { name: item.name, url: "book/edit/" + item.slug } })
    const deviderBlogs = blogs && blogs.length && blogs.map((item: any, index: any) => { return { name: item.title, url: "blog/edit/" + item.slug } })
    const reCom =
        id ?
            <PageDetail
                name={username}
                img={avata ? avata : infor.avata ? infor.avata : "/img/avata/avatar.jpg"}
                component={
                    <div className='contents'>
                        <div className='content'>
                            <EditInforCard data={infor} preAvata={(data) => setAvata(data)} />
                        </div>
                        <div className='content'>
                            <h3>Edit Book</h3>
                            <Dividers data={[{ name: "Create A Book", url: "book/edit/slug" }]} />
                            <Dividers data={deviderBooks || []} />
                        </div>
                        <div className='content'>
                            <h3>Edit Blogs</h3>
                            <Dividers data={[{ name: "Create A Blog", url: "blog/edit/slug" }]} />
                            <Dividers data={deviderBlogs || []} />
                        </div>
                    </div>
                }
            /> :
            <div className='main center'>
                <h1>Profile</h1>
                <h2>you are not login</h2>
            </div>
    return reCom
}

export default Profile