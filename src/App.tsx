import React from "react";
import {ToastContainer} from "react-toastify";
import {useMessage} from "./hooks/useMessage";
import {Form, Orders, Pagination} from "./components";
import {useHttp} from "./hooks/useHttp";

interface IOrder {
    researchPriceId: number
    researchId: number
    name: string
    biomaterialName: string
    researchName: null | string
    biomaterialId: null | number
    priceEntityId: number
    price: number
    currencyName: string
    currencyId: number
    code: string
    id: number
}

const App: React.FC = () => {
    const message = useMessage()
    const {request, loader} = useHttp()
    const [order, setOrder] = React.useState<IOrder[]>([])
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const countriesPerPage: number = 5
    const [isPatch, transition] = React.useTransition()

    const [valueInput, setValueInput] = React.useState<string>('')
    const [filterValue, setFilterValue] = React.useState<string>('')
    const [valueSelectFilter, setValueSelectFilter] = React.useState<string>('')
    const [sortSelector, setSortSelector] = React.useState<string>('')

    const getOrder = React.useCallback(async (): Promise<void> => {
        try {
            const data: IOrder[] = await request('/data')
            setOrder(data)
            message('Данные успешно получены!', 'success')
        } catch (e) {
        }
    }, [])

    React.useEffect(() => {
        getOrder()
    }, [])

    const lastCountryIndex = currentPage * countriesPerPage
    const firstCountryIndex = lastCountryIndex - countriesPerPage

    const filter: IOrder[] = React.useMemo((): IOrder[] => {
        return order.filter(item => item.code.toLowerCase().includes(filterValue))
    }, [filterValue, order, currentPage])

    const defaultOrderFilter: IOrder[] = React.useMemo((): IOrder[] => {
        return order.filter(item => item.code.toLowerCase().includes(filterValue))
    }, [filterValue, order, currentPage])

    const currentOrder: IOrder[] = React.useMemo((): IOrder[] => {
        return filter.slice(firstCountryIndex, lastCountryIndex)
    }, [filterValue, order, currentPage])

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValueInput(e.target.value)
        transition(() => {
            setFilterValue(e.target.value)
        })
    }

    const changeSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setValueSelectFilter(e.target.value)
        setSortSelector('')
    }

    const sortingApi = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        try {
            const data = await request(`/data?_sort=${valueSelectFilter}&_order=${e.target.value}`)
            setSortSelector(e.target.value)
            setOrder(data)
        } catch (e) {
        }
    }

    const resetOrder = () => {
        getOrder()
        // setValueSelectFilter('')
        setSortSelector('')
        setValueInput('')
    }

    return (
        <div className='container mt-2'>
            <ToastContainer/>
            <h1>Siroca</h1>
            <Form
                valueInput={valueInput}
                valueSelectFilter={valueSelectFilter}
                sortSelector={sortSelector}
                changeInput={changeInput}
                changeSelectFilter={changeSelectFilter}
                sortingApi={sortingApi}
                resetOrder={resetOrder}
            />
            <Orders
                orders={currentOrder}
                loader={loader}
                isPatch={isPatch}
            />
            {
                filter.length > 5 &&
                <Pagination
                    countriesPerPage={countriesPerPage}
                    lengthOrder={defaultOrderFilter.length}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            }
        </div>
    )
}

export default App