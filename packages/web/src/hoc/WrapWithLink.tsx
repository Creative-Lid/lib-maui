import React from 'react';

import { Link } from 'react-router-dom';
import { Link as ExternalLink, LinkProps } from '@mui/material';

type WrapWithLinkProps = {
    children: LinkProps['children'];
    link: LinkProps['href'];
    color?: LinkProps['color'];
    target?: LinkProps['target'];
    className?: LinkProps['className'];
    underline?: LinkProps['underline'];
    internal?: boolean;
};

const WrapWithLink = ({
    color,
    link,
    internal = true,
    className,
    target = '_blank',
    children,
    underline = 'none',
}: WrapWithLinkProps) => {
    const props = internal
        ? {
            component: Link,
            to: link,
        } : {
            href: link,
            target,
        };

    return (
        <ExternalLink
            color={color}
            className={className}
            underline={underline}
            {...props}
        >
            {children}
        </ExternalLink>
    );
};

export default WrapWithLink;
