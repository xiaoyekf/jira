import React from 'react';
import styled from '@emotion/styled';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { KanbanColumn } from './kanban-column';
import { useProjectInUrl, useTasksSearchParams } from './util';

export const KanbanScreen = () => {
    useDocumentTitle('看板列表');
    const { data: currentProject } = useProjectInUrl();
    const { data: kanbans } = useKanbans(useTasksSearchParams());
    return (
        <div>
            <h1>{currentProject?.name}看板</h1>
            <Container>
                {kanbans?.map((kanban) => (
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                ))}
            </Container>
        </div>
    );
};

const Container = styled.div`
    display: flex;
    overflow: hidden;
`;
