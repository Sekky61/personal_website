import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ReactElement } from 'react';

// maxLinks should be odd to look symmetrical, and at least 5
function render_page_numbers(currentPage: number, pagesCount: number, maxLinks: number): ReactElement[] {
    if (pagesCount <= maxLinks) {
        return Array.from({ length: pagesCount }, (_, i) => <PageLink active={currentPage == i + 1} pageNumber={i + 1}></PageLink>)
    } else {
        // Too many pages to show
        const three_dots = (
            <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                ...
            </span>
        );
        if (currentPage <= 3 || currentPage >= pagesCount - 2) {
            // three dots in middle
            const els = [];
            const dotsPosition = Math.floor(maxLinks / 2); // 7 --> 3, 8 --> 4
            for (let i = 1; i <= dotsPosition; i++) {
                const element = (<PageLink active={i == currentPage} pageNumber={i}></PageLink>);
                els.push(element);
            }
            els.push(three_dots);
            for (let i = pagesCount - 2; i <= pagesCount; i++) {
                const element = (<PageLink active={i == currentPage} pageNumber={i}></PageLink>);
                els.push(element);
            }
            return els;
        } else {
            // 1 ... middle however many ... last
            const els = [];
            els.push((<PageLink active={1 == currentPage} pageNumber={1}></PageLink>));
            els.push(three_dots);

            const middleElCount = maxLinks - 4;
            const middleOffset = currentPage - Math.floor(middleElCount / 2); // 
            for (let i = 0; i < middleElCount; i++) {
                const page = middleOffset + i;
                const element = (<PageLink active={page == currentPage} pageNumber={page}></PageLink>);
                els.push(element);
            }

            els.push(three_dots);
            els.push((<PageLink active={pagesCount == currentPage} pageNumber={pagesCount}></PageLink>));

            return els;
        }
    }
}

function PageLink({ active, pageNumber }: any) {
    return (
        <a
            key={pageNumber}
            href="#"
            aria-current="page"
            className={"relative inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20 "
                + (active ? "z-20 bg-primary-50 border-primary-500 text-primary-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50")}
        >
            {pageNumber}
        </a>
    );
}

export default function Pagination({ currentPage, perPage, total }: any) {
    const pageLowRange = (currentPage - 1) * perPage + 1;
    const pageHighRange = pageLowRange + perPage - 1;

    const pagesCount = Math.ceil(total / perPage);
    const maxLinks = 7;

    const pageLinks = render_page_numbers(currentPage, pagesCount, maxLinks);

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
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
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        {pageLinks.map((el) => (el))}
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
