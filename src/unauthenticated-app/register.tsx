import { Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });
    const handleSubmit = async ({
        cpassword,
        ...values
    }: {
        username: string;
        password: string;
        cpassword: string;
    }) => {
        if (cpassword !== values.password) {
            onError(new Error('请确认密码是否一致'));
            return;
        }
        try {
            await run(register(values));
        } catch (e: any) {
            onError(e);
        }
    };
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder={'用户名'} type="text" id={'username'} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder={'密码'} type="password" id={'password'} />
            </Form.Item>
            <Form.Item name={'cpassword'} rules={[{ required: true, message: '确认密码' }]}>
                <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
            </Form.Item>
            <Form.Item>
                <LongButton htmlType={'submit'} type={'primary'} loading={isLoading}>
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    );
};
