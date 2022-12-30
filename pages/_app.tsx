import '../styles/globals.css';
import Head from 'next/head';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import ErrorBoundary from '../components/common/error-boundary';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage, NextComponentType } from 'next';
import { ThemeProvider } from '@mui/material';
import { themeMaterial, themes } from '../theme';
import NextNProgress from 'nextjs-progressbar';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import commonConstants from '../constants/common.constant';
import { errorToast } from '../utils/my-swal';

const handleError = (error: any) => {
  // Fallback Error Catch If we don't define onError when using useQuery/useMutate
  errorToast({
    title: error?.message ?? commonConstants.SOMETHING_WENT_WRONG,
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      onError: handleError,
    },
    mutations: {
      retry: false,
      onError: handleError,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <ErrorBoundary>
      <NextNProgress
        height={6}
        color={themes.light.colorRoyalHeath}
        options={{ easing: 'ease', speed: 500 }}
      />
      <Head>
        <title>Supermomos</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={themeMaterial}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            {getLayout(<Component {...pageProps} />)}
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
