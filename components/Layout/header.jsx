import React from 'react';
import NextLink from 'next/link'
import styled from 'styled-components';
import { AppBar, Avatar, Button, IconButton, ListItem, ListItemIcon, ListItemText, Popover, Toolbar, Typography } from '@material-ui/core';
import { LockOpen, Person as PersonIcon } from '@material-ui/icons'

export const HEADER_HEIGHT = 66

const Link = ({ children, ...props }) => (
    <NextLink {...props}>
        <a style={{ color: '#fff' }}>{children}</a>
    </NextLink>
)

const HideOnMobile = styled.span`
@media screen and (max-width: 769px) {
    display: none;
    visibility: hidden;
}
`

const HideOnDesktop = styled.span`
@media screen and (min-width: 768px) {
    display: none;
    visibility: hidden;
}
`

const UserPopover = ({ user, update }) => {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false)
    }

    return (
        <>
            <IconButton color="inherit" onClick={handleClick}>
                <PersonIcon />
            </IconButton>
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
                <ListItem>
                    {
                        user.profile.avatar && <ListItemIcon>
                            <Avatar src={`https://cdn.discordapp.com/avatars/${user.profile.id}/${user.profile.avatar}`} />
                        </ListItemIcon>
                    }
                    <ListItemText primary={`${user.profile.username}#${user.profile.discriminator}`} />
                </ListItem>
                <ListItem button onClick={() => {
                    localStorage.removeItem('token')
                    update({loggedIn:false,user:null,token:null})
                }}>
                    {
                        user.profile.avatar && <ListItemIcon>
                            <LockOpen/>
                        </ListItemIcon>
                    }
                    <ListItemText primary="로그아웃" />
                </ListItem>
            </Popover>
        </>
    )
}

const Header = ({ session, updateSession }) => {
    return (
        <>
            {/*<Flex height={HEADER_HEIGHT} px={[3, null, null, 4]}
                alignItems="center" justifyContent="space-between"
                bg="black">
                <Link href="/">
                    <h2>Discommu</h2>
                </Link>
                {
                    session.loggedIn ? (
                        <div>
                            <UserPopover user={session.user} update={updateSession} />
                        </div>
                    ) : (
                            <Link href="/auth/login">
                                로그인
                            </Link>
                        )
                }
            </Flex>*/}
            <AppBar style={{ boxShadow: 'none', background: '#000' }}>
                <Toolbar>
                    <Typography variant="h6">
                        <NextLink href="/">
                            Discommu
                        </NextLink>
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    {
                        session.loggedIn ? (
                            <div>
                                <UserPopover user={session.user} update={updateSession} />
                            </div>
                        ) : (
                                <Link href="/auth/login">
                                    <Button color="inherit">
                                        로그인
                                    </Button>
                                </Link>
                            )
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;