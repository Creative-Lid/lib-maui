import React from 'react';

import { createTheme } from '@mui/material/styles';
import common from '@mui/material/colors/common';

import 'typeface-noto-sans';

import { BootstrapPalette as palette } from './BootstrapPalette';
import Paper from './variants/Paper';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

let MauiBootstrapTheme = createTheme({
    shape: {
        borderRadius: 4,
    },
    typography: {
        fontFamily: 'Roboto,Helvetica Neue,Helvetica,Arial,sans-serif', // font-family is taken from Insight and Trio
        /* Declaration of `fontSize` should be in the first `createTheme` call
         * because it is where MUI calculates all the other font sizes for the theme
         */
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            color: palette.text.primary,
            fontSize: '3.375rem',
            fontWeight: 400,
        },
        h2: {
            color: palette.text.primary,
            fontSize: '3rem',
            fontWeight: 400,
        },
        h3: {
            color: palette.text.primary,
            fontSize: '2.25rem',
            fontWeight: 400,
        },
        h4: {
            color: palette.text.primary,
            fontSize: '1.5rem',
            fontWeight: 400,
        },
        h5: {
            color: palette.text.primary,
            fontSize: '1.25rem',
            fontWeight: 400,
        },
        h6: {
            color: palette.text.primary,
            fontWeight: 400,
        },
        subtitle1: {
            color: palette.text.primary,
            fontWeight: 400,
        },
        subtitle2: {
            color: palette.text.primary,
            fontWeight: 400,
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
            fontWeight: 400,
        },
        button: {
            color: palette.text.primary,
            fontSize: '1rem',
            fontWeight: 400,
        },
        overline: {
            color: palette.text.primary,
            fontSize: '0.625rem',
            fontWeight: 400,
            lineHeight: '0.75rem',
        },
    },
    /* Declaration of the palette should be in the first `createTheme` call
     * because it is where MUI fills in the missing colors based on provided palette
     */
    palette: { ...palette },
});

