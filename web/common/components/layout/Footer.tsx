const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="border-t mt-10 py-4 px-4">
            <div className="small-container flex-col">
                <div>Michal Majer, {year}</div>
                <div>
                    <span>
                        Got a problem or feedback? Check out&nbsp;
                    </span>
                    <a target="_blank" href="https://github.com/Sekky61/personal_website/issues" rel="noreferrer noopener" className="link">issues on Github</a>
                </div>
            </div>
        </div>
    )
}

export default Footer