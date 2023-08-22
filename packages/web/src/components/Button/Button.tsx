import React, { forwardRef } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MuiButton from '@mui/material/Button';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {
    /**
     * If `true`, the button will be disabled and show a loading content.
     * @default false
     */
    loading?: boolean;
    /**
     * The content to show when the button prop `loading` is `true`.
     * @default <CircularProgress size='1.5rem' color='inherit' />
     */
    loadingContent?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    props,
    ref,
) {
    const {
        loading = false,
        children,
        loadingContent = <CircularProgress size='1.5rem' color='inherit' />,
        disabled,
        ...other
    } = props;

    const LoadingContentContainer = () => (
        <Box
            display='inline-flex'
            position='absolute'
            sx={(theme) => ({
                color: theme.palette.action.disabled,
            })}
        >
            {loadingContent}
        </Box>
    );

    return (
        <MuiButton
            ref={ref}
            disabled={disabled || loading}
            disableTouchRipple={props.variant === 'text' ? true : false}
            disableRipple={props.variant === 'text' ? true : false}
            disableFocusRipple={props.variant === 'text' ? true : false}
            {...other}
            sx={{
                ...(loading && {
                    color: 'transparent !important',
                    position: 'relative',
                }),
                ...other.sx,
            }}
        >
            {loading && <LoadingContentContainer />}
            {children}
        </MuiButton>
    );
});

export default Button;
