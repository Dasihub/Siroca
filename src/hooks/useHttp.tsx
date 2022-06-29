import React from 'react'
import {useMessage} from "./useMessage";

const basesUrl = 'http://localhost:5000'

export const useHttp = () => {
    const [loader, setLoader] = React.useState<boolean>(false)
    const message = useMessage()

    const request = React.useCallback(async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body: any = null, headers: any = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-type'] = 'application/json'
            }
            setLoader(true)
            const res: Response = await fetch(basesUrl + url, {method, body, headers})
            const data = await res.json()
            setLoader(false)

            return data
        } catch (e) {
            console.log(e)
            message('Ошибка в сервере!', 'error')
        }
    }, [])

    return {request, loader}
}