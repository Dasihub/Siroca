import React from "react";
import './form.scss'

interface IProps {
    valueInput: string
    valueSelectFilter: string
    sortSelector: string
    changeSelectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
    changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    sortingApi: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>
    resetOrder: () => void
}

const Form: React.FC<IProps> = ({changeInput, valueInput, changeSelectFilter, sortingApi, valueSelectFilter, sortSelector, resetOrder}) => {
    return (
        <>
            <div className="container_input">
                <input
                    type="text"
                    className="form-control"
                    value={valueInput}
                    onChange={changeInput}
                    style={{width: '80%'}}
                />
                <button onClick={resetOrder} className='btn btn-primary'>Сброс</button>
            </div>
            <div className="container_select">
                <select defaultValue='' onChange={changeSelectFilter} className="custom-select">
                    <option value='' disabled style={{display: 'none'}}>Фильтр</option>
                    <option value="id">Идент-ный номер</option>
                    <option value="code">Код</option>
                    <option value="name">Исследование</option>
                    <option value="biomaterialName">Биоматериал</option>
                    <option value="currencyName">Валюта</option>
                    <option value="price">Цена</option>
                </select>
                <select
                    className="custom-select"
                    onChange={sortingApi}
                    defaultValue=''
                >
                    <option selected={!sortSelector.length} value='' disabled style={{display: 'none'}}>Сортировка</option>
                    {
                        valueSelectFilter.length &&
                        <>
                            <option value="desc">По возрастание</option>
                            <option value="asc">По убывание</option>
                        </>
                    }
                </select>
            </div>
        </>
    )
}

export default Form