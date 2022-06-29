import React from "react";

interface IProps {
    countriesPerPage: number
    lengthOrder: number
    currentPage: number
    setCurrentPage: (pre: (pre: number) => number) => void
}

const Pagination: React.FC<IProps> = ({countriesPerPage, lengthOrder, currentPage, setCurrentPage}) => {
    const pageNumbers: number[] = []

    for (let i: number = 1; i < Math.ceil(lengthOrder / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    const changePagination = (isNextAndPred: string, num: number | null) => {
        if (isNextAndPred === 'next') {
            return setCurrentPage(pre => pageNumbers.length === pre ? pre : pre  + 1)
        }
        if (isNextAndPred == 'prev') {
            return setCurrentPage(pre => pre === 1 ? pre : pre - 1)
        }
        setCurrentPage(pre => num ? num : currentPage)
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <ul className='pagination'>
                    <li className="page-item">
                        <a onClick={changePagination.bind(null, 'prev', null)} className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        pageNumbers.map(item => (
                            <li key={item} className='page-item'>
                                <a
                                    href="#"
                                    className='page-link'
                                    onClick={changePagination.bind(null, '', item)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <a onClick={changePagination.bind(null, 'next', null)} className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Pagination