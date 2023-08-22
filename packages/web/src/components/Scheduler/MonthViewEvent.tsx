import React from 'react';

import Typography from '@mui/material/Typography';

import { formatTimeRange } from '@creativelid/maui-utils/Date';
import EventContainer from '../../hoc/EventContainer';
import { IEvent, IGroup, TOnEventClick } from './SchedulerTypes';

export interface MonthViewEventProps {
    event: IEvent;
    groups: IGroup[];
    onEventClick: TOnEventClick;
}

const MonthViewEvent = (props: MonthViewEventProps) => {
    const { event, groups, onEventClick } = props;

    return (
        <EventContainer
            onClick={() => onEventClick(event.id)}
            data-testid={event.id}
        >
            <Typography variant='caption' color='inherit'>
                {formatTimeRange(event.startDate, event.endDate)}
            </Typography>
            <Typography variant='caption' color='inherit'>
                {groups.find((group) => group.id === event.groupId)?.name ??
                    'Open'}
            </Typography>
        </EventContainer>
    );
};

export default MonthViewEvent;
