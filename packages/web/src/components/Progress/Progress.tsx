import React from 'react';

import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export interface ProgressProps {
    classes?: string;
    color?: CircularProgressProps['color'];
    disableGutters?: boolean;
    disableShrink?: boolean;
    size?: number;
    sx?: CircularProgressProps['sx'];
    thickness?: number;
    value?: number;
    variation?: CircularProgressProps['variant'];
}

const Progress = (props: ProgressProps) => {
    const {
        classes,
        color,
        disableGutters,
        disableShrink,
        size,
        sx,
        thickness,
        value,
        variation,
    } = props;

    const progressProps = {
        className: classes || undefined,
        color: color || 'primary',
        disableShrink: disableShrink || (false as boolean),
        size: size || (40 as number),
        sx: sx || ({} as object),
        thickness: thickness || (3.6 as number),
        value: value || (0 as number),
        variant: variation || 'indeterminate',
    };

    return (
        <Container maxWidth='lg' disableGutters={disableGutters}>
            <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
            >
                <Grid item>
                    <CircularProgress {...progressProps} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Progress;
