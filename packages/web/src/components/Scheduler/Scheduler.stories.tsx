import React, { useState } from 'react';

import Scheduler from './Scheduler';

import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { mockEvents } from './mocks/mockEvents';
import { mockGroups } from './mocks/mockGroups';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { IEvent } from './SchedulerTypes';

export default {
    title: 'MAUI/Data Display/Scheduler',
    component: Scheduler,
} as Meta<typeof Scheduler>;

const DefaultTemplate: StoryFn<typeof Scheduler> = (args) => {
    const [shifts, setShifts] = useState<IEvent[]>(mockEvents);

    const handleEventUpdate = (
        eventId: string,
        newStartDate: Date,
        newEndDate: Date,
        newGroupId: string | undefined,
    ) => {
        const updatedShifts = shifts.map((shift) => {
            if (shift.id === eventId) {
                return {
                    ...shift,
                    startDate: newStartDate,
                    endDate: newEndDate,
                    // return "newGroupId" if it is NOT 'undefined'
                    ...(newGroupId !== undefined && { groupId: newGroupId }),
                };
            }

            return shift;
        });

        setShifts(updatedShifts);
    };

    return (
        <Scheduler
            {...args}
            events={shifts}
            onEventUpdate={handleEventUpdate}
        />
    );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
    defaultDate: new Date('2022-07-15T12:00:00-04:00'),
    groups: mockGroups,
    maxEventsPerDayInMonth: 2,
    onHiddenEventsClick: (date, eventIds) => {
        console.log({ date, eventIds });
    },
    onEventClick: console.log,
    onViewChange: console.log,
};

export const CustomDateTitleFormat = DefaultTemplate.bind({});
CustomDateTitleFormat.args = {
    ...Default.args,
    weekViewDateTitleFormat: (startDate, endDate) =>
        `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
};

export const CustomEventComponents = DefaultTemplate.bind({});
CustomEventComponents.args = {
    ...Default.args,
    renderWeekViewEvent: (props) => (
        <Box
            sx={{
                textAlign: 'center',
                border: '1px dashed red',
                padding: '0.5rem',
            }}
        >
            {props.event.id}
        </Box>
    ),
    renderMonthViewEvent: (props) => (
        <Box
            sx={{
                textAlign: 'center',
                border: '1px dashed red',
                padding: '0.5rem',
            }}
        >
            {props.event.id}
            <br />
            {props.event.groupId ?? 'No group'}
            <br />
            {props.event.startDate.toLocaleTimeString()}
            <br />
            {props.event.endDate.toLocaleTimeString()}
        </Box>
    ),
};

export const CustomDayTitleFormat = DefaultTemplate.bind({});
CustomDayTitleFormat.args = {
    ...Default.args,
    monthViewDayTitleFormat: (date) => date.toLocaleDateString(),
};

export const CustomHiddenEventsButton = DefaultTemplate.bind({});
CustomHiddenEventsButton.args = {
    ...Default.args,
    renderMonthViewHiddenEventsButton: (props) => (
        <ButtonBase
            {...props}
            sx={{
                ...props.sx,
                textAlign: 'center',
                border: '1px dashed red',
                padding: '0.5rem',
            }}
        >
            {props.children}
        </ButtonBase>
    ),
};
CustomHiddenEventsButton.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /month/i }));
};

export const DisabledEventDragging = DefaultTemplate.bind({});
DisabledEventDragging.args = {
    ...Default.args,
    isEventDraggable: () => false,
};

export const Header = DefaultTemplate.bind({});
Header.args = {
    ...Default.args,
    renderHeader: (props) => (
        <Typography
            {...props}
            variant='h3'
            sx={{
                textAlign: 'center',
                border: '1px dashed red',
                padding: 3,
            }}
        >
            Header!
        </Typography>
    ),
};

type Story = StoryObj<typeof Scheduler>;

export const SortedEvents: Story = {
    render: DefaultTemplate,
    args: {
        defaultDate: new Date('2022-07-15T12:00:00-04:00'),
        groups: mockGroups,
        refineEventsWeekView: (events: IEvent[]) =>
            events.sort(
                (a, b) => b.startDate.getTime() - a.startDate.getTime(),
            ),
        refineEventsMonthView: (events: IEvent[]) =>
            events.sort(
                (a, b) => b.startDate.getTime() - a.startDate.getTime(),
            ),
    },
};

export const NoData: Story = {
    render: DefaultTemplate,
    args: {
        defaultDate: new Date('2022-07-15T12:00:00-04:00'),
        groups: mockGroups,
        renderNoData: () => (
            <Typography
                variant='h3'
                sx={{
                    textAlign: 'center',
                    border: '1px dashed red',
                    padding: 3,
                }}
            >
                No data
            </Typography>
        ),
    },
};
