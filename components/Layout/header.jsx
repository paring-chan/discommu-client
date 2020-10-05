import { Flex, Sticky } from '@primer/components';
import React from 'react';
import NextLink from 'next/link'

export const HEADER_HEIGHT = 66

const Link = ({children, ...props}) => (
    <NextLink {...props}>
        <a style={{color: '#fff'}}>{children}</a>
    </NextLink>
)

const Header = (props) => {
    return (
        <Sticky>
            <Flex height={HEADER_HEIGHT} px={[3, null, null, 4]}
                alignItems="center" justifyContent="space-between"
                bg="black">
                    <Link href="/">
                        <h2>Discommu</h2>
                    </Link>
            </Flex>
        </Sticky>
    );
};

export default Header;