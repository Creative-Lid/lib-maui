import React, { PropsWithChildren, useMemo } from 'react';

import Stack, { StackProps } from '@mui/material/Stack';
import MenuList, { MenuListProps } from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

export interface DigitalClockPikerProps extends PropsWithChildren {
    minutesStep?: number;
    value?: Date;
    onChange?: (date: Date | null) => void;
    componentsProps?: {
        containerProps?: StackProps;
        hourContainerProps?: MenuListProps;
        minuteContainerProps?: MenuListProps;
        ampmContainerProps?: MenuListProps;
    };
}

const DigitalClockPicker = (props: DigitalClockPikerProps) => {
    const {
        minutesStep = 1,
        value = new Date(),
        onChange,
        componentsProps,
    } = props;

    const isAM = value.getHours() < 12;

    const hoursList = useMemo(
        () => [
            { label: '12', value: 0 },
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6', value: 6 },
            { label: '7', value: 7 },
            { label: '8', value: 8 },
            { label: '9', value: 9 },
            { label: '10', value: 10 },
            { label: '11', value: 11 },
        ],
        [],
    );

    const minutesList = useMemo(() => {
        const minutes = [];

        for (let i = 0; i < 60; i += minutesStep) {
            minutes.push({
                label: i < 10 ? `0${i}` : i,
                value: i,
            });
        }

        return minutes;
    }, [minutesStep]);

    const handleHourClick = (hour: number) => {
        const newDate = new Date(value);
        newDate.setHours(isAM ? hour : hour + 12);
        if (onChange) onChange(newDate);
    };

    const handleMinuteClick = (minute: number) => {
        const newDate = new Date(value);
        newDate.setMinutes(minute);
        if (onChange) onChange(newDate);
    };

    const handleAM = () => {
        if (isAM) return;

        const newDate = new Date(value);
        newDate.setHours(newDate.getHours() - 12);
        if (onChange) onChange(newDate);
    };

    const handlePM = () => {
        if (!isAM) return;

        const newDate = new Date(value);
        newDate.setHours(newDate.getHours() + 12);
        if (onChange) onChange(newDate);
    };

    return (
        <Stack
            direction='row'
            {...componentsProps?.containerProps}
            sx={{
                maxHeight: 200,
                ...componentsProps?.containerProps?.sx,
            }}
        >
            <MenuList
                aria-label='hours list'
                {...componentsProps?.hourContainerProps}
                sx={{
                    overflow: 'auto',
                    ...componentsProps?.hourContainerProps?.sx,
                }}
            >
                {hoursList.map((hours) => (
                    <MenuItem
                        key={hours.label}
                        onClick={() => handleHourClick(hours.value)}
                        sx={{ justifyContent: 'center' }}
                        selected={
                            hours.value ===
                            (isAM ? value?.getHours() : value.getHours() - 12)
                        }
                    >
                        {hours.label}
                    </MenuItem>
                ))}
            </MenuList>
            <MenuList
                aria-label='minutes list'
                {...componentsProps?.minuteContainerProps}
                sx={{
                    overflow: 'auto',
                    ...componentsProps?.minuteContainerProps?.sx,
                }}
            >
                {minutesList.map((minutes) => (
                    <MenuItem
                        key={minutes.label}
                        onClick={() => handleMinuteClick(minutes.value)}
                        sx={{ justifyContent: 'center' }}
                        selected={minutes.value === value.getMinutes()}
                    >
                        {minutes.label}
                    </MenuItem>
                ))}
            </MenuList>
            <MenuList
                aria-label='am/pm list'
                {...componentsProps?.ampmContainerProps}
            >
                <MenuItem selected={value.getHours() < 12} onClick={handleAM}>
                    am
                </MenuItem>
                <MenuItem selected={!isAM} onClick={handlePM}>
                    pm
                </MenuItem>
            </MenuList>
        </Stack>
    );
};

export default DigitalClockPicker;
