import { lighten } from '@mui/material';

import { Palette as palette } from '../Palette';

const Paper = [
    {
        props: { variant: 'neutral-striped' },
        style: {
            background: `repeating-linear-gradient(
            -45deg,
            ${lighten(palette.neutral.light, 0.5)}, 
            ${lighten(palette.neutral.light, 0.5)} 5px, 
            ${palette.neutral.light} 5px, 
            ${palette.neutral.light} 10px)
        `,
            color: palette.common.black,
        },
    },
    {
        props: { variant: 'neutral-striped-outlined' },
        style: {
            background: `repeating-linear-gradient(
            -45deg,
            ${lighten(palette.neutral.light, 0.5)}, 
            ${lighten(palette.neutral.light, 0.5)} 5px, 
            ${palette.neutral.light} 5px, 
            ${palette.neutral.light} 10px)
        `,
            border: '1px solid '.concat(palette.neutral.light),
            color: palette.common.black,
        },
    },
    {
        props: { variant: 'primary' },
        style: {
            background: palette.primary.main,
            color: palette.common.white,
        },
    },
    {
        props: { variant: 'primary-outlined' },
        style: {
            background: palette.primary.main,
            border: '1px solid '.concat(palette.primary.main),
            color: palette.common.white,
        },
    },
    {
        props: { variant: 'primary-striped' },
        style: {
            background: `repeating-linear-gradient(
            -45deg,
            ${palette.primary.main}, 
            ${palette.primary.main} 5px, 
            ${palette.primary.dark} 5px, 
            ${palette.primary.dark} 10px)
        `,
            color: palette.common.white,
        },
    },
    {
        props: { variant: 'primary-striped-outlined' },
        style: {
            background: `repeating-linear-gradient(
            -45deg,
            ${palette.primary.main}, 
            ${palette.primary.main} 5px, 
            ${palette.primary.dark} 5px, 
            ${palette.primary.dark} 10px)
        `,
            border: '1px solid '.concat(palette.primary.dark),
            color: palette.common.white,
        },
    },
    {
        props: { variant: 'secondary' },
        style: {
            background: lighten(palette.secondary.light, 0.7),
            color: palette.common.black,
        },
    },
    {
        props: { variant: 'secondary-outlined' },
        style: {
            background: lighten(palette.secondary.light, 0.7),
            border: '1px solid '.concat(lighten(palette.secondary.light, 0.7)),
            color: palette.common.black,
        },
    },
    {
        props: { variant: 'secondary-striped' },
        style: {
            background: `repeating-linear-gradient(
            -45deg,
            ${lighten(palette.secondary.light, 0.8)}, 
            ${lighten(palette.secondary.light, 0.8)} 5px, 
            ${lighten(palette.secondary.light, 0.7)} 5px, 
            ${lighten(palette.secondary.light, 0.7)} 10px)
        `,
            color: palette.common.black,
        },
    },
    {
        props: { variant: 'secondary-striped-outlined' },
        style: {
            background: `repeating-linear-gradient(
            -45deg,
            ${lighten(palette.secondary.light, 0.8)}, 
            ${lighten(palette.secondary.light, 0.8)} 5px, 
            ${lighten(palette.secondary.light, 0.7)} 5px, 
            ${lighten(palette.secondary.light, 0.7)} 10px)
        `,
            border: '1px solid '.concat(lighten(palette.secondary.light, 0.7)),
            color: palette.common.black,
        },
    },
];

export default Paper;
