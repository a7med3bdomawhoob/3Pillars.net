import { createContext } from "react";
import {useState } from 'react'
export let ContextMedia = createContext([]);

export function ContextMediaProvider(props) {
    let [x, setx] = useState(0)
    return <ContextMedia.Provider >
        {props.children}
    </ContextMedia.Provider>
}



