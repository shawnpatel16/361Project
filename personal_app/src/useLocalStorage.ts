import { useEffect, useState } from "react";

// Takes in generic type, label, and initial value either of type  or a function that returns type 
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        // getting values that are stored
        const jsonValue = localStorage.getItem(key)
        // if value is not in the local storage
        if (jsonValue == null) {
            //returning initialValue with either initial value or function returning initial value
            if (typeof initialValue === "function") {
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })
    //update the stored value whenever it changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])
    
    return [value, setValue] as [T, typeof setValue]
}