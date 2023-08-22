import React, { useMemo, ReactElement } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { getWeek } from '@maui/utils/Date';
import {
    IGroup,
    TOnEventClick,
    TOnEventUpdate,
    TDateToEventLookUpTable,
    IEvent,
    TEventRenderer,
    View,
} from '../SchedulerTypes';
import DraggableEvent from '../../../hoc/DraggableEvent';
import TdEventDropZone from '../../../hoc/TdEventDropZone';
import WeekViewEvent from '../WeekViewEvent';

export interface WeekViewProps {
    date: Date;
    groups: IGroup[];
    dateToEventsLookUp: TDateToEventLookUpTable;
    onEventUpdate: TOnEventUpdate;
    onEventClick: TOnEventClick;
    renderEvent?: TEventRenderer;
    isEventDraggable?: (event: IEvent, context: { view: View }) => boolean;
    refineEventsPerDay?: (events: IEvent[]) => IEvent[];
    renderNoData?: () => ReactElement;
}

const WeekView = (props: WeekViewProps) => {
    const {
        date,
        groups,
        dateToEventsLookUp,
        onEventUpdate,
        onEventClick,
        renderEvent: RenderEvent,
        isEventDraggable = () => true,
        refineEventsPerDay,
        renderNoData: NoData,
    } = props;

    const week = useMemo(() => getWeek(date), [date]);

    const renderEvents = (day: Date, groupId: IEvent['groupId']) => {
        const dayStart = new Date(day);
        dayStart.setHours(0, 0, 0, 0);
        const dayStartDateString = dayStart.toDateString();

        const eventsToRender: ReactElement<Event>[] = [];

        if (dateToEventsLookUp.has(dayStartDateString)) {
            // no-null assertion is used because TS doesn't understand that we check if the key exists
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            let events = dateToEventsLookUp.get(dayStartDateString)!;

            if (refineEventsPerDay) {
                events = refineEventsPerDay(events);
            }

            events.forEach((event) => {
                if (groupId === event.groupId) {
                    let eventElement = RenderEvent ? (
                        <RenderEvent event={event} />
                    ) : (
                        <WeekViewEvent
                            event={event}
                            onEventClick={onEventClick}
                            key={event.id}
                        />
                    );

                    if (isEventDraggable(event, { view: 'WEEK' })) {
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
                }
            });
        }

        return eventsToRender;
    };

    return (
        <TableContainer>
            <Table
                aria-label='week view'
                stickyHeader
                sx={{ borderCollapse: 'collapse' }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            width='16%'
                            sx={{
                                backgroundColor: 'grey.50',
                                border: '1px solid',
                                borderColor: 'grey.A100',
                            }}
                        />
                        {week.map((day) => (
                            <TableCell
                                key={day.getTime()}
                                align='center'
                                width='12%'
                                sx={{
                                    backgroundColor: 'grey.50',
                                    border: '1px solid',
                                    borderColor: 'grey.A100',
                                }}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{ fontWeight: 'fontWeightBold' }}
                                >
                                    {day.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        day: 'numeric',
                                    })}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {!NoData && (
                    <TableBody>
                        {groups.map((group) => (
                            <TableRow key={group.id}>
                                <TableCell
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'grey.A100',
                                    }}
                                >
                                    {group.url ? (
                                        <Link
                                            href={group.url}
                                            target='_blank'
                                            variant='body2'
                                            underline='hover'
                                        >
                                            {group.name}
                                        </Link>
                                    ) : (
                                        <Typography variant='body2'>
                                            {group.name}
                                        </Typography>
                                    )}
                                </TableCell>
                                {week.map((day) => (
                                    <TdEventDropZone
                                        key={day.getTime()}
                                        cellDate={day}
                                        groupId={group.id}
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
                                        <Box
                                            component='div'
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 0.5, // same as theme.spacing(0.5)
                                            }}
                                        >
                                            {renderEvents(day, group.id)}
                                        </Box>
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

export default WeekView;
