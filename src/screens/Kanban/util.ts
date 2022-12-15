import { useLocation } from 'react-router';
import { useProject } from 'utils/project';

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearch = () => ({ projectId: useProjectIdInUrl() });

export const useKanbanQuery = () => ['kanbans', useKanbanSearchParams()];

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useTasksQuery = () => ['tasks', useTasksSearchParams()];

export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });
