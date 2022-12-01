import { useEffect, useRef, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';
//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
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

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
    const oldTitle = useRef(document.title).current;

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle;
            }
        };
    }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件挂载状态，如果还挂载或者已经卸载，返回false 反之返回true
 */

export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });
    return mountedRef;
};
