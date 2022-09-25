import Link from "next/link"
import { NextPage } from "next/types"
import Footer from "./Footer"
import Header from "./Header"


export default function Layout({ children }: any) {
    return (
        <>
            <Header></Header>
            <div className="container mt-20">
                <main>{children}</main>
            </div>
            <Footer></Footer>
        </>
    )
}
