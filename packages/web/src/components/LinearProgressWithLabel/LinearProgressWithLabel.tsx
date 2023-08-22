import React from 'react';

import Box from '@mui/material/Box';
import LinearProgress, {
    LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number },
) => {
    const { value } = props;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
                <LinearProgress
                    variant='determinate'
                    sx={(theme) => ({
                        height: '1rem',
                        borderRadius: '.2rem',
                        backgroundColor: theme.palette.grey[100],
                        boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 10%)',
                        '& .MuiLinearProgress-bar': {
                            backgroundImage:
                                'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                            backgroundSize: '40px 40px',
                        },
                    })}
                    {...props}
                />
            </Box>
            <Typography
                component='span'
                variant='body2'
                color={(theme) =>
                    value > 0
                        ? theme.palette.common.white
                        : theme.palette.common.black
                }
                sx={{
                    display: 'inline-block',
                    position: 'absolute',
                    left: `${value / 2}%`, // responsible for label position
                    transform: `translateX(${70 - value * 1.2}%)`, // adjusts label position, if value is 0 then it will be 70, if value is 100 then it will be -50
                }}
            >
                {`${Math.round(props.value)}%`}
            </Typography>
        </Box>
    );
};

export default LinearProgressWithLabel;
