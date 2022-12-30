import { Container, styled, Box } from '@mui/material';
import TopNav from '../top.nav';

type LayoutProps = {
  children: React.ReactNode;
};

const StyledBox = styled(Box)({
  marginTop: 100,
});

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth='xl'>
      <TopNav />
      <StyledBox>{children}</StyledBox>
    </Container>
  );
};

export default Layout;
