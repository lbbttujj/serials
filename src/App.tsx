// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {SerialCard} from "./components/SerialCard";
import {useAppDispatch, useAppSelector} from './hooks'
import {fetchSerials} from "./store/serialsSlice";
import {AddSerialDialog} from './components/AddSerialDialog'
import {ToolBar} from "./components/ToolBar";
import {ReactComponent as ArrowLeft} from "./assets/arrow-left.svg";
import {ReactComponent as ArrowRight} from "./assets/arrow-right.svg";

import './App.css';

function App() {

    const serials = useAppSelector((state) => state.serials.visibleSerial)
    const isLoading = useAppSelector((state) => state.serials.status)
    const dispatch = useAppDispatch()

    const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchSerials())
    }, [])


    return (
        <div>
        {isOpenAddDialog && <AddSerialDialog closeDialog={setIsOpenAddDialog}/>}
            {/*{serials.length > 4 && (*/}
            {/*    <div className='absolute left-10 top-64 hover: cursor-pointer' >*/}
            {/*     <ArrowLeft/>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{serials.length > 4 && (*/}
            {/*    <div className='absolute right-10 top-64 hover: cursor-pointer' >*/}
            {/*     <ArrowRight/>*/}
            {/*    </div>*/}
            {/*)}*/}
        <div className="p-8">
            {isLoading === 'pending' ? (
                <div style={{width: 'calc( 100vw - 150px)' , position:'relative', top:'10rem', display:'flex', justifyContent:'center'}}>
            <div id="loader">
                <div></div>
                <div></div>
            </div>
                </div>
            ) : (
                <>

                <ToolBar setIsOpenAddDialog={setIsOpenAddDialog}/>
                <div className='flex justify-center flex-wrap space-x-8'>
                {
                    serials && serials.map((serial) => {
                        return (
                            <SerialCard
                                id={serial._id}
                                title={serial.title}
                                description={serial.description}
                                years={serial.years}
                                isFinished={serial.isFinished}
                                rating={serial.rating}
                                country={serial.country}
                                series={serial.series}
                                image={serial.image}
                                />
                        )
                    })
                }
                </div>
                </>
                )}
            </div>
        </div>
  );
}

export default App;
