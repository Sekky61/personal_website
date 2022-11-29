import { NextPage } from "next/types"

// todo mobile sizes
const Footer: NextPage = () => {
    const year = new Date().getFullYear();

    return (
        <div className="border-t mt-20 py-4">
            <div className="container">
                Michal Majer, {year}
            </div>
        </div>
    )
}

export default Footer