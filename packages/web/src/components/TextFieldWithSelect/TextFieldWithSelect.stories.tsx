import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import MenuItem from '@mui/material/MenuItem';

import TextFieldWithSelect from './TextFieldWithSelect';

export default {
    title: 'MAUI/Inputs/TextFieldWithSelect',
    component: TextFieldWithSelect,
} as ComponentMeta<typeof TextFieldWithSelect>;

const Template: ComponentStory<typeof TextFieldWithSelect> = (args) => (
    <TextFieldWithSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
    containerProps: {
        sx: {
            width: '20rem',
        },
    },
    textInputProps: {
        placeholder: 'Search...',
    },
    selectProps: {
        value: 1,
        children: ['Candidate', 'Facility', 'Job Order', 'Quote'].map(
            (item, index) => (
                <MenuItem value={index} key={index}>
                    {item}
                </MenuItem>
            ),
        ),
    },
};
