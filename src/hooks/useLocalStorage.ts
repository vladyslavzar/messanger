import { useState, useEffect } from 'react';

const PREFIX: string = 'messanger-';

const useLocalStorage = (key: string, initialValue?: any): any[] => {
    const prefixedKey: string = PREFIX + key;
    const [value, setValue] = useState((): any => {
        const jsonValue: string | null  = localStorage.getItem(prefixedKey);
        
        if (jsonValue !== null && jsonValue !== "undefined" ) return JSON.parse(jsonValue)

        if (typeof initialValue === 'function'){
            return initialValue();
        } else {
            return initialValue;
        }
    })

    useEffect((): void => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value])

    return [value, setValue]
}


export default useLocalStorage;