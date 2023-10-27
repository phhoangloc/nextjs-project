'use client'
import Button from '@/component/Button'
import Input from '@/component/Input'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ButtonUpload from '@/component/ButtonUpload'
import { BookType } from '@/type/dataType'
import TextArea from '@/component/TextArea'
import DeleteIcon from '@mui/icons-material/Delete';
type Props = {
    data: BookType | undefined
    preAvata?: (e: any) => void
    editfun?: () => void
}

const EditBookCard = ({ data, preAvata, editfun }: Props) => {

    const route = useRouter()

    const [edit, setEdit] = useState<boolean>(false)
    const [check, setCheck] = useState<boolean>(false)

    const [name, setName] = useState<string>(data ? data.name : "")
    const [slug, setSlug] = useState<string>(data ? data.slug : "")
    const [author, setAuthor] = useState<string>(data ? data.author : "")
    const [detail, setDetail] = useState<string>(data ? data.detail : "")
    const [img, setImg] = useState<string>(data ? data.img : "")

    const [avataFile, setAvataFile] = useState<any>()
    const [avataPre, setAvataPre] = useState()

    const getFile = async (e: any) => {
        var file = e.target.files[0];
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setAvataPre(reader.result)
            setAvataFile(file)
            setImg(file.name)
        }
    }

    const uploadImage = async (file: File) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            return await fetch('/api/auth/image?pathname=img/bookcover', {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    return data
                })
        } else {
            return data?.img
        }
    }

    const createBook = async (body: any) => {
        const img = await uploadImage(avataFile)
        body.img = img
        await fetch("/api/auth/book", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.token}`,
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                route.push(slug)
                editfun && editfun()
            })
    }

    const updateBook = async (body: any) => {
        const img = await uploadImage(avataFile)
        body.img = img
        await fetch("/api/auth/book?id=" + data?._id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.token}`,
            },
            method: 'PUT',
            body: JSON.stringify(body)

        })
            .then((res) => res.json())
            .then((data) => {
                route.push(slug)
                editfun && editfun()
            })

    }

    const deleteBook = async () => {
        await fetch("/api/auth/book?id=" + data?._id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.token}`,
            },
            method: 'Delete',
        })
            .then((res) => res.json())
            .then((data) => {
                route.push("../../profile")
            })
    }

    useEffect(() => {
        preAvata && preAvata(avataPre)
    }, [preAvata, avataPre])

    return (
        <div className="formcard editcard">
            <h3>Edit Book <DeleteIcon onClick={() => deleteBook()} /></h3>
            <Input
                name='name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                dis={edit && check}
            />
            <Input
                name='slug'
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
                dis={edit && check}
            />
            <Input
                name='author'
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                dis={edit && check}
            />
            <TextArea
                name='detail'
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
                dis={edit && check}
            />
            <div className="avata">
                <Input
                    name='img'
                    onChange={(e) => setImg(e.target.value)}
                    value={img}
                    dis={true}
                />
                <ButtonUpload onChange={(e) => getFile(e)} />
            </div>
            <Button name={data ? "update" : "create"} onClick={() => { data ? updateBook({ name, slug, author, detail, img }) : createBook({ name, slug, author, detail, img }) }} />
        </div>
    )
}

export default EditBookCard