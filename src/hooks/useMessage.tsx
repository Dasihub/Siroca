import React from "react";
import {toast} from "react-toastify";

export const useMessage = () => {
    return (text: string, type: 'error' | 'warn' | 'success' | 'info') => {
        toast[type](text, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}