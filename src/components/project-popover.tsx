import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import React from 'react';
import { useProjects } from 'utils/project';
import { ButtonNoPadding } from './lib';

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
    const { data: projects, isLoading } = useProjects();
    const pinnedProjects = projects?.filter((project) => project.pin);
    const content = (
        <ContentContainer>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map((project) => (
                    <List.Item>
                        <List.Item.Meta title={project.name}></List.Item.Meta>
                    </List.Item>
                ))}
            </List>
            <Divider />
            {props.projectButton}
        </ContentContainer>
    );
    return (
        <span>
            <Popover placement={'bottom'} content={content}>
                项目
            </Popover>
        </span>
    );
};

const ContentContainer = styled.div`
    min-width: 30rem;
`;