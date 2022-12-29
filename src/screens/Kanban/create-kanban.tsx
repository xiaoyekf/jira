import React from 'react';
import { Input } from 'antd';
import { useState } from 'react';
import { useAddKanban } from 'utils/kanban';
import { ColumnsContainer } from '.';
import { useKanbanQuery, useProjectIdInUrl } from './util';
import { Container } from './kanban-column';

export const CreateKanban = () => {
    const [name, setName] = useState('');
    const projectId = useProjectIdInUrl();
    const { mutateAsync: addKanban } = useAddKanban(useKanbanQuery());

    const submit = async () => {
        await addKanban({ name, projectId });
        setName('');
    };
    return (
        <Container>
            <ColumnsContainer>
                <Input
                    size={'large'}
                    placeholder={'新建看板名称'}
                    onPressEnter={submit}
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                />
            </ColumnsContainer>
        </Container>
    );
};
