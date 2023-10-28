import React from 'react';

import { StoryFn, Meta } from '@storybook/react';
import List from './List';

export default {
    argTypes: {},
    component: List,
    title: 'MUI/Data Display/List',
} as Meta<typeof List>;

const Template: StoryFn<typeof List> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {};
