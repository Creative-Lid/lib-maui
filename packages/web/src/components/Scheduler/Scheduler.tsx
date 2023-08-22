import React, { useState, useMemo, ReactElement } from 'react';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { StackProps } from '@mui/material/Stack';

import {
    TEventRenderer,
    IEvent,
    IGroup,
    TOnEventClick,
    TOnEventUpdate,
    View,
} from './SchedulerTypes';
import WeekView from './templates/WeekView';
import MonthView, { MonthViewProps } from './templates/MonthView';

import {
    getDateTitleRangeForWeek,
    getFullMonthNames,
    getFirstDayOfWeek,
    getLastDayOfWeek,
    getYearRange,
} from '@creativelid/maui-utils/Date';
import Button from '../Button';

export interface SchedulerProps {
    /**
     * @default new Date()
     */
    defaultDate?: Date;
    /**
     * @default []
     */
    events?: IEvent[];
    /**
     * @default []
     */
    groups: IGroup[];
    /**
     * Callback will be called with new values of event
     * @callback onEventUpdate
     * @param {string} eventId
     * @param {Date} newStartDate
     * @param {Date} newEndDate
     * @param {string | undefined} newGroupId
     */
    onEventUpdate: TOnEventUpdate;
    /**
     * Callback will be called with an id of an event that has been clicked
     * @callback onEventUpdate
     * @param {string} eventId
     */
    onEventClick: TOnEventClick;
    /**
     * Specify the maximum number of events that can be displayed per day in the month view
     * @default undefined
     */
    maxEventsPerDayInMonth?: number;
    /**
     * Callback will be called when the user clicks the "More" button
     *
     * @callback onHiddenEventsClick
     * @param {Date} date
     * @param {IEvent['id'][]} eventIds
     * @returns {void}
     */
    onHiddenEventsClick?: (date: Date, eventIds: IEvent['id'][]) => void;
    /**
     * Label for the hidden events button
     * @type {string}
     * @default undefined
     */
    hiddenEventsLabel?: string;
    /**
     * An optional custom component to render the button that will be displayed
     * when there are more events than the specified maximum number of events
     * per day in the month view. It must has `onClick` prop.
     */
    renderMonthViewHiddenEventsButton?: MonthViewProps['renderHiddenEventsButton'];
    /**
     * Length of the range of years in the year selector in the month view
     * @type {number}
     * @default 5
     */
    yearRangeLength?: number;
    /**
     * An optional custom function to format the date time range in the week view
     * @argument {Date} startDate
     * @argument {Date} endDate
     * @returns {string}
     */
    weekViewDateTitleFormat?: (startDate: Date, endDate: Date) => string;
    /**
     * Allows to specify any CSS rules that will be applied to the container of the controls (date controls, view controls) in the scheduler header
     *
     * - [Details](https://mui.com/system/getting-started/the-sx-prop/)
     */
    controlsContainerSx?: StackProps['sx'];
    /**
     * Allow to pass in a custom component to render scheduler's events in week view
     *
     * @example ```jsx
     * renderWeekViewEvent={(props) => <div>{props.event.id}</div>}
     * ````
     */
    renderWeekViewEvent?: TEventRenderer;
    /**
     * Allow to pass in a custom component to render scheduler's events in month view
     *
     * @example ```jsx
     * renderMonthViewEvent={(props) => <div>{props.event.id}</div>}
     * ````
     */
    renderMonthViewEvent?: TEventRenderer;
    /**
     * Allows to format the title of the day in the month view
     * 
     * @param {Date} date date of the day
     * @return {string} formatted date
     * 
     * @example ```jsx
     * // returns "Jan 1" for the first day of January and respective date for other months
     * // and returns number of the day for the rest of the days
     * monthViewDayTitleFormat={
     * date.getDate() === 1
            ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : date.getDate().toString()
        }
     * ````
     */
    monthViewDayTitleFormat?: MonthViewProps['formatDayTitle'];
    /**
     * Callback to determine if the event is draggable
     *
     * @param {IEvent} event
     * @param {{ view: View }} context
     * @returns {boolean}
     */
    isEventDraggable?: (event: IEvent, context: { view: View }) => boolean;
    /**
     * Allows to pass in a custom component to render the header of the scheduler
     */
    renderHeader?: () => ReactElement;
    /**
     * Function will be called for each day before events are rendered in week view.
     * Events can be filtered/sorted/edited in this function.
     */
    refineEventsWeekView?: (events: IEvent[]) => IEvent[];
    /**
     * Function will be called for each day before events are rendered in month view.
     * Events can be filtered/sorted/edited in this function.
     */
    refineEventsMonthView?: (events: IEvent[]) => IEvent[];
    /**
     * Hides the body of the scheduler and renders the component returned by this function
     */
    renderNoData?: () => ReactElement;
    /**
     * Will be called with a new view name as an argument when the user changes the view
     * @param {View} view
     * @returns {void}
     */
    onViewChange?: (view: View) => void;
}

