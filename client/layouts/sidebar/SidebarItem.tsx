/* eslint-disable linebreak-style */
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ActionIcon, Box, Button, Divider, Flex, Group, List, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronRight, IconFile } from '@tabler/icons';
import { useSidebarContext } from '../../context/SidebarContext';
import { sideMenuItems } from '../../bootstrap/config';

interface SubmenuState {
  [key: string]: boolean;
}

interface SubMenuItem {
  name: string;
  key: string;
  url?: string;
  match?: string;
  subMenuItems?: SubMenuItem[];
  subMenuState?: SubmenuState;
}

interface SidebarItemProps {
  name: string;
  url: string;
  icon?: React.ElementType;
  subMenuItems?: SubMenuItem[];
  match: string;
  onClick?: (event: MouseEvent) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ name, url, match, icon, subMenuItems }) => {
  const router = useRouter();
  const { pathname } = router;
  const { sidebarIsOpen } = useSidebarContext();
  const [subMenuState, setSubMenuState] = useState<SubmenuState>({});

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleClick = (submenu: any, key: string, url: string | undefined) => {
    if (submenu) {
      setSubMenuState({
        ...subMenuState,
        [key]: !subMenuState[key],
      });
    } else if (url) {
      router.push(url);
    }
  };
  const theme = useMantineTheme();

  const isActive = (path: string) => pathname === path || pathname.includes(path);

  const renderSubMenu = (items: SubMenuItem[]) => (
    <List withPadding listStyleType="disc">
      {items.map((item) => (
        <>
          <List.Item
            key={item.key}
            color="white"
            p="1"
            onClick={() => handleClick(item.subMenuItems, item.key, item.url)}
            sx={{
              cursor: 'pointer',
              width: '100%',
              transition: 'all .3s ease-out',
              color: theme.colors.main[15],
              '&:hover': {
                color: theme.colors.main[1],
              },
              listStyleType: '-',
            }}
          >
            <Flex
              align="center"
              mb={4}
            >
              <Text
                p="1"
                weight={500}
                size={15}
              >
                {item.name}
              </Text>
              <Box ml="auto" sx={{ textAlign: 'center' }}>
                {item.subMenuItems && (subMenuState[item.key] ?
                  <IconChevronDown size={15} /> : <IconChevronRight size={15} />)}
              </Box>
            </Flex>
          </List.Item>
          {sidebarIsOpen && subMenuState[item.key] && <Divider />}
          {sidebarIsOpen &&
            item.subMenuItems && subMenuState[item.key] && renderSubMenu(item.subMenuItems)}

        </>))
      }
    </List>
  );

  return (
    <>
      <Flex
        w="full"
        mb={5}
        align="center"
        onClick={() => handleClick(subMenuItems, match, url)}
        sx={{
          cursor: subMenuItems ? 'pointer' : 'default',
          justifyContent: sidebarIsOpen ? 'left' : 'center',
          color: isActive(url) ? theme.colors.main[12] : theme.colors.main[15],
          padding: 4,
          paddingLeft: sidebarIsOpen ? 10 : 0,
          borderTopLeftRadius: 13,
          borderBottomLeftRadius: 13,
          marginLeft: 8,
          letterSpacing: 1,
          transition: 'ease-in 0.1s',
          '&:hover': {
            color: theme.colors.main[1],
          },
        }}
      >  {sidebarIsOpen ? (
        <>
          <Group spacing={5} my={8}>
            {icon && React.createElement(icon, {
              width: 18,
              height: 18,
              margin: 0,
              paddingLeft: 0,
              fontWeight: 600,
            })}
            <Text mr="0" size={16} weight={500}>
              {name}
            </Text>
          </Group>

          {subMenuItems && (
            <Box ml="auto" sx={{ align: 'right' }}>
              {subMenuState[match] ? <IconChevronDown size={15} /> : <IconChevronRight size={15} />}
            </Box>
          )}
        </>
      ) : (
        <>
          <Stack title={name} aria-label={name} py={8}>
            <Box>
              {icon && React.createElement(icon, {
                width: 21,
                height: 21,
                color: isActive(url) ? theme.colors.main[12] : theme.colors.main[15],
                margin: 0,
                padding: 0,
                fontWeight: 700,
              })}
            </Box>
          </Stack>
        </>
      )}
      </Flex>
      {sidebarIsOpen && subMenuItems && subMenuState[match] && (
        <>
          {sidebarIsOpen && <Divider color={theme.colors.main[14]} />}
          {renderSubMenu(subMenuItems)}
        </>
      )}
    </>
  );
};

export default SidebarItem;
