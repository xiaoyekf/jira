import { useMemo } from 'react';
import { useProject } from 'utils/project';
import { useUrlQueryParam } from 'utils/url';
import { useSearchParams } from 'react-router-dom';

//项目列表搜索参数
export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};

export const useProjectModal = () => {
    const [_, setUrlParams] = useSearchParams();
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']);
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId));
    const open = () => setProjectCreate({ projectCreate: true });
    const close = () => {
        setUrlParams({ projectCreate: '', editingProjectId: '' });
    };
    const starEdit = (id: number) => setEditingProjectId({ editingProjectId: id });

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
        open,
        close,
        starEdit,
        editingProject,
        isLoading,
    };
};
