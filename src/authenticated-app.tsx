import styled from '@emotion/styled';
import { ButtonNoPadding, Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from 'antd';
import { resetRoute, useDocumentTitle } from 'utils';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProjectScreen } from 'screens/project';
import { useState } from 'react';
import { ProjectModal } from 'screens/project-list/project-modal';
import { ProjectPopover } from 'components/project-popover';

export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    useDocumentTitle('项目列表', false);
    return (
        <Container>
            <PageHeader
                projectButton={
                    <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>
                        创建项目
                    </ButtonNoPadding>
                }
            />
            <Main>
                <Router>
                    <Routes>
                        {/* <Route path={'/'} element={<Navigate to={'/projects'} />} /> */}
                        <Route
                            path={'/projects'}
                            element={
                                <ProjectListScreen
                                    projectButton={
                                        <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>
                                            创建项目
                                        </ButtonNoPadding>
                                    }
                                />
                            }
                        />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                        <Route
                            index
                            element={
                                <ProjectListScreen
                                    projectButton={
                                        <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>
                                            创建项目
                                        </ButtonNoPadding>
                                    }
                                />
                            }
                        />
                    </Routes>
                </Router>
            </Main>
            <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
        </Container>
    );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type={'link'} onClick={resetRoute}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                </ButtonNoPadding>

                <ProjectPopover {...props} />
                <span>用户</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    );
};
const User = () => {
    const { logout, user } = useAuth();
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={'link'} onClick={logout}>
                            登出
                        </Button>
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type={'link'} onClick={(e) => e.preventDefault()}>
                Hi,{user?.name}
            </Button>
        </Dropdown>
    );
};
// temporal dead zone(暂时性死区)
const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
`;

const Main = styled.main`
    height: calc(100vh - 6rem);
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
