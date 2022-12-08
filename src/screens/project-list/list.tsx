import { Dropdown, Menu, Modal, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { User } from './search-panel';
import { Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { useDeleteProject, useEditProject } from 'utils/project';
import { ButtonNoPadding } from 'components/lib';
import { useProjectModal, useProjectQueryKey } from './util';
import { Content } from 'antd/lib/layout/layout';
import { useDeleteConfig } from 'utils/use-optimistic-options';

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}
interface ListProps extends TableProps<Project> {
    users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject(useProjectQueryKey());
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

    return (
        <Table
            pagination={false}
            columns={[
                {
                    title: <Pin checked={true} disabled={true} />,
                    render(value, project) {
                        return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />;
                    },
                },
                {
                    title: '名称',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(value, project) {
                        return <Link to={`projects/${String(project.id)}`}>{project.name}</Link>;
                    },
                },
                {
                    title: '部门',
                    dataIndex: 'organization',
                },
                {
                    title: '负责人',
                    render(value, project) {
                        return <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>;
                    },
                },
                {
                    title: '创建时间',
                    render(value, project) {
                        return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>;
                    },
                },
                {
                    render(value, project) {
                        return <More project={project} />;
                    },
                },
            ]}
            {...props}
        />
    );
};

const More = ({ project }: { project: Project }) => {
    const { starEdit } = useProjectModal();
    const editPtoject = (id: number) => () => starEdit(id);
    const { mutate: delateProject } = useDeleteProject(useProjectQueryKey());
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: '确定删除这个项目吗？',
            content: '点击确定删除',
            okText: '确定',
            onOk() {
                delateProject({ id });
            },
        });
    };
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key={'edit'} onClick={editPtoject(project.id)}>
                        编辑
                    </Menu.Item>
                    <Menu.Item key={'delete'} onClick={() => confirmDeleteProject(project.id)}>
                        删除
                    </Menu.Item>
                </Menu>
            }
        >
            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
        </Dropdown>
    );
};
