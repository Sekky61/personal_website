import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// options here: https://github.com/react-syntax-highlighter/react-syntax-highlighter
export default function CodeSample(p: any) {
    const [showCheck, setShowCheck] = useState(false);

    const copyClicked = () => {
        navigator.clipboard.writeText(code);
        setShowCheck(true);
    }

    const mouseLeave = () => {
        setShowCheck(false);
    }

    const code = p.value.code.code;
    const lang = p.value.code.language;
    const fileName = p.value.fileName;
    return (
        <div className='relative'>
            <button className={'absolute top-0 right-0 duration-100 bg-slate-400 hover:bg-white rounded-sm m-2 p-0.5 ' + (showCheck ? 'hover:bg-green-400' : '')}
                onClick={copyClicked} onMouseLeave={mouseLeave}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path className={showCheck ? 'check-path' : 'clipboard-path'} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <SyntaxHighlighter language={lang} style={a11yDark} showLineNumbers>
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

