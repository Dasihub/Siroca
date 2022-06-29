import React from "react";
import {ToastContainer} from "react-toastify";
import {useMessage} from "./hooks/useMessage";
import {Form, Orders, Pagination} from "./components";

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

interface IResData {
    count: number
    size: number
    page: number
    dataObjects: IOrder[]
}

const App: React.FC = () => {
    const message = useMessage()
    const [order, setOrder] = React.useState<IOrder[]>([])
    const [loader, setLoader] = React.useState<boolean>(false)
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const countriesPerPage: number = 5

    const getData = async () => {
        try {
            setLoader(true)
            const res: Response = await fetch('http://localhost:5000/api')
            const data: IResData = await res.json()
            setOrder(data.dataObjects)
            setLoader(false)
            message('Данные успешно получены!', 'success')
        } catch (e) {
            console.log(e)
            message('Ошибка в сервере!', 'error')
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    const lastCountryIndex = currentPage * countriesPerPage
    const firstCountryIndex = lastCountryIndex - countriesPerPage

    const currentOrder = order.slice(firstCountryIndex, lastCountryIndex)

    return (
        <div className='container mt-5'>
            <ToastContainer/>
            <Form/>
            <Orders orders={currentOrder} loader={loader}/>
            <Pagination
                countriesPerPage={countriesPerPage}
                lengthOrder={order.length}
            />
        </div>
    )
}

export default App