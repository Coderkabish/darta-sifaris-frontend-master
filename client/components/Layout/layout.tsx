import React, { createContext, useEffect, useState } from 'react';
import {
  Navbar,
  Flex,
} from '@mantine/core';
import useWindowSize from '@rooks/use-window-size';
// eslint-disable-next-line import/no-cycle
import Sidebar from '../../layouts/sidebar';
import { useSidebarContext } from '../../context/SidebarContext';
import { useAppContext } from '../../context/AppProvider';
import Loading from '../Loading';
import Header from '../../layouts/header/index';

type initialContextValue = {
  activeLink: string;
  setActiveLink: (value: string) => void;
};
export const LayoutContext = createContext<initialContextValue>({
  activeLink: '',
  setActiveLink: () => {},
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { innerWidth } = useWindowSize();

  const [activeLink, setActiveLink] = useState('');
  // useEffect(() => {
  //   setCounter(a => a + 1);
  // }, [router.pathname]);

  const { sidebarIsOpen } = useSidebarContext();
  // @ts-ignore
  const { loading, getUser } = useAppContext();

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Loading isFullPage />;
  }

  return (
      <>
        <LayoutContext.Provider value={{ activeLink, setActiveLink }}>
          <Navbar>
          {/* className="w-100 overflow-x-hidden" */}
            <Header />
            <Flex direction="row" bg="#DFEFFF">
              <Sidebar />
              <Flex
                ml={sidebarIsOpen ? '240px' : !sidebarIsOpen && innerWidth < 800 ? '0px' : '60px'}
                p={4}
                pt={4}
                direction="column"
                pb={160}
                sx={{ width: '100%', height: '100vh' }}
              >
                {children}
              </Flex>
            </Flex>
          </Navbar>
        </LayoutContext.Provider>
      </>

  );
}
