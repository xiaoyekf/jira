import { List } from './list';
import { SearchPanel } from './search-panel';
import React from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { ButtonNoPadding, Row } from 'components/lib';
import { Button, Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

import { useProjectModal, useProjectSearchParams } from './util';

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表', false);
    const { open } = useProjectModal();
    const [param, setParam] = useProjectSearchParams();
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 20));
    const { data: users } = useUsers();

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding onClick={open} type={'link'}>
                    创建项目
                </ButtonNoPadding>
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users || []} />
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
        </Container>
    );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
    padding: 3.2rem;
`;
