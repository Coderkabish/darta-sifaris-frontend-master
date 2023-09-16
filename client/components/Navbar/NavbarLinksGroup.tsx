import { useContext, useState } from 'react';
import { Box, Collapse, createStyles, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, TablerIcon } from '@tabler/icons';
import Link from 'next/link';
// eslint-disable-next-line import/no-cycle
import { LayoutContext } from '../Layout/layout';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  link?: string;
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  handleBurger: (burgerValue: boolean) => void;
}

export function LinksGroup(
    { icon: Icon,
      label,
      initiallyOpened,
      links,
      link,
      handleBurger }: LinksGroupProps) {
  const { classes, theme, cx } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const layoutContext = useContext(LayoutContext);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((subLink) => (
    <Link href={subLink.link} key={subLink.label}>
      <Text<'a'>
        component="a"
        className={cx(classes.link, {
          [classes.linkActive]: layoutContext.activeLink === subLink.label,
        })}
        key={subLink.label}
        onClick={() => {
          layoutContext.setActiveLink(subLink.label);
          handleBurger(false);
        }}
      >
        {subLink.label}
      </Text>
    </Link>
  ));

  if (link && !hasLinks) {
    return (
      <>
        <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
          <Link href={link}>
            <Group position="apart" spacing={0}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={50}>
                  <Icon size={18} />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
            </Group>
          </Link>
        </UnstyledButton>
      </>
    );
  }
  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened} key={label}>
          {items}
        </Collapse>
      ) : null}
    </>
  );
}
