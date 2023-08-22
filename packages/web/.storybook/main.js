const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(mdx|js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
        '@storybook/preset-create-react-app',
        'storybook-addon-styled-component-theme/dist/preset',
        'storybook-addon-themes',
        'storybook-dark-mode',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    features: {
        emotionAlias: false,
        storyStoreV7: true, // https://storybook.js.org/docs/react/builders/webpack#code-splitting
    },

    typescript: {
        reactDocgen: 'react-docgen',
    },
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Storybook uses its own webpack config, so we need to merge our config with it
        // See https://storybook.js.org/docs/configurations/custom-webpack-config/

        // Add typescript loader to process TS-files from other packages (i.e. @maui/utils, @maui/styles)
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('ts-loader'),
                    options: {
                        reportFiles: ['../**/src/**/*.{ts,tsx}'],
                    },
                },
            ],
        });
        config.resolve.extensions.push('.ts', '.tsx');

        const newConfig = {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@emotion/core': toPath('node_modules/@emotion/react'),
                    'emotion-theming': toPath('node_modules/@emotion/react'),
                },
                plugins: [...config.resolve.plugins, new TsconfigPathsPlugin()],
            },
        };

        return newConfig;
    },
    docs: {
        autodocs: true,
    },
};
