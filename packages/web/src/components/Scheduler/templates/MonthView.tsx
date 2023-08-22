import React, { ReactElement, useMemo } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import {
    TDateToEventLookUpTable,
    IEvent,
    IGroup,
    TOnEventClick,
    TOnEventUpdate,
    TEventRenderer,
    View,
} from '../SchedulerTypes';
import { getMonthByWeeks } from '@maui/utils/Date';
import DraggableEvent from '../../../hoc/DraggableEvent';
import TdEventDropZone from '../../../hoc/TdEventDropZone';
import MonthViewEvent from '../MonthViewEvent';

export interface MonthViewProps {
    date: Date;
    groups: IGroup[];
    dateToEventsLookUp: TDateToEventLookUpTable;
    onEventUpdate: TOnEventUpdate;
    onEventClick: TOnEventClick;
    maxEventsPerDay?: number;
    onHiddenEventsClick?: (date: Date, eventIds: IEvent['id'][]) => void;
    hiddenEventsLabel?: string;
    renderHiddenEventsButton?: (param: {
        children: ReactElement;
        onClick: () => void;
    }) => ReactElement;
    renderEvent?: TEventRenderer;
    formatDayTitle?: (date: Date) => string;
    isEventDraggable?: (event: IEvent, context: { view: View }) => boolean;
    refineEventsPerDay?: (events: IEvent[]) => IEvent[];
    renderNoData?: () => ReactElement;
}

const MonthView = (props: MonthViewProps) => {
    const {
        date,
        groups,
        dateToEventsLookUp,
        onEventUpdate,
        onEventClick,
        maxEventsPerDay,
        onHiddenEventsClick = () => {
            return;
        },
        hiddenEventsLabel,
        renderHiddenEventsButton: HiddenEventsButton,
        renderEvent: RenderEvent,
        formatDayTitle,
        isEventDraggable = () => true,
        refineEventsPerDay,
        renderNoData: NoData,
    } = props;

    const monthWeeks = useMemo(() => getMonthByWeeks(date), [date]);

    const renderEvents = (day: Date) => {
        const dayStart = new Date(day);
        dayStart.setHours(0, 0, 0, 0);
        const dayStartStr = dayStart.toDateString();

        const eventsToRender: ReactElement<Event>[] = [];

        if (dateToEventsLookUp.has(dayStartStr)) {
            /* Non-null assertion operator (!) is used below, but it is safe because we checked if the key exists in the map above */
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            let dayEvents = dateToEventsLookUp.get(dayStartStr)!;

            if (refineEventsPerDay) {
                dayEvents = refineEventsPerDay(dayEvents);
            }

            dayEvents.forEach((event) => {
                if (
                    maxEventsPerDay &&
                    maxEventsPerDay <= eventsToRender.length
                ) {
                    return;
                }

                let eventElement = RenderEvent ? (
                    <RenderEvent event={event} />
                ) : (
                    <MonthViewEvent
                        event={event}
                        groups={groups}
                        onEventClick={onEventClick}
                        key={event.id}
                    />
                );

                if (isEventDraggable(event, { view: 'MONTH' })) {
                    eventElement = (
                        <DraggableEvent
                            id={event.id}
                            startDate={event.startDate}
                            endDate={event.endDate}
                            key={event.id}
                        >
                            {eventElement}
                        </DraggableEvent>
                    );
                }

                eventsToRender.push(eventElement);
            });

            if (maxEventsPerDay && maxEventsPerDay < dayEvents.length) {
                const defaultHiddenEventsButtonChildren = (
                    <Typography variant='caption'>
                        {hiddenEventsLabel ??
                            `+${dayEvents.length - maxEventsPerDay} more`}
                    </Typography>
                );

                const onClick = () =>
                    onHiddenEventsClick(
                        day,
                        dayEvents.map((event) => event.id),
                    );

                const hiddenEventsButton = HiddenEventsButton ? (
                    <HiddenEventsButton onClick={onClick}>
                        {defaultHiddenEventsButtonChildren}
                    </HiddenEventsButton>
                ) : (
                    <Button
                        key='hidden-events-button'
                        size='small'
                        variant='text'
                        onClick={onClick}
                    >
                        {defaultHiddenEventsButtonChildren}
                    </Button>
                );

                eventsToRender.push(hiddenEventsButton);
            }
        }

        return eventsToRender;
    };

    return (
        <TableContainer>
            <Table
                aria-label='month view'
                stickyHeader
                sx={{ borderCollapse: 'collapse' }}
            >
                <TableHead>
                    <TableRow>
                        {monthWeeks[0].map((day) => (
                            <TableCell
                                key={day.getTime()}
                                width='14.28%'
                                sx={{
                                    backgroundColor: 'grey.50',
                                    border: '1px solid',
                                    borderColor: 'grey.A100',
                                }}
                            >
                                <Typography
                                    variant='body2'
                                    align='center'
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    {day.toLocaleDateString(undefined, {
                                        weekday: 'short',
                                    })}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {!NoData && (
                    <TableBody>
                        {monthWeeks.map((week) => (
                            <TableRow key={week[0].getTime()}>
                                {week.map((day) => (
                                    <TdEventDropZone
                                        key={day.getTime()}
                                        cellDate={day}
                                        onEventUpdate={onEventUpdate}
                                        highlight={
                                            day.toDateString() ===
                                            new Date().toDateString()
                                        } // Is the date today?
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'grey.A100',
                                        }}
                                    >
                                        <Stack
                                            spacing={1}
                                            minHeight={(theme) =>
                                                theme.spacing(15)
                                            }
                                        >
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    /* Make color of day-title "muted", if it is not current month */
                                                    color:
                                                        day.getMonth() ===
                                                        monthWeeks[2][0].getMonth()
                                                            ? 'text.primary'
                                                            : 'text.disabled',
                                                }}
                                            >
                                                {formatDayTitle
                                                    ? formatDayTitle(day)
                                                    : day.getDate() === 1
                                                        ? day.toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                month: 'short',
                                                                day: 'numeric',
                                                            },
                                                        )
                                                        : day.getDate().toString()}
                                            </Typography>
                                            {renderEvents(day)}
                                        </Stack>
                                    </TdEventDropZone>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
            {NoData && <NoData />}
        </TableContainer>
    );
};

export default MonthView;