MauiBootstrapTheme = createTheme(MauiBootstrapTheme, {
    components: {
        MuiAlert: {
            defaultProps: {
                iconMapping: {
                    error: <ErrorIcon />,
                    info: <InfoIcon />,
                    success: <CheckCircleIcon />,
                    warning: <WarningIcon />,
                },
            },
            styleOverrides: {
                root: {
                    overflow: 'hidden',
                    padding: 0,
                    '& .MuiAlert-action': {
                        marginRight: 0,
                    },
                },
                standardError: {
                    border: `1px solid ${palette.error.main}`,
                    '& .MuiAlert-icon': {
                        backgroundColor: palette.error.main,
                        color: palette.common.white,
                    },
                    '& .MuiAlert-message': {
                        color: palette.error.main,
                    },
                },
                standardInfo: {
                    border: `1px solid ${palette.info.main}`,
                    '& .MuiAlert-icon': {
                        backgroundColor: palette.info.main,
                        color: palette.common.white,
                    },
                    '& .MuiAlert-message': {
                        color: palette.info.main,
                    },
                },
                standardSuccess: {
                    border: `1px solid ${palette.success.main}`,
                    '& .MuiAlert-icon': {
                        backgroundColor: palette.success.main,
                        color: palette.common.white,
                    },
                    '& .MuiAlert-message': {
                        color: palette.success.main,
                    },
                },
                standardWarning: {
                    border: `1px solid ${palette.warning.main}`,
                    '& .MuiAlert-icon': {
                        backgroundColor: palette.warning.main,
                        color: palette.common.white,
                    },
                    '& .MuiAlert-message': {
                        color: palette.warning.main,
                    },
                },
                icon: {
                    alignItems: 'center',
                    margin: MauiBootstrapTheme.spacing(0),
                    padding: MauiBootstrapTheme.spacing(0, 2),
                },
                message: {
                    margin: MauiBootstrapTheme.spacing(0.75, 2),
                },
                filled: {
                    color: palette.common.white,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: common.white,
                    color: palette.text.primary,
                },
            },
        },
        MuiAutocomplete: {
            defaultProps: {
                componentsProps: {
                    /* should be a way to override the MuiAutocomplete-paper
                       styles via the styleOverrides and not defaultProps,
                       but wasn't able to target correct DOM node */
                    paper: {
                        sx: {
                            borderRadius: '4px',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: '#DFDFDF', // should be replaced with theme/pallette value, when the theme is ready
                            boxShadow: 'none',
                            backgroundColor: '#FCFCFC', // should be replaced with theme/pallette value, when the theme is ready
                        },
                    },
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableFocusRipple: true,
                disableRipple: true,
                disableTouchRipple: true,
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',

                    /* variant='contained' color='secondary' */
                    '&.MuiButton-containedSecondary': {
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: palette.grey[300],
                        backgroundColor: palette.grey[50],
                    },
                    '&.MuiButton-containedSecondary:hover': {
                        backgroundColor: palette.grey[100],
                    },
                    '&.MuiButton-containedSecondary:active': {
                        backgroundColor: palette.grey[200],
                    },
                    '&.MuiButton-textNeutral': {
                        color: palette.neutral.contrastText,
                    },
                    '&.Mui-disabled.MuiButton-containedPrimary': {
                        color: palette.grey[900],
                        backgroundColor: palette.grey[300],
                    },

                    /* variant='outlined' color='secondary' */
                    '&.MuiButton-outlinedSecondary': {
                        borderColor: palette.grey[500],
                        color: palette.grey.A700,
                    },
                    '&.MuiButton-outlinedSecondary:hover': {
                        borderColor: palette.grey[900],
                        backgroundColor: palette.grey[50],
                    },
                    '&.MuiButton-outlinedSecondary.Mui-disabled': {
                        borderColor: palette.grey[300],
                        color: palette.grey[500],
                    },

                    /* variant='text' color='secondary' */
                    '&.MuiButton-textSecondary': {
                        color: palette.grey.A700,
                    },
                    '&.MuiButton-textSecondary:hover': {
                        backgroundColor: palette.grey[50],
                    },
                    '&.MuiButton-textSecondary.Mui-disabled': {
                        color: palette.grey[500],
                    },
                },
                containedInherit: {
                    backgroundColor: palette.neutral.main,
                    color: palette.neutral.contrastText,
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
            styleOverrides: {
                root: {
                    '&.MuiToggleButton-error': {
                        color: palette.error.main,
                    },
                    '&.MuiToggleButton-info': {
                        color: palette.info.main,
                    },
                    '&.MuiToggleButton-primary': {
                        color: palette.primary.main,
                    },
                    '&.MuiToggleButton-secondary': {
                        color: palette.secondary.main,
                    },
                    '&.MuiToggleButton-success': {
                        color: palette.success.main,
                    },
                    '&.MuiToggleButton-warning': {
                        color: palette.warning.main,
                    },
                },
            },
        },
        MuiButtonGroup: {
            defaultProps: {
                variant: 'contained',
                disableElevation: true,
                disableFocusRipple: true,
                disableRipple: true,
            },
            styleOverrides: {
                grouped: {
                    '&.MuiButtonGroup-grouped.MuiButton-containedSecondary:not(:last-of-type)':
                        {
                            borderRight: 'none',
                            borderColor: palette.grey[300],
                        },
                },
            },
        },
        MuiCard: {
            defaultProps: {
                variant: 'outlined',
            },
            styleOverrides: {
                root: {
                    borderColor: palette.grey[300],
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '1rem 1.5rem',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '1rem 1.5rem',
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    backgroundColor: palette.grey[50],
                    borderBottom: `1px solid ${palette.grey[300]}`,
                },
                title: {
                    color: palette.common.black,
                },
            },
        },
        MuiCheckbox: {
            defaultProps: {
                checkedIcon: <CheckBoxOutlinedIcon />,
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 3,
                },
            },
        },
        MuiStack: {
            styleOverrides: {
                root: {
                    '&#maui-grid-wrapper': {
                        '& [class*=ag-theme-]': {
                            fontFamily:
                                'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif',
                            fontSize: 13,
                        },
                        '& .ag-header-cell-resize': {
                            '&::after': {
                                backgroundColor: 'transparent',
                            },
                        },
                        '& .ag-theme-alpine, & .ag-theme-alpine-dark': {
                            '& .ag-full-width-row': {
                                '& .ag-cell-wrapper': {
                                    '&.ag-row-group': {
                                        padding: '0 10px',
                                    },
                                },
                            },
                            '& .ag-row, & .ag-header-row, .ag-header-row-column-filter':
                                {
                                    fontFamily:
                                        'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif',
                                    fontSize: 13,
                                    '& .ag-cell, & .ag-header-cell, .ag-header-group-cell':
                                        {
                                            alignItems: 'center',
                                            padding: '0 10px',
                                            borderRight: `1px solid ${palette.neutral.main}`,
                                            '&.ag-cell-focus.ag-cell-range-single-cell, &.ag-cell-range-selected:not(.ag-cell-range-single-cell).ag-cell-range-right':
                                                {
                                                    borderRightColor:
                                                        'var(--ag-range-selection-border-color)',
                                                },
                                        },
                                    '& .ag-header-cell': {
                                        backgroundColor: palette.common.white,
                                        '& .ag-header-cell-text': {
                                            fontWeight: 400,
                                        },
                                    },
                                },
                        },
                    },
                    '& #gridQuickFilters': {
                        marginBottom: MauiBootstrapTheme.spacing(-1.5),
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: palette.grey[300],
                },
            },
        },
        MuiPaper: {
            variants: Paper,
        },
        MuiSelect: {
            defaultProps: {
                size: 'small',
                MenuProps: {
                    PaperProps: {
                        elevation: 0,
                        sx: {
                            borderRadius: 0,
                            border: `1px solid ${palette.grey[900]}`,
                            '& .MuiMenuItem-root': {
                                // the space, between the "&" and the dot is important
                                padding: '0 1rem',
                            },
                            '& .MuiMenuItem-root:hover': {
                                // the space, between the "&" and the dot is important
                                color: palette.common.white,
                                backgroundColor: palette.grey[900],
                            },
                        },
                    },
                    MenuListProps: {
                        sx: {
                            padding: 0,
                        },
                    },
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiToggleButton: {
            defaultProps: {
                color: 'standard',
                disableFocusRipple: true,
                disableRipple: true,
                disableTouchRipple: true,
            },
            styleOverrides: {
                root: {
                    border: 0,
                    borderRadius: 0,
                    padding: MauiBootstrapTheme.spacing(0, 0.75),
                    '&:not(:first-of-type)::before': {
                        padding: MauiBootstrapTheme.spacing(0, 0.75),
                        color: palette.common.black,
                    },
                    '&.Mui-selected': {
                        '&.grid--filters': {
                            backgroundColor: 'transparent',
                            borderBottomWidth: 3,
                            borderBottomStyle: 'solid',
                            fontWeight: 700,
                            paddingBottom: MauiBootstrapTheme.spacing(1.25),
                        },
                    },
                    '&:hover, &.Mui-selected:hover': {
                        backgroundColor: 'transparent',
                    },
                },
                sizeSmall: {
                    textTransform: 'unset',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    margin: MauiBootstrapTheme.spacing(0, 'auto'),
                    maxWidth: 1340,
                    width: '100%',
                },
            },
        },
    },
});

export default MauiBootstrapTheme;
