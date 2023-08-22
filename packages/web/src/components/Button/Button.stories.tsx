import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from './Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default {
    argTypes: {
        color: {
            control: {
                type: 'select',
                options: [
                    'primary',
                    'secondary',
                    'success',
                    'danger',
                    'warning',
                    'info',
                    'light',
                    'dark',
                ],
            },
            description:
                'The color of the component. It supports both default and custom theme colors, which can be added as shown in the palette <a href="https://mui.com/material-ui/customization/palette/#adding-new-colors" target="_blank">customization guide</a>.',
            options: [
                'inherit',
                'error',
                'primary',
                'secondary',
                'info',
                'success',
                'warning',
            ],
            defaultValue: 'secondary',
            table: {
                defaultValue: { summary: 'secondary' },
            },
        },
        size: {
            description:
                'The size of the component. `small` is equivalent to the dense button styling.',
            options: ['small', 'medium', 'large'],
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' },
            },
        },
        variant: {
            description: 'The variant to use.',
            options: ['text', 'outlined', 'contained'],
            defaultValue: 'outlined',
            table: {
                defaultValue: { summary: 'outlined' },
            },
        },
    },
    component: Button,
    title: 'MUI/Inputs/Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
    <Container>
        <Grid container spacing={2} textAlign='center'>
            <Grid item sm={4} xs={6}>
                <Button {...args} />
            </Grid>

            <Grid item sm={4} xs={6}>
                <Button {...args} variant='text'>
                    Text
                </Button>
            </Grid>

            <Grid item sm={4} xs={6}>
                <Button {...args} disabled>
                    Disabled
                </Button>
            </Grid>

            <Grid item sm={4} xs={6}>
                <Button {...args} startIcon={<DeleteIcon />} />
            </Grid>

            <Grid item sm={4} xs={6}>
                <Button {...args} loading />
            </Grid>

            <Grid item sm={4} xs={6}>
                <Button {...args} loading loadingContent='Custom Loading...' />
            </Grid>
        </Grid>
    </Container>
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Secondary',
    variant: 'outlined',
};

export const Success = Template.bind({});
Success.args = {
    color: 'success',
    children: 'Ecommerce',
};

export const Error = Template.bind({});
Error.args = {
    color: 'error',
    children: 'Error',
};

export const Warning = Template.bind({});
Warning.args = {
    color: 'warning',
    children: 'Warning',
};

export const Info = Template.bind({});
Info.args = {
    color: 'info',
    children: 'Info',
};
