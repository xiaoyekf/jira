import { useEffect, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        // @ts-ignore

        const value = result[key];
        if (isFalsy(value)) {
            // @ts-ignore

            delete result[key];
        }
    });
    return result;
};

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
//节流自定义hooks
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);
    return debounceValue;
};

//useArrray

// export const useArray = <T>(initialArray: T[])=>{
//     const [value,setValue] = useState(initialArray)
//     return {
//         value,
//         setValue,
//         add:(item:T)=>setValue([...value,item]),
//         clear:()=>setValue([]),
//         removeIndex: (index: number)=> {
//             const copy = [...value]
//             copy.splice(index,1)
//             setValue(copy)
//         }
//     }
// }
