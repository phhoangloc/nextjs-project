import React from "react"

export type ButtonType = {
    name: string,
    onClick: () => void
}

export type ButtonUploadType = {
    onChange: (e: any) => void,
    multiple?: boolean
}

export type DividersType = {
    data: {
        name: string,
        url?: string,
        itemfunc?: () => void
    }[],
    func?: () => void
}

export type IconType = {
    data: {
        icon: React.ReactNode,
    }[],
    func?: () => void
}
export type InputType = {
    dis?: boolean,
    type?: string,
    name: React.ReactNode,
    value: string,
    onChange: (e: any) => void,
    warn?: string,
    icon1?: React.ReactNode
    icon2?: React.ReactNode
}