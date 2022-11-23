import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from 'antd';
import { useDocumentTitle } from 'utils';

export const AuthenticatedApp = () => {
    const { logout, user } = useAuth();
    useDocumentTitle('项目列表', false);
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
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
                </HeaderRight>
            </Header>
            <PageHeader></PageHeader>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
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

const PageHeader = styled.header``;

const Main = styled.main`
    height: calc(100vh - 6rem);
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
