import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { MauiUiTheme } from '@creativelid/maui-styles';
import { MauiUiBootstrapTheme } from '@creativelid/maui-styles';
import { Theme } from 'storybook-addon-themes/dist/models/Theme';
import CustomMDXTemplate from './custom-mdx-template';
import { ScrollToTop } from '../src';

const themes = { 'MAUI': MauiUiTheme, Bootstrap: MauiUiBootstrapTheme };
const currentTheme = localStorage.getItem('currentTheme');
const theme = currentTheme ? themes[currentTheme] : MauiUiTheme;

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    darkMode: {
        current: 'light',
    },
    options: {
        storySort: {
            order: ['Intro', 'Pages', 'Components'],
        },
    },
    themes: {
        default: currentTheme || 'MAUI',
        list: [
            { name: 'MAUI', color: '#333366' },
            { name: 'Bootstrap', color: '#3b5998' },
        ],
        onChange: (theme: Theme) => {
            localStorage.setItem('currentTheme', theme.name);
            location.reload();
        },
    },
    docs: {
        // page: CustomMDXTemplate,
        // template: CustomMDXTemplate,
        // container: DocsContainer,
    },
};

export const decorators = [
    (Story: React.ElementType) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
                {/* <ScrollToTop /> */}
                <Story />
            </ThemeProvider>
        </LocalizationProvider>
    ),
];
