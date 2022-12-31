
export const Contents = ({ headings }: any) => {
    const heading_items = headings.map(({ text, slug }: any) =>
        <li key={slug} className="hover:underline">
            <a href={"#" + slug}>{text}</a>
        </li>
    );

    return (
        <div className='metablock'>
            <div className='metablock-heading'>Contents</div>
            <ul>
                {heading_items}
            </ul>
        </div>
    );
}

export const Footnotes = ({ footnotes }: any) => {
    const footnote_items = footnotes.map(({ text, number }: any) =>
        <li key={number} id={`#footnote-${number}`}>
            {text}
        </li>
    );

    return (
        <div className='metablock'>
            <div className='metablock-heading'>Footnotes</div>
            <ol className='list-inside list-decimal'>
                {footnote_items}
            </ol>
        </div>
    );
}

export const Sources = ({ sources }: any) => {
    // todo workaround for articles without sources
    sources ??= [];

    const source_items = sources.map(({ link, name }: any) =>
        <li key={name}>
            <span className='mr-4'>{name}</span>
            <a target="_blank" rel="noopener noreferrer" href={link} className="hover:underline">{link}</a>
        </li>
    );

    return (
        <div className='metablock'>
            <div className='metablock-heading'>Sources</div>
            <ol className='list-decimal ml-8'>
                {source_items}
            </ol>
        </div>
    );
}