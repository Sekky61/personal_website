const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="border-t mt-10 py-4 px-4">
            <div className="small-container">
                Michal Majer, {year}
            </div>
        </div>
    )
}

export default Footer