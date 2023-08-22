import React, { ReactNode } from 'react';

import TableCell, { TableCellProps } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import { alpha } from '@mui/material';

import { TOnEventUpdate, IEvent } from '../components/Scheduler/SchedulerTypes';
import { END_DATE, EVENT_ID, START_DATE } from '@creativelid/maui-constants/Scheduler';
import Grey from '@creativelid/maui-styles/colors/Grey';

export interface TdEventDropZoneProps {
    cellDate: Date;
    children?: ReactNode;
    groupId?: IEvent['groupId'];
    highlight?: boolean; // @default false
    onEventUpdate: TOnEventUpdate;
    shaded?: boolean; // @default false
    sx?: TableCellProps['sx'];
    updateTime?: boolean; // @default false
}

const TdEventDropZone = (props: TdEventDropZoneProps): JSX.Element => {
    const {
        cellDate,
        children,
        groupId: newGroupId,
        highlight = false,
        onEventUpdate,
        shaded = false,
        sx,
        updateTime = false,
    } = props;

    const StyledTableCell = styled(TableCell)(({ theme }) =>({
        background: shaded
            ? Grey.A100
            : highlight
                ? alpha(theme.palette.primary.main, 0.1)
                : 'transparent',
        padding: '.5rem',
        verticalAlign: 'top',
    }));

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        const eventId = e.dataTransfer.getData(EVENT_ID);
        const newStartDate = new Date(e.dataTransfer.getData(START_DATE));
        const newEndDate = new Date(e.dataTransfer.getData(END_DATE));

        const eventDuration = newEndDate.getTime() - newStartDate.getTime();

        newStartDate.setFullYear(
            cellDate.getFullYear(),
            cellDate.getMonth(),
            cellDate.getDate(),
        );

        if (updateTime) {
            newStartDate.setHours(cellDate.getHours());
        }

        newEndDate.setTime(newStartDate.getTime() + eventDuration);

        onEventUpdate(eventId, newStartDate, newEndDate, newGroupId);
    };

    return (
        <StyledTableCell
            sx={sx}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children}
        </StyledTableCell>
    );
};

export default TdEventDropZone;
