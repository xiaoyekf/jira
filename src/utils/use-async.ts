import { useCallback, useReducer, useState } from 'react';
import { useMountedRef } from 'utils';

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null,
};
const defaultConfig = {
    throwOnError: false,
};

const useSefaDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef();

    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef]);
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
        ...defaultInitialState,
        ...initialState,
    });
    const sefaDispatch = useSefaDispatch(dispatch);
    const [retry, setRetry] = useState(() => () => {});
    const setData = useCallback(
        (data: D) =>
            sefaDispatch({
                data,
                stat: 'success',
                error: null,
            }),
        [sefaDispatch],
    );
    const SetError = useCallback(
        (error: Error) =>
            sefaDispatch({
                error,
                stat: 'error',
                data: null,
            }),
        [sefaDispatch],
    );

    //run用来处罚异步请求
    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('请传入 promise 类型数据');
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            });
            sefaDispatch({ stat: 'loading' });
            return promise
                .then((data) => {
                    setData(data);
                    return data;
                })
                .catch((error) => {
                    //catch会消化异常 如果不主动抛出 外面接受不到异常
                    SetError(error);
                    if (config.throwOnError) return Promise.reject(error);
                    return error;
                });
        },
        [config.throwOnError, setData, SetError, sefaDispatch],
    );

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        SetError,
        retry,
        ...state,
    };
};
