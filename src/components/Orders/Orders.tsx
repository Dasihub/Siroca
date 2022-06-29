import React from "react";
import {Loader} from "../index";

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
    isPatch: boolean
}

const Orders: React.FC<IProps> = ({orders, loader, isPatch}) => {
    if (loader) {
        return (
            <div style={{minHeight: '600px'}} className="mt-3">
                <Loader/>
            </div>
        )
    }

    return (

        <div style={{minHeight: '600px'}} className="mt-3">
            {
                orders.length ?
                    <>
                        {
                            isPatch && <Loader/>
                        }
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Идент-ный номер</th>
                                <th scope="col">Код</th>
                                <th scope="col">Исследование</th>
                                <th scope="col">Биоматериал</th>
                                <th scope="col">Валюта</th>
                                <th scope="col">Цена</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orders.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.biomaterialName}</td>
                                        <td>{item.currencyName}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </> :
                    <h3 style={{textAlign: 'center'}}>Нет данных</h3>
            }
        </div>
    )
}

export default Orders