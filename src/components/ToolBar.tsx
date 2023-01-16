//@ts-nocheck
import React, {useState} from 'react'
import {setVisibleSerials} from "../store/serialsSlice";
import {useAppDispatch, useAppSelector} from "../hooks";

type ToolBarProps = {
    setIsOpenAddDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToolBar: React.FC<ToolBarProps> = ({setIsOpenAddDialog}) => {
    const dispatch = useAppDispatch()
    const serials = useAppSelector(state => state.serials.serials)


    const debounce = (func, time = 500) => {
        let timeout
        return function (){
            const fnCall = () => func.apply(this, arguments)
            clearTimeout(timeout)
           timeout = setTimeout(fnCall, time)
        }
    }
    function filter(e) {
        debugger
        const payload = e.target.value
        const newVisibleSerials = serials.filter((item) => {
            let sum = ''
            Object.entries(item).forEach(([key, value]) => {
                if(key !== 'image') {
                    return  sum += value+''
                }
            })
            return sum.toLowerCase().includes(payload)
        })
        debugger
        dispatch(setVisibleSerials(newVisibleSerials))
    }

    filter = debounce(filter, 500)

    return (
        <div className='w-full flex justify-center mb-5'>
            <input onChange={filter} className='w-4/12 ml-32 border-2 border-solid py-2 px-2 border-black/70 focus:border-indigo-800  rounded-xl mr-4'/>
            <button className='px-4 py-2 border-2 rounded-xl border-solid border-indigo-800 text-indigo-800 hover:text-white hover:bg-indigo-800' onClick={() => setIsOpenAddDialog(true)}>Добавить сериал</button>
        </div>
    )
}