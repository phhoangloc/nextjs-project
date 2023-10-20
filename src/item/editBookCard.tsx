'use client'
import Button from '@/component/Button'
import Dividers from '@/component/Dividers'
import Input from '@/component/Input'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import EditIcon from '@mui/icons-material/Edit';
import ButtonUpload from '@/component/ButtonUpload'
import { UserContext } from '@/context/UserContext'
import { BookType } from '@/type/dataType'
import TextArea from '@/component/TextArea'
type Props = {
    data: BookType | undefined
    preAvata?: (e: any) => void
}

const EditBookCard = ({ data, preAvata }: Props) => {

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

    useEffect(() => {
        preAvata && preAvata(avataPre)
    }, [preAvata, avataPre])

    return (
        <div className="formcard editcard">
            <h3>Edit Book</h3>
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
            <Button name="update" onClick={() => console.log("hello")} />
        </div>
    )
}

export default EditBookCard