import React from 'react';

import MuiDivider, {
    DividerProps as MuiDividerProps,
} from '@mui/material/Divider';

export interface DividerProps extends MuiDividerProps {
    marginBottom?: number; // @default 0.5rem when spacer is true, otherwise @defailt 0
    marginTop?: number; // @default 0.5rem when spacer is true, otherwise @defailt 0
    spacer?: boolean; // @default false
}

export const calculateMargin = (
    defaultMargin: number,
    hasSpacer?: boolean,
    isVertical?: boolean,
    margin?: number | string,
): string => {
    let resolvedMargin = defaultMargin;

    if (isVertical !== true || (!hasSpacer && !margin)) {
        resolvedMargin = 0;
    } else if (margin !== undefined && typeof margin === 'number') {
        resolvedMargin = margin;
    }

    return `${resolvedMargin}rem`;
};

const Divider = (props: DividerProps) => {
    const defaultMargin = 0.5;

    const { marginBottom, marginTop, spacer, ...dividerProps } = props;

    const spacerProps = {
        ...props.sx,
        borderStyle: spacer ? 'none' : 'solid',
        marginBottom: calculateMargin(
            defaultMargin,
            spacer,
            props.orientation !== 'vertical',
            marginBottom,
        ),
        marginTop: calculateMargin(
            defaultMargin,
            spacer,
            props.orientation !== 'vertical',
            marginTop,
        ),
    };

    return <MuiDivider sx={{ ...spacerProps }} {...dividerProps} />;
};

export default Divider;
