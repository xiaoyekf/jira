import { List } from './list';
import { SearchPanel } from './search-panel';
import React from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { Button, Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

import { useProjectSearchParams } from './util';

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
    useDocumentTitle('项目列表', false);
    const [param, setParam] = useProjectSearchParams();
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 20));
    const { data: users } = useUsers();

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                {props.projectButton}
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users || []} />
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <List
                projectButton={props.projectButton}
                refresh={retry}
                loading={isLoading}
                users={users || []}
                dataSource={list || []}
            />
        </Container>
    );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
    padding: 3.2rem;
`;
