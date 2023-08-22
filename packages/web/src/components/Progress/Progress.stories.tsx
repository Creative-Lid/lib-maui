import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Progress from '.';

export default {
    title: 'MUI/Feedback/Progress',
    component: Progress,
} as ComponentMeta<typeof Progress>;

export const Default: ComponentStory<typeof Progress> = () => <Progress />;
Default.storyName = 'Default (Primary Color)';
export const SecondaryColor: ComponentStory<typeof Progress> = () => (
    <Progress color='secondary' />
);
export const DisableShrink: ComponentStory<typeof Progress> = () => (
    <Progress disableShrink={true} />
);
export const Size80: ComponentStory<typeof Progress> = () => (
    <Progress size={80} />
);
export const Thickness15: ComponentStory<typeof Progress> = () => (
    <Progress thickness={15} />
);
