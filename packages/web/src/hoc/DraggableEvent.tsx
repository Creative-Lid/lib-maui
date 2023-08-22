import React from 'react';

import { IEvent } from '../components/Scheduler/SchedulerTypes';
import { END_DATE, EVENT_ID, START_DATE } from '@maui/constants/Scheduler';

export interface Props {
    children: React.ReactNode;
    id: IEvent['id'];
    startDate: IEvent['startDate'];
    endDate: IEvent['endDate'];
}

const DraggableEvent = (props: Props) => {
    const {
        children,
        id,
        startDate,
        endDate,
    } = props;

    function handleDragStart(e: React.DragEvent) {
        e.dataTransfer.setData(EVENT_ID, `${id}`);
        e.dataTransfer.setData(START_DATE, `${startDate}`);
        e.dataTransfer.setData(END_DATE, `${endDate}`);
    }

    return (
        <div draggable="true" onDragStart={handleDragStart}>
            {children}
        </div>
    );
};

export default DraggableEvent;
