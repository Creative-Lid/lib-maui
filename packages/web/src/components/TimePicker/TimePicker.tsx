import React from 'react';

import {
    TimePicker as MuiTimePicker,
    TimePickerProps as MuiTimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import { MenuListProps } from '@mui/material/MenuList';
import { StackProps } from '@mui/material/Stack';

import DigitalClockPicker from './DigitalClockPicker';

export interface TimePickerProps extends MuiTimePickerProps<Date, Date> {
    dialogComponentProps?: {
        /**
         * Demos:
         *
         * - [Box](https://mui.com/material-ui/react-box/)
         *
         * API:
         *
         * - [Box API](https://mui.com/material-ui/api/box/)
         */
        containerProps?: StackProps;
        /**
         * API:
         *
         * - [MenuList API](https://mui.com/material-ui/api/menu-list/)
         * - inherits [List API](https://mui.com/material-ui/api/list/)
         */
        hourContainerProps?: MenuListProps;
        /**
         * API:
         *
         * - [MenuList API](https://mui.com/material-ui/api/menu-list/)
         * - inherits [List API](https://mui.com/material-ui/api/list/)
         */
        minuteContainerProps?: MenuListProps;
        /**
         * API:
         *
         * - [MenuList API](https://mui.com/material-ui/api/menu-list/)
         * - inherits [List API](https://mui.com/material-ui/api/list/)
         */
        ampmContainerProps?: MenuListProps;
    };
}

const TimePicker = (props: TimePickerProps) => {
    const {
        minutesStep,
        value,
        onChange,
        componentsProps,
        dialogComponentProps,
    } = props;

    return (
        <MuiTimePicker
            {...props}
            componentsProps={{
                ...componentsProps,
                paperContent: {
                    minutesStep,
                    value,
                    onChange,
                    componentsProps: dialogComponentProps,
                    ...componentsProps?.paperContent,
                },
            }}
            components={{
                PaperContent: DigitalClockPicker,
                ...props.components,
            }}
        />
    );
};

export default TimePicker;
