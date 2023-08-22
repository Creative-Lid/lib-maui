import common from '@mui/material/colors/common';
import { alpha } from '@mui/material';

import 'typeface-noto-sans';

import Amber from './colors/Amber';
import Blue from './colors/Blue';
import Grey from './colors/Grey';
import Green from './colors/Green';
import Red from './colors/Red';
import Indigo from './colors/Indigo';

export const Palette = {
    common: {
        black: common.black,
        white: common.white,
    },
    neutral: {
        contrastText: Grey[900],
        dark: Grey.A200,
        light: Grey.A100,
        main: Grey[50],
    },
    primary: {
        contrastText: common.white,
        dark: Indigo[900],
        light: Indigo[100],
        main: Indigo[500],
    },
    secondary: {
        contrastText: common.white,
        dark: Grey[900],
        light: Grey[600],
        main: Grey[700],
    },
    success: {
        contrastText: common.white,
        dark: Green[700],
        light: Green[300],
        main: Green[500],
    },
    error: {
        contrastText: common.white,
        dark: Red[700],
        light: Red[300],
        main: Red[500],
    },
    grey: {
        50: Grey[50],
        100: Grey[100],
        200: Grey[200],
        300: Grey[300],
        400: Grey[400],
        500: Grey[500],
        600: Grey[600],
        700: Grey[700],
        800: Grey[800],
        900: Grey[900],
        A100: Grey.A100,
        A200: Grey.A200,
        A400: Grey.A400,
        A700: Grey.A700,
    },
    info: {
        contrastText: common.white,
        dark: Blue[700],
        light: Blue[300],
        main: Blue[500],
    },
    warning: {
        contrastText: common.white,
        dark: Amber[700],
        light: Amber[300],
        main: Amber[500],
    },
    action: {
        active: alpha(common.black, 0.54),
        disabled: Grey[700],
        disabledBackground: Grey[300],
        hover: alpha(common.black, 0.08),
        hoverOpacity: 0.08,
        selected: alpha(common.black, 0.14),
    },
    background: {
        default: common.white,
        paper: Grey[100],
    },
    text: {
        disabled: alpha(Grey[700], 0.38),
        hint: alpha(Grey[700], 0.38),
        primary: common.black,
        secondary: Grey[700],
    },
    divider: alpha(Grey[700], 0.2),
};