const Scheduler = (props: SchedulerProps) => {
    const {
        defaultDate = new Date(),
        events = [],
        groups = [],
        onEventUpdate,
        onEventClick,
        maxEventsPerDayInMonth,
        onHiddenEventsClick,
        hiddenEventsLabel,
        renderMonthViewHiddenEventsButton,
        yearRangeLength = 5,
        weekViewDateTitleFormat,
        controlsContainerSx,
        renderWeekViewEvent,
        renderMonthViewEvent,
        monthViewDayTitleFormat,
        isEventDraggable,
        renderHeader: RenderHeader,
        refineEventsWeekView,
        refineEventsMonthView,
        renderNoData,
        onViewChange = () => {},
    } = props;

    const [date, setDate] = useState<Date>(defaultDate);
    const [view, setView] = useState<View>('WEEK');

    /* Look-Up table for performance */
    const dateToEventsLookUp = useMemo(() => {
        const lookUp = new Map<string, IEvent[]>();

        for (const event of events) {
            const key = event.startDate.toDateString();

            if (lookUp.has(key)) {
                lookUp.get(key)?.push(event);
            } else {
                lookUp.set(key, [event]);
            }
        }

        return lookUp;
    }, [events]);

    const handleViewChange = (newView: View) => {
        if (newView === null) return;

        onViewChange(newView);

        setView(newView);
    };

    const handlePrevDate = () => {
        if (view === 'WEEK') {
            setDate(
                (prevDate) =>
                    new Date(prevDate.setDate(prevDate.getDate() - 7)),
            );
        }

        if (view === 'MONTH') {
            setDate(
                (prevDate) =>
                    new Date(prevDate.setMonth(prevDate.getMonth() - 1)),
            );
        }
    };

    const handleNextDate = () => {
        if (view === 'WEEK') {
            setDate(
                (prevDate) =>
                    new Date(prevDate.setDate(prevDate.getDate() + 7)),
            );
        }

        if (view === 'MONTH') {
            setDate(
                (prevDate) =>
                    new Date(prevDate.setMonth(prevDate.getMonth() + 1)),
            );
        }
    };

    const dateTitle = useMemo(() => {
        if (view === 'WEEK') {
            const title = weekViewDateTitleFormat
                ? weekViewDateTitleFormat(
                    getFirstDayOfWeek(date),
                    getLastDayOfWeek(date),
                )
                : getDateTitleRangeForWeek(date);

            return <Typography>{title}</Typography>;
        }

        if (view === 'MONTH') {
            return (
                <Stack direction='row' spacing='.5rem'>
                    <FormControl size='small' sx={{ minWidth: '8rem' }}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            label='Month'
                            value={date.getMonth()}
                            onChange={(event) =>
                                setDate(
                                    (prevDate) =>
                                        new Date(
                                            prevDate.setMonth(
                                                Number(event.target.value),
                                            ),
                                        ),
                                )
                            }
                        >
                            {getFullMonthNames().map((month, index) => (
                                <MenuItem key={index} value={index}>
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size='small'>
                        <InputLabel>Year</InputLabel>
                        <Select
                            label='Year'
                            value={date.getFullYear()}
                            onChange={(event) =>
                                setDate(
                                    (prevDate) =>
                                        new Date(
                                            prevDate.setFullYear(
                                                Number(event.target.value),
                                            ),
                                        ),
                                )
                            }
                        >
                            {getYearRange(
                                date.getFullYear(),
                                yearRangeLength,
                            ).map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            );
        }
    }, [view, date, weekViewDateTitleFormat, yearRangeLength]);

    return (
        <Stack spacing={1}>
            <Stack
                direction='row'
                justifyContent={RenderHeader ? 'space-between' : 'flex-end'}
            >
                {RenderHeader && <RenderHeader />}
                <Stack
                    direction='row'
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        ...controlsContainerSx,
                    }}
                >
                    <Stack direction='row' alignItems='center'>
                        <IconButton
                            onClick={handlePrevDate}
                            aria-label='previous date'
                        >
                            <NavigateNextIcon
                                sx={{ transform: 'rotate(180deg)' }}
                            />
                        </IconButton>
                        {dateTitle}
                        <IconButton
                            onClick={handleNextDate}
                            aria-label='next date'
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    </Stack>
                    <Button
                        variant='outlined'
                        key='Today'
                        size='small'
                        onClick={() => setDate(new Date())}
                    >
                        Today
                    </Button>
                    <ButtonGroup
                        color='primary'
                        aria-label='small primary button group'
                        variant='outlined'
                    >
                        <Button
                            key='Week'
                            size='small'
                            onClick={() => handleViewChange('WEEK')}
                            variant={view === 'WEEK' ? 'contained' : 'outlined'}
                        >
                            Week
                        </Button>
                        <Button
                            key='Month'
                            size='small'
                            onClick={() => handleViewChange('MONTH')}
                            variant={
                                view === 'MONTH' ? 'contained' : 'outlined'
                            }
                        >
                            Month
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Stack>

            <Box>
                {view === 'WEEK' && (
                    <WeekView
                        date={date}
                        groups={groups}
                        dateToEventsLookUp={dateToEventsLookUp}
                        onEventUpdate={onEventUpdate}
                        onEventClick={onEventClick}
                        renderEvent={renderWeekViewEvent}
                        isEventDraggable={isEventDraggable}
                        refineEventsPerDay={refineEventsWeekView}
                        renderNoData={renderNoData}
                    />
                )}

                {view === 'MONTH' && (
                    <MonthView
                        date={date}
                        groups={groups}
                        dateToEventsLookUp={dateToEventsLookUp}
                        onEventUpdate={onEventUpdate}
                        onEventClick={onEventClick}
                        maxEventsPerDay={maxEventsPerDayInMonth}
                        onHiddenEventsClick={onHiddenEventsClick}
                        hiddenEventsLabel={hiddenEventsLabel}
                        renderHiddenEventsButton={
                            renderMonthViewHiddenEventsButton
                        }
                        renderEvent={renderMonthViewEvent}
                        formatDayTitle={monthViewDayTitleFormat}
                        isEventDraggable={isEventDraggable}
                        refineEventsPerDay={refineEventsMonthView}
                        renderNoData={renderNoData}
                    />
                )}
            </Box>
        </Stack>
    );
};

export default Scheduler;
