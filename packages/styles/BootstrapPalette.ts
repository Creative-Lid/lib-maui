import common from '@mui/material/colors/common';
import { alpha, darken } from '@mui/material';

import 'typeface-noto-sans';

import Grey from './colors/bootstrap/Grey';
import Blue from './colors/bootstrap/Blue';
import Green from './colors/bootstrap/Green';
import Red from './colors/bootstrap/Red';
import Orange from './colors/bootstrap/Orange';
import Cyan from './colors/bootstrap/Cyan';

export const BootstrapPalette = {
    tonalOffset: 0.1,
    common: {
        black: darken(Grey[900], .7),
        white: common.white,
    },
    neutral: {
        light: Grey[50],
        main: Grey[200],
        dark: Grey[400],
        contrastText: Grey[900],
    },
    primary: {
        main: Blue[500],
    },
    secondary: {
        main: Grey[500],
    },
    success: {
        main: Green[500],
        contrastText: common.white,
    },
    error: {
        main: Red[500],
    },
    warning: {
        main: Orange[500],
        contrastText: common.white,
    },
    info: {
        main: Cyan[500],
        contrastText: common.white,
    },
    grey: Grey,
    action: {
        active: alpha(Grey[500], 0.54),
        hover: alpha(Grey[500], 0.04),
        hoverOpacity: 0.08,
        selected: alpha(Grey[500], 0.08),
        disabled: Grey[500],
        disabledBackground: Grey[300],
    },
    background: {
        paper: common.white,
        default: common.white,
    },
    text: {
        primary: darken(Grey[900], 0.6),
        secondary: alpha(Grey[900], 0.6),
        disabled: Grey[800],
    },
    divider: alpha(Grey[500], 0.12),
};
