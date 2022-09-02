import Link from "next/link"
import { NextPage } from "next/types"
import Header from "./Header"


export default function Layout({ children }: any) {
    return (
        <>
            <Header></Header>
            <div className="max-w-5xl mx-auto mt-4">
                <main>{children}</main>
            </div>
        </>
    )
}
