import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { TaskTypeSelect } from 'components/task-type-select';
import { UserSelect } from 'components/user-select';
import React, { useEffect } from 'react';
import { useDeleteTask, useEditTask } from 'utils/task';
import { useTasksModal, useTasksQuery } from './util';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export const TaskModal = () => {
    const [form] = Form.useForm();
    const { editingTaskId, editingTask, close } = useTasksModal();
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQuery());
    const { mutate: deletaTask } = useDeleteTask(useTasksQuery());

    const onCancel = () => {
        close();
        form.resetFields();
    };

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() });
        close();
    };
    const startDelete = () => {
        close();
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除任务吗？',
            onOk() {
                return deletaTask({ id: Number(editingTaskId) });
            },
        });
    };
    useEffect(() => {
        form.setFieldsValue(editingTask);
    }, [form, editingTask]);

    return (
        <Modal
            forceRender={true}
            onCancel={onCancel}
            onOk={onOk}
            okText={'确认'}
            cancelText={'取消'}
            confirmLoading={editLoading}
            title={'编辑任务'}
            visible={!!editingTaskId}
        >
            <Form {...layout} initialValues={editingTask} form={form}>
                <Form.Item label={'任务名'} name={'name'} rules={[{ required: true, message: '请输入任务名' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label={'经办人'} name={'processId'}>
                    <UserSelect defaultOptionName={'经办人'} />
                </Form.Item>
                <Form.Item label={'任务名'} name={'typeId'}>
                    <TaskTypeSelect />
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={startDelete} style={{ fontSize: '13px' }} size={'small'}>
                    删除
                </Button>
            </div>
        </Modal>
    );
};
