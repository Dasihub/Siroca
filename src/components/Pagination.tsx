import React from "react";

interface IProps {
    countriesPerPage: number
    lengthOrder: number
}

const Pagination: React.FC<IProps> = ({countriesPerPage, lengthOrder}) => {
    const pageNumbers: number[] = []

    for (let i: number = 1; i < Math.ceil(lengthOrder / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <div>
                <ul className='pagination'>
                    {
                        pageNumbers.map(item => (
                            <li key={item} className='page-item'>
                                <a
                                    href="#"
                                    className='page-link'
                                >
                                    {item}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Pagination