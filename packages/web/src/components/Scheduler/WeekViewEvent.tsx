import React from 'react';

import Typography from '@mui/material/Typography';

import { formatTimeRange } from '@maui/utils/Date';

import EventContainer from '../../hoc/EventContainer';
import { IEvent, TOnEventClick } from './SchedulerTypes';

export interface WeekViewEventProps {
    event: IEvent;
    onEventClick: TOnEventClick;
}

const Event = (props: WeekViewEventProps) => {
    const { event, onEventClick } = props;

    return (
        <EventContainer
            onClick={() => onEventClick(event.id)}
            data-testid={event.id}
        >
            <Typography variant='caption' color='inherit'>
                {formatTimeRange(event.startDate, event.endDate)}
            </Typography>
        </EventContainer>
    );
};

export default Event;
