import React from 'react';
import { Kanban } from 'types/kanban';
import { useTasks } from 'utils/task';

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTask } = useTasks();
    const tasks = allTask?.filter((task) => task.kanbanId === kanban.id);
    return (
        <div>
            <h3>{kanban.name}</h3>
            {tasks?.map((task) => (
                <div key={task.id}>{task.name}</div>
            ))}
        </div>
    );
};
