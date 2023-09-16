/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { englishToNepaliNumber } from 'nepali-number';
import { IconAlignJustified, IconArrowRight, IconBell, IconSun, IconMoonStars, IconSearch } from '@tabler/icons';

// @ts-ignore
import Link from 'next/link';
import {
    ActionIcon, Avatar, Switch, Image,
    Flex, Menu, Select, SimpleGrid, Stack, Text, Group, useMantineTheme, useMantineColorScheme, Autocomplete,
} from '@mantine/core';
import useWindowSize from '@rooks/use-window-size';
import { useAppContext } from '../../context/AppProvider';
import { AuthService } from '../../services/index';
import { SidebarContext } from '../../context/SidebarContext';
import nepallogo from '../../public/nepal_logo.png';

const header = () => {
    const router = useRouter();
    // @ts-ignore
    const { sidebarIsOpen, setSidebarIsOpen } = useContext(SidebarContext);
    const [mobileView, setMobileView] = useState(false);
    const { user, getPalika, palika } = useAppContext();

    const { innerWidth } = useWindowSize();
    useEffect(() => {
        // if the width of the window is smaller than 600px, then set the sidebarIsOpen to false
        if (innerWidth != null && innerWidth < 800) {
            setMobileView(true);
        } else {
            setMobileView(false);
        }
    }, [sidebarIsOpen, innerWidth, mobileView]);

    const onClick = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    };

    const logOut = async () => {
        await AuthService.logout();
        router.push('/auth/login');
    };
    const selectData = [
        { label: englishToNepaliNumber('78/79'), value: 'option1' },
        { label: englishToNepaliNumber('79/80'), value: 'option2' },
        { label: englishToNepaliNumber('81/82'), value: 'option3' },
        { label: englishToNepaliNumber('82/83'), value: 'option4' },
    ];
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <Group
            ml={sidebarIsOpen ? '240px' : !sidebarIsOpen && innerWidth < 800 ? '0px' : '70px'}
            position="apart"
            sx={{ padding: 10 }}
        // sx={{ padding: 10, width: mobileView ? 'calc(100vh - 240px)' : 'calc(100vh-60px)' }}
        >
            <Stack>
                <SimpleGrid cols={1} sx={{ flexDirection: 'row', align: 'right' }} spacing={0}>
                    <Group>
                        <ActionIcon
                            aria-label="Sidebar Menu"
                            mr="2"
                            sx={{
                                display: mobileView ? 'flex' : 'flex',
                                color: theme.colors.main[14],
                                height: 30,
                                width: 30,
                                '&:hover': {
                                    transform: 'scale(1.07)',
                                    backgroundColor: theme.colors.main[12]
                                },

                            }}
                            onClick={onClick}
                        >{sidebarIsOpen ? <IconAlignJustified fontWeight={600} /> : <IconArrowRight />}
                        </ActionIcon>
                        <Stack sx={{
                            display: mobileView ? 'none' : sidebarIsOpen && !mobileView ? 'flex' : null,
                            flexDirection: "row",
                            alignItems: 'center',
                            marginLeft: 10,
                        }}
                        >
                            <Avatar
                                title="Nagarpalika"
                                src={nepallogo.src}
                                h="35px"
                                w="35px"
                                sx={{ borderRadius: 'md' }}
                            />
                            <Stack spacing={0}>
                                <Text
                                    sx={
                                        {
                                            color: theme.colors.main[4],
                                            fontSize: 22,
                                            fontWeight: 700,
                                        }
                                    }
                                >बेसीशहर नगरपालिका
                                </Text>
                                <Text sx={
                                    {
                                        fontSize: 12,
                                        color: theme.colors.main[4],
                                        fontWeight: 600,
                                    }
                                }
                                >नगर कार्यपालिकाको कार्यालय, लमजुङ
                                </Text>
                            </Stack>
                        </Stack>
                    </Group>

                </SimpleGrid>
            </Stack>
            <Flex direction="row" align="center" justify="flex-end" sx={{ cursor: 'pointer' }}>
                <Autocomplete
                    w={mobileView ? "33vw" : 200}
                    mr={14}
                    placeholder="Search"
                    icon={<IconSearch size="1rem" stroke={1.5} />}
                    data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                />
                <Group position="center" mr={14}>
                    <Switch
                        mb={14}
                        checked={colorScheme === 'dark'}
                        onChange={() => toggleColorScheme()}
                        size="lg"
                        onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
                        offLabel={<IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />}
                    />
                </Group>
                <div className="me-2">
                    <IconBell stroke={1} color={theme.colors.main[13]} />
                </div>
                <Menu>
                    <Menu.Target>
                        <div
                            style={{
                                backgroundColor: !mobileView ? "#f3f3f9" : null,
                            }}
                            className={`d-flex align-items-center py-2 rounded-1 ${mobileView ? "ms-2" : "mx-3 px-4"}`}
                        >
                            <Image
                                height={36}
                                width={36}
                                radius="xl"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                alt="Random image"
                            />
                            <div className={`${mobileView ? 'd-none' : null} ps-2`}>
                                <p className="fs-16 pb-0 text-capitalize">{user?.username}</p>
                                <p style={{ lineHeight: "16px" }} className="fs-15 text-info text-capitalize">{user?.isAdmin ? "Admin" : "User"}</p>
                            </div>
                        </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Link href="/admin/settings">
                            <Menu.Item>
                                Account Settings
                            </Menu.Item>
                        </Link>
                        <Menu.Item
                            onClick={logOut}
                        >Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Flex>
        </Group>
    );
};

export default header;
