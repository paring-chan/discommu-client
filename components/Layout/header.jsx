import { Avatar, Flex, Sticky } from '@primer/components';
import React from 'react';
import NextLink from 'next/link'
import styled from 'styled-components';

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

const Header = ({ session }) => {
    return (
        <Sticky>
            <Flex height={HEADER_HEIGHT} px={[3, null, null, 4]}
                alignItems="center" justifyContent="space-between"
                bg="black">
                <Link href="/">
                    <h2>Discommu</h2>
                </Link>
                {
                    session.loggedIn ? (
                        <div>
                            {session.user.profile.avatar && (
                                <><Avatar size={30} src={`https://cdn.discordapp.com/avatars/${session.user.profile.id}/${session.user.profile.avatar}`} /> </>
                            )}
                            <HideOnMobile style={{ color: '#fff', fontSize: 20 }}>
                                {session.user.profile.username}#{session.user.profile.discriminator}
                            </HideOnMobile>
                        </div>
                    ) : (
                            <Link href="/auth/login">
                                로그인
                            </Link>
                        )
                }
            </Flex>
        </Sticky>
    );
};

export default Header;