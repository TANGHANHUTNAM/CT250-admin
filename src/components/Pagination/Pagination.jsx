import React  from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const Pagination = () => {
    return (
        <div className='flex justify-center mt-8'>
                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Previous</span>
                        <GrFormPreviousLink aria-hidden="true" className="h-5 w-5" />
                    </a>
                    <a
                        href="#"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-violet-700 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        1
                    </a>
                    <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        2
                    </a>
                    <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                        3
                    </a>
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <span className="sr-only">Next</span>
                        <GrFormNextLink aria-hidden="true" className="h-5 w-5" />
                    </a>
                </nav>
            </div>
    )
}

export default Pagination;