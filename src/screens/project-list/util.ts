import { useMemo } from 'react';
import { useUrlQueryParam } from 'utils/url';
import { ProjectModal } from './project-modal';

//项目列表搜索参数
export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId']);
    return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']);

    const open = () => setProjectCreate({ projectCreate: true });
    const close = () => setProjectCreate({ projectCreate: undefined });

    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close,
    };
};
