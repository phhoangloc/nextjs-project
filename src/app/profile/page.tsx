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

    useEffect(() => {
        const getBooks = () => {
            fetch("http://localhost:3000/api/auth/book", {
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
        getBooks()
    }, [])

    const deviderBooks = books.map((item: any, index: any) => { return { name: item.name, url: "book/edit/" + item.slug } })
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
                            <Dividers data={deviderBooks} />
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