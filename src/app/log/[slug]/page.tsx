'use client'
import FormCard from '@/item/formCard'
import PageDetail from '@/item/PageDetail'
import React from 'react'

type Props = {
    params: { slug: string }
}

const Log = ({ params }: Props) => {
    return <PageDetail
        img={'/img/login.jpg'}
        component={
            <FormCard name={params.slug} func={(data) => console.log(data)} />
        } />
}

export default Log