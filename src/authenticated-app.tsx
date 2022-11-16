import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';

export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <h2>logo</h2>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={logout}>登出</button>
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
const Header = styled(Row)``;

const PageHeader = styled.header``;

const Main = styled.main`
    height: calc(100vh - 6rem);
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
