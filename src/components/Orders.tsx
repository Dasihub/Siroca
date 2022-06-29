import React from "react";

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

interface IProps {
    orders: IOrder[]
    loader: boolean
}

const Orders: React.FC<IProps> = ({orders, loader}) => {
    if (loader) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    return (
        <table>
            <thead>
            <tr>
                <td>Код</td>
                <td>Исследование</td>
                <td>Биомат</td>
                <td>Тип усл</td>
            </tr>
            </thead>
        </table>
    )
}

export default Orders