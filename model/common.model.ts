import { PromiseLikeOfReactNode, ReactNode } from "react"

export interface ICommon {
    loading: boolean,
    popupChat: boolean,
    message: string
}

export interface IMessageProps {
    children: string | number | boolean | JSX.Element | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined
}