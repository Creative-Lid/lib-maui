import React from 'react';

import { WrapWithLink } from '../../hoc';
import LogoIcon from '../icons/LogoIcon';

export interface BrandProps {
    classes?: string;
    color?: string;
    link?: string;
    size?: number;
    width?: number;
}

const Brand = (props: BrandProps) => {
    const { classes, color, link, size, width } = props;

    return (
        <div className={classes}>
            {link ? (
                <WrapWithLink link={link}>
                    <LogoIcon
                        style={{
                            fill: color,
                            width,
                            fontSize: size,
                        }}
                    />
                </WrapWithLink>
            ) : (
                <LogoIcon
                    style={{
                        fill: color,
                        width,
                        fontSize: size,
                    }}
                />
            )}
        </div>
    );
};

export default Brand;
