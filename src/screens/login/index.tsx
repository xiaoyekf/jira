import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';

export const LoginScreen = () => {
    const { login, user } = useAuth();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        login({ username, password });
    };
    return (
        <form onSubmit={handleSubmit}>
            登录成功用户名{user?.name}
            {user?.token}
            <div>
                <label htmlFor="usename">用户名</label>
                <input type="text" id={'usename'} />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="text" id={'password'} />
            </div>
            <button type={'submit'}>登录</button>
        </form>
    );
};
