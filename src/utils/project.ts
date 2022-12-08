import { cleanObject } from 'utils/index';
import { useAsync } from './use-async';
import { Project } from 'screens/project-list/list';
import { useCallback, useEffect } from 'react';
import { useHttp } from './http';
import { useQuery } from 'react-query';

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();

    return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }));
};

export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: 'PATCH',
            }),
        );
    };
    return {
        mutate,
        ...asyncResult,
    };
};

export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: 'POST',
            }),
        );
    };
    return {
        mutate,
        ...asyncResult,
    };
};
