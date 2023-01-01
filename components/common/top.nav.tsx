import {
  AppBar,
  Box,
  Container,
  Toolbar,
  styled,
  Stack,
  Button,
} from '@mui/material';
import { Text16Weight500 } from './styled/typography-styed';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { themes } from '../../theme';
import ImageWithFallback from './image-with-fallback';
import Link from 'next/link';
import { useEffect } from 'react';

type PageType = {
  text: string;
  hasOption?: boolean;
};

const StyledStack = styled(Stack)({
  width: '100%',
});

const pages: PageType[] = [
  { text: 'Blog' },
  { text: 'Socials' },
  { text: 'Past Socials' },
  { text: 'Clubs', hasOption: true },
  { text: 'Contact' },
];

function TopNav() {
  useEffect(() => {
    window.addEventListener('scroll', headerColorChange);
    return () => window.removeEventListener('scroll', headerColorChange);
  });
  const headerColorChange = () => {
    const windowsScrollTop = window.pageYOffset;
    const navbar = document.querySelector('#navbar');
    if (windowsScrollTop > 50) {
      // @ts-ignore
      navbar.style.backgroundColor = '#fff';
    } else {
      // @ts-ignore
      navbar.style.backgroundColor = 'transparent';
    }
  };

  return (
    <AppBar id='navbar' sx={{ backgroundColor: 'transparent' }} elevation={0}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <StyledStack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Link href={'/'} passHref>
              <ImageWithFallback
                src='/supermomos-logo.png'
                isStatic={true}
                alt='logo'
                width={200}
                height={35}
                priority
              />
            </Link>
            <Box>
              <StyledStack direction='row' gap={6}>
                {pages.map(({ text, hasOption }: PageType) => (
                  <Button
                    variant='text'
                    key={text}
                    endIcon={
                      hasOption ? (
                        <ExpandMoreIcon
                          style={{ color: themes.light.colorBlack }}
                        />
                      ) : null
                    }
                  >
                    <Text16Weight500>{text}</Text16Weight500>
                  </Button>
                ))}
              </StyledStack>
            </Box>
          </StyledStack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNav;
