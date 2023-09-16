import { ReactElement, ReactNode, useState } from 'react';
import { AppProps } from 'next/app';
import { setCookie } from 'cookies-next';
import Head from 'next/head';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { NextPage } from 'next';
import { RouterTransition } from '../components/RouterTransition/RouterTransition';
import { AddSectionModal } from '../components/Modals/AddSectionModal';
import { AddVariablesModal } from '../components/Modals/AddVariablesModal';
import { AddCategoryModal } from '../components/Modals/AddCategoryModal';
import { AddUserModal } from '../components/Modals/AddUserModal';
import SidebarProvider from '../context/SidebarContext';
import AppProvider from '../context/AppProvider';
import '../styles/index.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  colorScheme: ColorScheme;
};

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const getLayout = props.Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Darta Sifaris Dashboard</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
        {/*For favicons*/}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <AppProvider>
          <MantineProvider
            theme={{
              colorScheme,
              primaryColor: 'blue',
              fontFamily: 'Mukta',
              headings: {
                fontFamily: 'Mukta',
              },
              colors: {
                // @ts-ignore
                main: [
                  '#DFEFFF',
                  '#89a5d9',
                  '#5979ca',
                  '#418cc2',
                  '#1245b3',
                  '#b8c6e8',
                  '#5979ca',
                  '#1245b3',
                  '#5979ca',
                  '#0fc9ee',
                  '#336699',
                  '#096CDD',
                  '#fff',
                  '#000',
                  '#495057',
                  'hsla(0,0%,100%,.5)',
                  '#fbf7f4',
                ],
              },
              components: {
                Badge: {
                  defaultProps: {
                    color: 'gray',
                  },
                },
                TextInput: {
                  defaultProps: {
                    size: 'md',
                    radius: 'md',
                  },
                },
                NumberInput: {
                  defaultProps: {
                    size: 'md',
                    radius: 'md',
                  },
                },
                Textarea: {
                  defaultProps: {
                    size: 'md',
                    radius: 'md',
                  },
                },
                Select: {
                  defaultProps: {
                    size: 'md',
                    radius: 'md',
                  },
                },
                MultiSelect: {
                  defaultProps: {
                    size: 'md',
                    radius: 'md',
                  },
                },
                Paper: {
                  defaultProps: {
                    p: 'md',
                    shadow: 'lg',
                  },
                },
              },
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <SidebarProvider>
              <ModalsProvider
                modals={{
                  addSection: AddSectionModal,
                  addVariable: AddVariablesModal,
                  addCategory: AddCategoryModal,
                  addUser: AddUserModal,
                }}
              >
                <NotificationsProvider autoClose={1000}>
                  <RouterTransition />
                  {getLayout(<Component {...pageProps} />)}
                </NotificationsProvider>
              </ModalsProvider>
            </SidebarProvider>
          </MantineProvider>
        </AppProvider>
      </ColorSchemeProvider>
    </>
  );
}
