import Link from "next/link"
import { NextPage } from "next/types"
import ActiveLink from "./ActiveLink"

const Header: NextPage = () => {
    return (
        <div className="sticky top-0 w-full border-b divide-slate-500">
            <div className="max-w-5xl mx-auto py-3 px-6">
                <div className="flex gap-3 items-center">
                    <Link href="/">
                        <a className="mr-4">
                            <h2>Michal Majer</h2>
                        </a>
                    </Link>
                    <div className="flex items-center ml-auto text-sm leading-7">
                        <nav>
                            <ul className="flex space-x-5">
                                <li>
                                    <ActiveLink href="/about">
                                        <a className="navlink">About me</a>
                                    </ActiveLink>
                                </li>
                                <li>
                                    <ActiveLink href="/blog">
                                        <a className="navlink">Blog</a>
                                    </ActiveLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="pl-8 ml-8 border-l">github</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header