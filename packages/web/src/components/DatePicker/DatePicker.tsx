import React, { useState } from 'react';
import { DatePicker as MuiXDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerProps as MuiXDatePickerProps } from '@mui/x-date-pickers/DatePicker';

import TextField from '../TextField';

export type DatePickerProps<TDate> = MuiXDatePickerProps<TDate, TDate>;

const DatePicker = (props: DatePickerProps<Date>) => {
    const [value, setValue] = useState<Date | null>(null);

    return (
        <MuiXDatePicker
            {...props}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
    );
};

export default DatePicker;
