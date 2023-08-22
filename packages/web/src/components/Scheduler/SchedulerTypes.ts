export interface IEvent {
    id: string;
    startDate: Date;
    endDate: Date;
    groupId: IGroup['id'];
}

export interface IGroup {
    id: string;
    name: string;
    url?: string | null;
}

/* Basically this is `enum` but with better behavior
   https://www.youtube.com/watch?v=jjMbPt_H3RQ */
export const VIEWS = {
    WEEK: 'WEEK',
    MONTH: 'MONTH',
} as const;

export type View = typeof VIEWS[keyof typeof VIEWS];

export type TOnEventClick = (eventId: IEvent['id']) => void;

export type TOnEventUpdate = (
    id: IEvent['id'],
    newStartDate: IEvent['startDate'],
    newEndDate: IEvent['endDate'],
    newGroupId: IEvent['groupId'] | undefined,
) => void;

export type TDateToEventLookUpTable = Map<string, IEvent[]>;

export type TEventRenderer = (props: { event: IEvent }) => React.ReactElement;
