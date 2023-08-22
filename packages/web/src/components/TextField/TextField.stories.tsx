import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import Person from '@mui/icons-material/Person';

import { StoryFn, StoryObj, Meta } from '@storybook/react';
import TextField from './TextField';

export default {
    argTypes: {
        color: {
            defaultValue: 'primary',
            description:
                'The color of the component. It supports both default and custom theme colors, which can be added as shown in the <a href="https://mui.com/material-ui/customization/palette/#adding-new-colors" target="_blank">palette customization guide</a>.',
            options: [
                'primary',
                'secondary',
                'error',
                'info',
                'success',
                'warning',
            ],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            },
            control: {
                type: 'select',
            },
        },
        defaultValue: {
            type: { name: 'string', required: false },
            defaultValue: 'Hello World',
            description: 'Set a `defaultValue` for the input.',
            table: {
                type: { summary: 'string' },
            },
            control: {
                type: 'text',
            },
        },
        error: {
            description:
                'If `true`, the input will be outlined and show error state.',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        focused: {
            description:
                'If `true`, the component is displayed in focused state.',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        hiddenLabel: {
            description:
                'If `true`, the label is hidden. This is used to increase density for a `FilledInput`. Be sure to add `aria-label` to the `input` element.',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        id: {
            type: { name: 'string', required: false },
            defaultValue: 'outlined-basic',
            description:
                'The id of the `input` element. Use this prop to make `label` and `helperText` accessible for screen readers.',
            table: {
                type: { summary: 'string' },
            },
            control: {
                type: 'text',
            },
        },
        label: {
            defaultValue: 'Outlined',
            control: { type: 'text' },
        },
        labelPosition: {
            defaultValue: 'top',
            description:
                'The position for non-floating labels. Deault value `top`.',
            options: ['top', 'left'],
            control: { type: 'select' },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top' },
            },
        },
        margin: {
            defaultValue: 'none',
            description:
                'If `dense` or `normal`, will adjust vertical spacing of this and contained components.',
            options: ['dense', 'none', 'normal'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'none' },
            },
            control: {
                type: 'select',
            },
        },
        variant: {
            defaultValue: 'outlined',
            description: 'The variant to use.',
            options: ['filled', 'outlined', 'standard'],
            control: { type: 'select' },
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'outlined' },
            },
        },
        fullWidth: {
            description:
                'If `true`, the input will take up the full width of its container.',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
    },
    component: TextField,
    title: 'MUI/Inputs/TextField',
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Non Floating Label',
};

export const Filled = Template.bind({});
Filled.args = {
    id: 'filled-basic',
    label: 'Filled',
    variant: 'filled',
};

export const Standard = Template.bind({});
Standard.args = {
    id: 'standard-basic',
    label: 'Standard',
    variant: 'standard',
};

export const FloatingLabel = Template.bind({});
FloatingLabel.args = {
    floatingLabel: true,
    label: 'Floating Label',
};

export const UsernameInputExample = Template.bind({});
UsernameInputExample.args = {
    variant: 'outlined',
    placeholder: 'Username',
    InputProps: {
        startAdornment: (
            <InputAdornment position='start'>
                <Person />
            </InputAdornment>
        ),
    },
};
UsernameInputExample.argTypes = {
    defaultValue: {
        defaultValue: null,
    },
    label: {
        defaultValue: null,
    },
};

type Story = StoryObj<typeof TextField>;

export const Required: Story = {
    args: {
        label: 'Required Input',
        required: true,
        floatingLabel: false,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Input',
        disabled: true,
        floatingLabel: false,
    },
};
