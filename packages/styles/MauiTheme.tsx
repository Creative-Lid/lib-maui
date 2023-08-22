import { createTheme } from '@mui/material/styles';
import common from '@mui/material/colors/common';

import 'typeface-noto-sans';
import '@fontsource/the-nautigal';
import '@fontsource/palanquin-dark';

import { Palette as palette } from './Palette';

const defaults = createTheme({
    spacing: 8,
});

const MauiTheme = createTheme({
    ...defaults,
    palette: { ...palette },
    shape: {
        borderRadius: 4,
    },
    typography: {
        fontFamily: '"Helvetica Neue Regular", Helvetica, Arial, sans-serif',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Bold", Helvetica, Arial, sans-serif',
            fontSize: '3.375rem',
            fontWeight: 500,
        },
        h2: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Bold", Helvetica, Arial, sans-serif',
            fontSize: '3rem',
            fontWeight: 500,
        },
        h3: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Bold", Helvetica, Arial, sans-serif',
            fontSize: '2.25rem',
            fontWeight: 500,
        },
        h4: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Bold", Helvetica, Arial, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h5: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Medium", Helvetica, Arial, sans-serif',
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Medium", Helvetica, Arial, sans-serif',
            fontWeight: 500,
        },
        subtitle1: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Medium", Helvetica, Arial, sans-serif',
            fontWeight: 500,
        },
        subtitle2: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Medium", Helvetica, Arial, sans-serif',
            fontWeight: 500,
        },
        body1: {
            color: palette.text.primary,
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.5rem',
        },
        body2: {
            color: palette.text.primary,
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.25rem',
        },
        caption: {
            color: palette.text.primary,
            fontSize: '0.75rem',
            lineHeight: '0.875rem',
            fontWeight: 500,
        },
        button: {
            color: palette.text.primary,
            fontFamily: '"Helvetica Neue Bold", Helvetica, Arial, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
        },
        overline: {
            color: palette.text.primary,
            fontSize: '0.625rem',
            fontWeight: 600,
            lineHeight: '0.75rem',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: common.white,
                    color: palette.text.primary,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                variant: 'contained',
                color: 'primary',
            },
            styleOverrides: {
                root: {
                    paddingTop: defaults.spacing(1),
                    paddingBottom: defaults.spacing(1),
                    minWidth: 170,
                    textTransform: 'capitalize',
                    transition: 'none',
                    '&:hover': {
                        backgroundColor: palette.grey[200],
                    },
                    '&:disabled': {
                        backgroundColor: palette.action.disabledBackground,
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        borderColor: palette.grey[200],
                        color: palette.primary.main,
                    },
                },
                outlined: {
                    background: palette.common.white,
                    border: `1px solid inherit`,
                    paddingTop: defaults.spacing(0.875),
                    paddingBottom: defaults.spacing(0.875),
                    '&:disabled': {
                        border: `1px solid ${palette.action.disabled}`,
                    },
                },
                outlinedPrimary: {
                    borderColor: palette.primary.main,
                },
                containedSuccess: {
                    borderColor: palette.success.main,
                    '&:hover': {
                        borderColor: palette.grey[200],
                        color: palette.success.main,
                    },
                },
                outlinedSuccess: {
                    borderColor: palette.success.main,
                },
                containedError: {
                    borderColor: palette.error.main,
                    '&:hover': {
                        borderColor: palette.grey[200],
                        color: palette.error.main,
                    },
                },
                outlinedError: {
                    borderColor: palette.error.main,
                },
                containedWarning: {
                    borderColor: palette.warning.main,
                    '&:hover': {
                        borderColor: palette.grey[200],
                        color: palette.warning.main,
                    },
                },
                outlinedWarning: {
                    borderColor: palette.warning.main,
                },
                containedInfo: {
                    borderColor: palette.info.main,
                    '&:hover': {
                        borderColor: palette.grey[200],
                        color: palette.info.main,
                    },
                },
                outlinedInfo: {
                    borderColor: palette.info.main,
                },
                text: {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: palette.text.primary,
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    margin: defaults.spacing(0, 'auto'),
                    maxWidth: 1340,
                    width: '100%',
                },
            },
        },
    },
});

export default MauiTheme;
