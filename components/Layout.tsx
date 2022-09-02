import Link from "next/link"
import { NextPage } from "next/types"
import Header from "./Header"


export default function Layout({ children }: any) {
    return (
        <div className="sticky top-0 w-full border-b-2 divide-slate-500">
            <Header></Header>
            <main>{children}</main>
        </div>
    )
}
