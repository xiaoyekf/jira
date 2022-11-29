import { List } from './list';
import { SearchPanel } from './search-panel';
import React, { useState } from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import styled from '@emotion/styled';

import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';
import { useProjectSearchParams } from './util';

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表', false);
    const [param, setParam] = useProjectSearchParams();
    const { isLoading, error, data: list } = useProjects(useDebounce(param, 20));
    const { data: users } = useUsers();

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users || []} />
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <List loading={isLoading} users={users || []} dataSource={list || []} />
        </Container>
    );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
    padding: 3.2rem;
`;
