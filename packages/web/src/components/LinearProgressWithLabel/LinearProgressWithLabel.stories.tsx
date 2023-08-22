import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import LinearProgressWithLabel from './LinearProgressWithLabel';

export default {
    title: 'MUI/Feedback/LinearProgressWithLabel',
    component: LinearProgressWithLabel,
    argTypes: {
        color: {
            control: {
                type: 'select',
                options: [
                    'primary',
                    'secondary',
                    'success',
                    'error',
                    'info',
                    'warning',
                ],
            },
        },
    },
} as ComponentMeta<typeof LinearProgressWithLabel>;

const Template: ComponentStory<typeof LinearProgressWithLabel> = (args) => (
    <LinearProgressWithLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: 10,
};

export const Primary = Template.bind({});
Primary.args = {
    value: 20,
    color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    value: 30,
    color: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
    value: 40,
    color: 'success',
};

export const Info = Template.bind({});
Info.args = {
    value: 50,
    color: 'info',
};

export const Warning = Template.bind({});
Warning.args = {
    value: 60,
    color: 'warning',
};

export const Error = Template.bind({});
Error.args = {
    value: 70,
    color: 'error',
};
