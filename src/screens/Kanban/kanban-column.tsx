import styled from '@emotion/styled';
import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { useTasksSearchParams } from './util';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';

const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return <img src={name === 'task' ? taskIcon : bugIcon} />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTask } = useTasks(useTasksSearchParams());
    const tasks = allTask?.filter((task) => task.kanbanId === kanban.id);
    return (
        <div>
            <h3>{kanban.name}</h3>
            <Contioner>
                {tasks?.map((task) => (
                    <div key={task.id}>
                        {task.name}
                        <TaskTypeIcon id={task.typeId} />
                    </div>
                ))}
            </Contioner>
        </div>
    );
};

const Contioner = styled.div`
    margin-right: 3rem;
`;
