import { ComponentStory, ComponentMeta } from '@storybook/react';
import DatePicker from './DatePicker';

export default {
    title: 'MAUI/Inputs/DatePicker',
    component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => (
    <DatePicker {...args} />
);

export const Default = Template.bind({});
