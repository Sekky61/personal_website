import Link from "next/link"
import { NextPage } from "next/types"

const Header: NextPage = () => {
    return (
        <div className="sticky top-0 w-full border-b-2 divide-slate-500">
            <div className="max-w-5xl mx-auto py-3 px-6">
                <div className="flex gap-3 items-center">
                    <Link href="/">
                        <a>
                            <h2>Michal Majer</h2>
                        </a>
                    </Link>
                    <Link href="/about">
                        About me
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header