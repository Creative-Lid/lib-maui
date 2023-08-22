import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Divider from './Divider';

export default {
    argTypes: {
        marginBottom: {
            description:
                'Deault number `0rem` unless spacer boolean `true`, then default value `0.5rem`. Number passed will use `rem` instead of `px` for scalability.',
            defaultValue: 0,
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 0 },
            },
        },
        marginTop: {
            description:
                'Deault number `0rem` unless spacer boolean `true`, then default value `0.5rem`. Number passed will use `rem` instead of `px` for scalability.',
            defaultValue: 0,
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 0 },
            },
        },
        spacer: {
            description:
                'If `true`, the component is displayed as a spacer divider without a horizontal separator.',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
    },
    component: Divider,
    title: 'MUI/Data Display/Divider',
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
    <Divider {...args} />
);

export const Default = Template.bind({});

export const Spacer = Template.bind({});
Spacer.args = {
    id: 'divider-spacer',
    spacer: true,
};
