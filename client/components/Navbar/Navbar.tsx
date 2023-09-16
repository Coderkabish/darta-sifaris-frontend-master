import { createStyles, Navbar, ScrollArea } from '@mantine/core';
import {
  IconLogout,
  IconUsers,
    IconTemplate,
    IconOverline,
} from '@tabler/icons';
// @ts-ignore
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-cycle
import { useEffect, useState } from 'react';
import { LinksGroup } from './NavbarLinksGroup';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      paddingBottom: 0,
    },

    header: {
      padding: theme.spacing.md,
      paddingTop: 0,
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },

    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    footer: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  };
});

const data = [
  {
    label: 'Overview',
    icon: IconOverline,
    links: [
      {
        label: 'Dashboard',
        link: '/admin/dashboard',
      },
      {
        label: 'Category',
        link: '/admin/category',
      },
      {
        label: 'Department',
        link: '/admin/department',
      },
      {
        label: 'Ward',
        link: '/admin/ward',
      },
    ],
  },
  {
    label: 'Template',
    icon: IconTemplate,
    links: [
      {
        label: 'Create',
        link: '/admin/templates/create',
      },
    ],
  },
  {
    label: 'Users',
    icon: IconUsers,
    links: [
      {
        label: 'Set Users',
        link: '/admin/users',
      },
    ],
  },
];

type Props = {
  isOpened: boolean;
  handleBurger: (burgerValue: boolean)=>void;
};

export function CustomNavbar({ isOpened, handleBurger }: Props) {
  const { classes } = useStyles();
  // const { data: session } = useSession();
  const [session, setSession] = useState(undefined);
  useEffect(() => {
    const a = sessionStorage?.getItem('session');
    setSession(a);
  }, []);
  const router = useRouter();
  const links = data.map((item) =>
      <LinksGroup
        handleBurger={handleBurger}
        {...item}
        key={item.label}
      />);
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!isOpened}
      width={{
        sm: 200,
        lg: 300,
      }}
      sx={{ }}
    >
      <Navbar.Section grow>
        <ScrollArea style={{ height: '80vh' }}>{links}</ScrollArea>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {session ? (
          <Link href="/auth/login">
            <a
              href="#"
              className={classes.link}
              onClick={async () =>
                signOut({
                  callbackUrl: '/auth/login',
                  redirect: false,
                }).then(async (a) => {
                  await router.push(a.url);
                })
              }
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Link>
        ) : (
          <Link href="/auth/login">
            <a href="#" className={classes.link}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Login</span>
            </a>
          </Link>
        )}
      </Navbar.Section>
    </Navbar>
  );
}
