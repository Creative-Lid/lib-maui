import React, { useEffect, useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextField from '../TextField';

import TimePicker from './TimePicker';

import { isValid } from 'date-fns';

export default {
    title: 'MAUI/Inputs/TimePicker',
    component: TimePicker,
} as ComponentMeta<typeof TimePicker>;

const Template: ComponentStory<typeof TimePicker> = (args) => {
    const [date, setDate] = useState<Date | null>(
        new Date('2022-08-26T13:11:11'),
    );

    //simulate data change from backend
    useEffect(() => {
        setDate(new Date('2022-08-26T05:45:11'));
    }, []);

    const handleOnChange = (newDate) => {
        console.log(newDate);
        if (!isValid(newDate)) return;

        setDate(newDate);
    };

    return <TimePicker {...args} value={date} onChange={handleOnChange} />;
};

export const Default = Template.bind({});
Default.args = {
    minutesStep: 15,
    renderInput: (props) => <TextField autoComplete='off' {...props} />,
};
