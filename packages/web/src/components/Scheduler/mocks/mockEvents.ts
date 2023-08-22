import { IEvent } from '../SchedulerTypes';

export const mockEvents: IEvent[] = [
    {
        id: 'event-id-111',
        startDate: new Date('2022-07-11T09:00:00'),
        endDate: new Date('2022-07-11T17:00:00'),
        groupId: 'group-id-000',
    },
    {
        id: 'event-id-222',
        startDate: new Date('2022-07-13T10:00:00'),
        endDate: new Date('2022-07-13T16:00:00'),
        groupId: 'group-id-222',
    },
    {
        id: 'event-id-333',
        startDate: new Date('2022-07-15T20:00:00'),
        endDate: new Date('2022-07-16T06:00:00'),
        groupId: 'group-id-333',
    },
    {
        id: 'event-id-555',
        startDate: new Date('2022-07-17T10:00:00'),
        endDate: new Date('2022-07-17T17:00:00'),
        groupId: 'group-id-000',
    },
    {
        id: 'event-id-444',
        startDate: new Date('2022-07-11T10:00:00'),
        endDate: new Date('2022-07-11T18:00:00'),
        groupId: 'group-id-000',
    },
    {
        id: 'event-id-666',
        startDate: new Date('2022-08-17T10:30:00'),
        endDate: new Date('2022-08-17T17:30:00'),
        groupId: 'group-id-222',
    },
    {
        id: 'event-id-777',
        startDate: new Date('2022-08-09T09:00:00'),
        endDate: new Date('2022-08-09T13:00:00'),
        groupId: 'group-id-444',
    },
    {
        id: 'event-id-888',
        startDate: new Date('2022-06-09T12:00:00'),
        endDate: new Date('2022-06-09T20:00:00'),
        groupId: 'group-id-222',
    },
    {
        id: 'event-id-999',
        startDate: new Date('2022-07-11T11:00:00'),
        endDate: new Date('2022-07-11T19:00:00'),
        groupId: 'group-id-333',
    },
];
