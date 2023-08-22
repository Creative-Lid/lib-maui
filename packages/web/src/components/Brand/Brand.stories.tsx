import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Brand from './Brand';

export default {
    title: 'MAUI/Data Display/Brand',
    component: Brand,
} as ComponentMeta<typeof Brand>;

const Template: ComponentStory<typeof Brand> = (args) => (
    <Brand {...args}>Button</Brand>
);

export const Primary = Template.bind({});

Primary.args = {
    width: 150,
};
