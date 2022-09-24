import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { ReactElement, useState } from 'react';

// maxLinks should be odd to look symmetrical, and at least 5
function render_page_numbers(currentPage: number, pagesCount: number, maxLinks: number, pathPrefix: string): ReactElement[] {
    if (pagesCount <= maxLinks) {
        return Array.from({ length: pagesCount }, (_, i) => <PageLink pathPrefix={pathPrefix} key={i + 1} active={currentPage == i + 1} pageNumber={i + 1}></PageLink>)
    } else {
        // Too many pages to show
        const three_dots = (
            <span key="dots" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                ...
            </span>
        );
        if (currentPage <= 3 || currentPage >= pagesCount - 2) {
            // three dots in middle
            const els = [];
            const dotsPosition = Math.floor(maxLinks / 2); // 7 --> 3, 8 --> 4
            for (let i = 1; i <= dotsPosition; i++) {
                const element = (<PageLink pathPrefix={pathPrefix} key={i} active={i == currentPage} pageNumber={i}></PageLink>);
                els.push(element);
            }
            els.push(three_dots);
            for (let i = pagesCount - 2; i <= pagesCount; i++) {
                const element = (<PageLink pathPrefix={pathPrefix} key={i} active={i == currentPage} pageNumber={i}></PageLink>);
                els.push(element);
            }
            return els;
        } else {
            // 1 ... middle however many ... last
            const els = [];
            els.push((<PageLink pathPrefix={pathPrefix} key={1} active={1 == currentPage} pageNumber={1}></PageLink>));
            els.push(three_dots);

            const middleElCount = maxLinks - 4;
            const middleOffset = currentPage - Math.floor(middleElCount / 2); // 
            for (let i = 0; i < middleElCount; i++) {
                const page = middleOffset + i;
                const element = (<PageLink pathPrefix={pathPrefix} key={page} active={page == currentPage} pageNumber={page}></PageLink>);
                els.push(element);
            }

            els.push(three_dots);
            els.push((<PageLink pathPrefix={pathPrefix} key={pagesCount} active={pagesCount == currentPage} pageNumber={pagesCount}></PageLink>));

            return els;
        }
    }
}

function PageLink({ active, pageNumber, pathPrefix }: any) {
    return (
        <Link href={`${pathPrefix}/${pageNumber}`}>
            <a aria-current="page"
                className={"relative inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20 "
                    + (active ? "z-20 bg-primary-50 border-primary-500 text-primary-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50")}>
                {pageNumber}
            </a>
        </Link>
    );
}

// TODO redo arrows, they are still linking to next page, though they may not be clickable
export default function Pagination({ currentPage, perPage, total, pathPrefix }: any) {

    const pageLowRange = (currentPage - 1) * perPage + 1;
    const pageHighRange = Math.min(pageLowRange + perPage - 1, total);

    const pagesCount = Math.ceil(total / perPage);
    const maxLinks = 7;

    const pageLinks = render_page_numbers(currentPage, pagesCount, maxLinks, pathPrefix);

    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < pagesCount;

    const handleClickPrevious = (e: any) => {
        if (!canGoPrevious) {
            e.preventDefault();
        }
    };

    const handleClickNext = (e: any) => {
        if (!canGoNext) {
            e.preventDefault();
        }
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between m-2 sm:hidden">
                <Link href={`${pathPrefix}/${currentPage - 1}`}>
                    <a
                        href="#"
                        className={"rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 " + (canGoPrevious ? "" : "invisible")}
                    >
                        Previous
                    </a>
                </Link>
                <Link href={`${pathPrefix}/${currentPage + 1}`}>
                    <a
                        href="#"
                        className={"rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 " + (canGoNext ? "" : "invisible")}
                    >
                        Next
                    </a>
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{pageLowRange}</span> to <span className="font-medium">{pageHighRange}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link href={`${pathPrefix}/${currentPage - 1}`}>
                            <a
                                className={"relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-20 " + (canGoPrevious ? "hover:bg-gray-50" : "cursor-default")}
                                onClick={handleClickPrevious}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </Link>
                        {pageLinks.map((el) => (el))}
                        <Link href={`${pathPrefix}/${currentPage + 1}`}>
                            <a
                                className={"relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500  focus:z-20 " + (canGoNext ? "hover:bg-gray-50" : "cursor-default")}
                                onClick={handleClickNext}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
