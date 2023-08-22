import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import LogoIcon from './LogoIcon';

export default {
    title: 'MAUI/Data Display/Icons/Logo',
    component: LogoIcon,
} as ComponentMeta<typeof LogoIcon>;

const Template: ComponentStory<typeof LogoIcon> = (args) => (
    <LogoIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const FontSize16rem = Template.bind({});
FontSize16rem.args = {
    style: { fontSize: '16rem' },
};
