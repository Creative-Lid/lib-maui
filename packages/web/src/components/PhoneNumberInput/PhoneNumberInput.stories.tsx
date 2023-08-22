import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import PhoneNumberInput from './PhoneNumberInput';

export default {
    title: 'MAUI/Inputs/PhoneNumberInput',
    component: PhoneNumberInput,
} as ComponentMeta<typeof PhoneNumberInput>;

const Template: ComponentStory<typeof PhoneNumberInput> = (args) => (
    <PhoneNumberInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    onChange: (value: string) => {
        console.log(value);
    },
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    onChange: (value: string) => {
        console.log(value);
    },
    placeholder: '(000) 000-0000',
};

const customMask = '123-456-7890';

export const CustomMask = Template.bind({});
CustomMask.args = {
    onChange: (value: string) => {
        console.log(value);
    },
    mask: customMask,
    placeholder: customMask,
};
