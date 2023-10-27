'use client'
import Button from '@/component/Button'
import Input from '@/component/Input'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ButtonUpload from '@/component/ButtonUpload'
import { BlogType } from '@/type/dataType'
import TextArea from '@/component/TextArea'
import DeleteIcon from '@mui/icons-material/Delete';
type Props = {
    data: BlogType | undefined
    preAvata?: (e: any) => void
    editfun?: () => void
}

const EditBLogCard = ({ data, preAvata, editfun }: Props) => {

    const route = useRouter()

    const [edit, setEdit] = useState<boolean>(false)
    const [check, setCheck] = useState<boolean>(false)

    const [title, setTitle] = useState<string>(data ? data.title : "")
    const [slug, setSlug] = useState<string>(data ? data.slug : "")
    const [detail, setDetail] = useState<string>(data ? data.detail : "")
    const [cover, setCover] = useState<string>(data ? data.cover : "")

    const [avataFile, setAvataFile] = useState<any>()
    const [avataPre, setAvataPre] = useState()

    const getFile = async (e: any) => {
        var file = e.target.files[0];
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setAvataPre(reader.result)
            setAvataFile(file)
            setCover(file.name)
        }
    }

    const uploadImage = async (file: File) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            return await fetch('/api/auth/image?pathname=img/blog', {
                method: 'POST',
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    return data
                })
        } else {
            return data?.cover
        }
    }

    const createBlog = async (body: any) => {
        const cover = await uploadImage(avataFile)
        body.cover = cover
        await fetch("/api/auth/blog", {
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

    const updateBlog = async (body: any) => {
        const cover = await uploadImage(avataFile)
        body.cover = cover
        await fetch("/api/auth/blog?id=" + data?._id, {
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

    const deleteBlog = async () => {
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
            <h3>Edit Book <DeleteIcon onClick={() => deleteBlog()} /></h3>
            <Input
                name='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                dis={edit && check}
            />
            <Input
                name='slug'
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
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
                    name='cover'
                    onChange={(e) => setCover(e.target.value)}
                    value={cover}
                    dis={true}
                />
                <ButtonUpload onChange={(e) => getFile(e)} />
            </div>
            <Button name={data ? "update" : "create"} onClick={() => { data ? updateBlog({ title, slug, detail, cover }) : createBlog({ title, slug, detail, cover }) }} />
        </div>
    )
}

export default EditBLogCard