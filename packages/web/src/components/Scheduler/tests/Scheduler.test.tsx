/**
 * @jest-environment jsdom
 */

import React from 'react';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { fail } from 'assert';
import { within } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

import Scheduler from '../Scheduler';

import { mockEvents } from '../mocks/mockEvents';
import { mockGroups } from '../mocks/mockGroups';

import {
    getDateTitleRangeForWeek,
    getFirstDayOfWeek,
    getLastDayOfWeek,
    getMonthByWeeks,
    formatTimeRange,
} from '@maui/utils/Date';

import {
    END_DATE,
    EVENT_ID,
    START_DATE,
} from '@maui/constants/Scheduler';

import { IEvent } from '../SchedulerTypes';

describe('Scheduler', () => {
    const defaultDate = new Date('2022-07-15T12:00:00-04:00');

    const props = {
        defaultDate: defaultDate,
        groups: mockGroups,
        events: mockEvents,
        onEventUpdate: () => {
            return;
        },
        onEventClick: () => {
            return;
        },
    };

    it('renders "Week" button', () => {
        render(<Scheduler {...props} />);
        expect(screen.getByRole('button', { name: /week/i })).toBeVisible();
    });

    it('renders "Month" button', () => {
        render(<Scheduler {...props} />);
        expect(screen.getByRole('button', { name: /month/i })).toBeVisible();
    });

    it('renders "Previous-date" button', () => {
        render(<Scheduler {...props} />);
        expect(
            screen.getByRole('button', { name: /previous date/i }),
        ).toBeVisible();
    });

    it('renders "Next-date" button', () => {
        render(<Scheduler {...props} />);
        expect(
            screen.getByRole('button', { name: /next date/i }),
        ).toBeVisible();
    });

    it('renders "Today" button', () => {
        render(<Scheduler {...props} />);
        expect(screen.getByRole('button', { name: /today/i })).toBeVisible();
    });

    it('default view-mode is week', () => {
        render(<Scheduler {...props} />);

        expect(screen.getByRole('table', { name: /week view/i })).toBeVisible();

        const weekDateTitle = getDateTitleRangeForWeek(defaultDate);
        expect(screen.getByText(weekDateTitle)).toBeVisible();
    });

    it('switches between week and month views', async () => {
        const user = userEvent.setup();
        render(<Scheduler {...props} />);

        await act(async () => {
            await user.click(screen.getByRole('button', { name: /month/i }));
        });

        expect(
            screen.getByRole('table', { name: /month view/i }),
        ).toBeVisible();
        expect(
            screen.queryByRole('table', { name: /week view/i }),
        ).not.toBeInTheDocument();

        await act(async () => {
            await user.click(screen.getByRole('button', { name: /week/i }));
        });

        expect(screen.getByRole('table', { name: /week view/i })).toBeVisible();
        expect(
            screen.queryByRole('table', { name: /month view/i }),
        ).not.toBeInTheDocument();
    });

    it('displays current date title when clicking on "Today" button in week view', async () => {
        const user = userEvent.setup();
        render(<Scheduler {...props} />);

        await act(async () => {
            await user.click(screen.getByRole('button', { name: /today/i }));
        });

        await act(async () => {
            await user.click(screen.getByRole('button', { name: /week/i }));
        });

        const weekDateRangeTitle = getDateTitleRangeForWeek(new Date());
        expect(screen.getByText(weekDateRangeTitle)).toBeVisible();
    });

    it('displays current date title when clicking on "Today" button in month view', async () => {
        const user = userEvent.setup();
        render(<Scheduler {...props} />);

        await act(async () => {
            await user.click(screen.getByRole('button', { name: /today/i }));
        });

        await act(async () => {
            await user.click(screen.getByRole('button', { name: /month/i }));
        });

        const today = new Date();

        const month = screen.getByRole('button', {
            name: today.toLocaleString('en-US', { month: 'long' }),
        });
        expect(month).toBeVisible();

        const year = screen.getByRole('button', {
            name: today.getFullYear().toString(),
        });
        expect(year).toBeVisible();
    });

    it('should allow or disallow event dragging based on the "isEventDraggable" prop', async () => {
        const user = userEvent.setup();
        render(
            <Scheduler
                {...props}
                isEventDraggable={(event) => event.id === 'event-id-111'}
            />,
        );

        // make sure we are on the WEEK view
        await act(async () => {
            await user.click(screen.getByRole('button', { name: /week/i }));
        });

        const weekEventElements = screen.queryAllByTestId(/^event-id-\d+$/);

        weekEventElements.forEach((eventElement) => {
            if (eventElement.dataset.testid === 'event-id-111') {
                expect(eventElement.parentElement).toHaveAttribute('draggable', 'true');
            } else {
                expect(eventElement.parentElement).not.toHaveAttribute('draggable', 'true');
            }
        });

        // make sure we are on the MONTH view
        await act(async () => {
            await user.click(screen.getByRole('button', { name: /month/i }));
        });

        const monthEventElements = screen.queryAllByTestId(/^event-id-\d+$/);

        monthEventElements.forEach((eventElement) => {
            if (eventElement.dataset.testid === 'event-id-111') {
                expect(eventElement.parentElement).toHaveAttribute('draggable', 'true');
            } else {
                expect(eventElement.parentElement).not.toHaveAttribute('draggable', 'true');
            }
        });
    });

    it('should pass correct arguments to the "isEventDraggable" prop', async () => {
        const user = userEvent.setup();
        const isEventDraggable = jest.fn(() => true);
        render(<Scheduler {...props} isEventDraggable={isEventDraggable} />);

        // make sure we are on the WEEK view
        await act(async () => {
            await user.click(screen.getByRole('button', { name: /week/i }));
        });

        const weekEventElements = screen.queryAllByTestId(/^event-id-\d+$/);

        weekEventElements.forEach((eventElement) => {
            const event = mockEvents.find((e) => e.id === eventElement.dataset.testid);
            expect(isEventDraggable).toHaveBeenCalledWith(event, {
                view: 'WEEK',
            });
        });

        // make sure we are on the MONTH view
        await act(async () => {
            await user.click(screen.getByRole('button', { name: /month/i }));
        });

        const monthEventElements = screen.queryAllByTestId(/^event-id-\d+$/);

        monthEventElements.forEach((eventElement) => {
            const event = mockEvents.find((e) => e.id === eventElement.dataset.testid);
            expect(isEventDraggable).toHaveBeenCalledWith(event, {
                view: 'MONTH',
            });
        });
    });

    describe('Week view', () => {
        it('renders group names in week view', async () => {
            const user = userEvent.setup();
            render(<Scheduler {...props} />);

            await act(async () => {
                await user.click(screen.getByRole('button', { name: /week/i }));
            });

            for (const group of mockGroups) {
                expect(screen.queryByText(group.name)).toBeVisible();
            }
        });

        it('renders events that within a week', async () => {
            const user = userEvent.setup();
            render(<Scheduler {...props} />);

            await act(async () => {
                await user.click(screen.getByRole('button', { name: /week/i }));
            });

            const firstDayOfWeek = getFirstDayOfWeek(defaultDate);
            const lastDayOfWeek = getLastDayOfWeek(defaultDate);

            let noEventsAreDisplayed = true;

            for (const event of mockEvents) {
                const eventTitle = formatTimeRange(
                    event.startDate,
                    event.endDate,
                );

                if (
                    firstDayOfWeek <= event.startDate
                    && event.startDate <= lastDayOfWeek
                ) {
                    expect(screen.getByText(eventTitle)).toBeVisible();
                    noEventsAreDisplayed = false;
                } else {
                    expect(
                        screen.queryByText(eventTitle),
                    ).not.toBeInTheDocument();
                }
            }

            if (noEventsAreDisplayed) {
                fail(
                    'There are NO events within the displayed week. The week depends on the default date.',
                );
            }
        });

        it('passes event-id to the "onEventClick" callback when clicking on an event', async () => {
            const user = userEvent.setup();
            const handleEventClick = jest.fn();
            render(<Scheduler {...props} onEventClick={handleEventClick} />);

            await act(async () => {
                await user.click(screen.getByRole('button', { name: /week/i }));
            });

            const expectedCalls: IEvent['id'][][] = [];

            await Promise.all(
                mockEvents.map(async (event) => {
                    const eventTitle = formatTimeRange(
                        event.startDate,
                        event.endDate,
                    );

                    const element = screen.queryByText(eventTitle);

                    if (element) {
                        await user.click(element);
                        expectedCalls.push([event.id]);
                    }
                }),
            );

            expect(handleEventClick.mock.calls).toEqual(expectedCalls);
        });

        it('should set the data transfer with the correct type and the items to being dragged', async () => {
            const user = userEvent.setup();
            render(<Scheduler {...props} />);

            await act(async () => {
                await user.click(screen.getByRole('button', { name: /week/i }));
            });

            mockEvents.forEach((event) => {
                const eventTime = formatTimeRange(
                    event.startDate,
                    event.endDate,
                );

                const element = screen.queryByText(eventTime);

                if (element) {
                    const mockDataTransfer = { setData: jest.fn() };

                    fireEvent.dragStart(element, {
                        dataTransfer: mockDataTransfer,
                    });

                    expect(mockDataTransfer.setData.mock.calls).toEqual([
                        [EVENT_ID, event.id],
                        [START_DATE, event.startDate.toString()],
                        [END_DATE, event.endDate.toString()],
                    ]);
                }
            });
        });

        it('passes to the "onEventUpdate" callback new values of an event when the event is dropped on a group row', async () => {
            const user = userEvent.setup();
            const handleEventUpdate = jest.fn();
            render(<Scheduler {...props} onEventUpdate={handleEventUpdate} />);

            // make sure we are on the week view
            await act(async () => {
                await user.click(screen.getByRole('button', { name: /week/i }));
            });

            const groupRows: HTMLElement[] = [];
            mockGroups.forEach((group) => {
                groupRows.push(
                    screen.getByRole('row', {
                        name: new RegExp(group.name, 'i'),
                    }),
                );
            });

            // we going to drop first event into each cell
            const mockEventId = mockEvents[0].id;
            const mockEventStartDate = mockEvents[0].startDate;
            const mockEventEndDate = mockEvents[0].endDate;

            const mockDataTransfer = new Map([
                [EVENT_ID, mockEventId],
                [START_DATE, mockEventStartDate.toString()],
                [END_DATE, mockEventEndDate.toString()],
            ]);

            groupRows.forEach((groupRow) => {
                groupRow.childNodes.forEach((tableCellEventDropZone) => {
                    fireEvent.drop(tableCellEventDropZone, {
                        dataTransfer: {
                            getData: (key: string) => mockDataTransfer.get(key),
                        },
                    });
                });
            });

            const firstDayOfWeek = getFirstDayOfWeek(defaultDate);

            const expectation: [
                IEvent['id'],
                IEvent['startDate'],
                IEvent['endDate'],
                IEvent['groupId'],
            ][] = [];

            groupRows.forEach((groupRow, groupIndex) => {
                groupRow.childNodes.forEach((item, columnIndex) => {
                    if (columnIndex === 0) return; // skip cell with row title

                    const newStartDate = new Date(defaultDate);
                    newStartDate.setDate(
                        firstDayOfWeek.getDate() + columnIndex - 1,
                    );
                    newStartDate.setHours(mockEventStartDate.getHours());

                    const newEndDate = new Date(defaultDate);
                    newEndDate.setDate(
                        firstDayOfWeek.getDate() + columnIndex - 1,
                    );
                    newEndDate.setHours(mockEventEndDate.getHours());

                    const newEventGroupId = mockGroups[groupIndex].id;

                    expectation.push([
                        mockEventId,
                        newStartDate,
                        newEndDate,
                        newEventGroupId,
                    ]);
                });
            });

            expect(handleEventUpdate.mock.calls).toEqual(expectation);
        });

        it('renders formatted date title in a week view if weekViewDateTitleFormat prop has been passed', async () => {
            const user = userEvent.setup();
            const formatHandler = (startDate: Date, endDate: Date) => {
                return `${startDate} - ${endDate}`;
            };
            render(<Scheduler {...props} weekViewDateTitleFormat={formatHandler} />);

            // make sure we are on the week view
            await act(async () => {
                await user.click(screen.getByRole('button', { name: /week/i }));
            });

            const expectedDateTitle = `${getFirstDayOfWeek(defaultDate)} - ${getLastDayOfWeek(defaultDate)}`;

            const element = screen.getByText(expectedDateTitle);

            expect(element).toBeVisible();
        });
    });

    describe('Month view', () => {
        it('renders events that within a month view', async () => {
            const user = userEvent.setup();
            render(<Scheduler {...props} />);

            await act(async () => {
                await user.click(screen.getByRole('button', { name: /month/i }));
            });

            const month = getMonthByWeeks(defaultDate);
            const monthViewFirstDate = month[0][0];
            const monthViewLastDate =
                month[month.length - 1][month[month.length - 1].length - 1];

            mockEvents.forEach((event) => {
                if (
                    monthViewFirstDate <= event.startDate &&
                    event.startDate <= monthViewLastDate
                ) {
                    const eventTime = formatTimeRange(
                        event.startDate,
                        event.endDate,
                    );
                    const eventGroup = event.groupId
                        ? mockGroups.find((group) => group.id === event.groupId)
                            ?.name
                        : 'Open';

                    // Find DOM element with event time and group name as identificators,
                    // since event time and group name are in different DOM elements,
                    // the function is used to find the closest common ancestor of those elements.
                    // Therefore, event time, or group name should be unique in mock data.
                    const element = screen.getByText((content, DOMElement) => {
                        if (!DOMElement) return false;

                        const hasText = (node: Element) => {
                            if (!node.textContent) return false;
                            if (!eventGroup) return false;

                            const elementContainTime = new RegExp(
                                eventTime,
                                'i',
                            ).test(node.textContent);
                            const elementContainGroup = new RegExp(
                                eventGroup,
                                'i',
                            ).test(node.textContent);

                            return elementContainTime && elementContainGroup;
                        };

                        const nodeHasText = hasText(DOMElement);
                        const childrenDontHaveText = Array.from(
                            DOMElement.children,
                        ).every((child) => !hasText(child));

                        return nodeHasText && childrenDontHaveText;
                    });

                    expect(element).toBeVisible();
                }
            });
        });

        it('passes an event-id to the "onEventClick" callback when clicking on an event', async () => {
            const user = userEvent.setup();
            const handleEventClick = jest.fn();
            render(<Scheduler {...props} onEventClick={handleEventClick} />);

            await act(async () => {
                await user.click(screen.getByRole('button', { name: /month/i }));
            });

            const expextedCalls: IEvent['id'][][] = [];

            await Promise.all(
                mockEvents.map(async (event) => {
                    const eventTime = formatTimeRange(
                        event.startDate,
                        event.endDate,
                    );
                    const eventGroup = event.groupId
                        ? mockGroups.find((group) => group.id === event.groupId)
                            ?.name
                        : 'Open';

                    // Find DOM element with event time and group name as identificators,
                    // since event time and group name are in different DOM elements,
                    // the function is used to find the closest common ancestor of those elements.
                    // Therefore, event time, or group name should be unique in mock data.
                    const element = screen.queryByText((content, DOMElement) => {
                        if (!DOMElement) return false;

                        const hasText = (node: Element) => {
                            if (!node.textContent) return false;
                            if (!eventGroup) return false;

                            const elementContainTime = new RegExp(
                                eventTime,
                                'i',
                            ).test(node.textContent);
                            const elementContainGroup = new RegExp(
                                eventGroup,
                                'i',
                            ).test(node.textContent);

                            return elementContainTime && elementContainGroup;
                        };

                        const nodeHasText = hasText(DOMElement);
                        const childrenDontHaveText = Array.from(
                            DOMElement.children,
                        ).every((child) => !hasText(child));

                        return nodeHasText && childrenDontHaveText;
                    });

                    if (element) {
                        await user.click(element);
                        expextedCalls.push([event.id]);
                    }
                }),
            );

            expect(handleEventClick.mock.calls).toEqual(expextedCalls);
        });

        it('should set the data transfer with the correct type and the items to being dragged', async () => {
            const user = userEvent.setup();
            render(<Scheduler {...props} />);

            await act(async () => {
                await user.click(screen.getByRole('button', { name: /month/i }));
            });

            mockEvents.forEach((event) => {
                const eventTime = formatTimeRange(
                    event.startDate,
                    event.endDate,
                );
                const eventGroup = event.groupId
                    ? mockGroups.find((group) => group.id === event.groupId)
                        ?.name
                    : 'Open';

                // Find DOM element with event time and group name as identificators,
                // since event time and group name are in different DOM elements,
                // the function is used to find the closest common ancestor of those elements.
                // Therefore, event time, or group name should be unique in mock data.
                const element = screen.queryByText((content, DOMElement) => {
                    if (!DOMElement) return false;

                    const hasText = (node: Element) => {
                        if (!node.textContent) return false;
                        if (!eventGroup) return false;

                        const elementContainTime = new RegExp(
                            eventTime,
                            'i',
                        ).test(node.textContent);
                        const elementContainGroup = new RegExp(
                            eventGroup,
                            'i',
                        ).test(node.textContent);

                        return elementContainTime && elementContainGroup;
                    };

                    const nodeHasText = hasText(DOMElement);
                    const childrenDontHaveText = Array.from(
                        DOMElement.children,
                    ).every((child) => !hasText(child));

                    return nodeHasText && childrenDontHaveText;
                });

                if (element) {
                    const mockDataTransfer = { setData: jest.fn() };

                    fireEvent.dragStart(element, {
                        dataTransfer: mockDataTransfer,
                    });

                    expect(mockDataTransfer.setData.mock.calls).toEqual([
                        [EVENT_ID, event.id],
                        [START_DATE, event.startDate.toString()],
                        [END_DATE, event.endDate.toString()],
                    ]);
                }
            });
        });

        it('should render correct limited number of events when "maxEventsPerDayInMonth" prop is set', async () => {
            const user = userEvent.setup();
            const maxEventsPerDayInMonth = 1;
            render(
                <Scheduler
                    {...props}
                    maxEventsPerDayInMonth={maxEventsPerDayInMonth}
                />,
            );

            // make sure we are on the month view
            await act(async () => {
                await user.click(screen.getByRole('button', { name: /month/i }));
            });

            const cells = screen.getAllByRole('cell');

            for (const cell of cells) {
                expect(
                    within(cell).queryAllByTestId(/^event-id-\d+$/).length,
                ).toBeLessThanOrEqual(maxEventsPerDayInMonth);
            }
        });

        it('should display a button when events are over the limit', async () => {
            const user = userEvent.setup();
            render(<Scheduler {...props} />);

            // make sure we are on the month view
            await act(async () => {
                await user.click(screen.getByRole('button', { name: /month/i }));
            });

            const cellsWithUnlimitedEvents = screen.getAllByRole('cell');

            const eventsPerCell = cellsWithUnlimitedEvents.map((cell) => {
                return within(cell).queryAllByTestId(/^event-id-\d+$/).length;
            });

            cleanup();

            const maxEventsPerDayInMonth = 1;
            render(
                <Scheduler
                    {...props}
                    maxEventsPerDayInMonth={maxEventsPerDayInMonth}
                    hiddenEventsLabel='More events'
                />,
            );

            // make sure we are on the month view
            await act(async () => {
                await user.click(screen.getByRole('button', { name: /month/i }));
            });

            const cells = screen.getAllByRole('cell');

            cells.forEach((cell, index) => {
                const button = within(cell).queryByRole('button', {
                    name: /more events/i,
                });

                if (eventsPerCell[index] > maxEventsPerDayInMonth) {
                    expect(button).toBeVisible();
                } else {
                    expect(button).not.toBeInTheDocument();
                }
            });
        });

        it('should call the callback function "onHiddenEventsClick" with date and array of ids of events that are within a day', async () => {
            const user = userEvent.setup();
            const maxEventsPerDayInMonth = 1;
            const onHiddenEventsClick = jest.fn();
            render(
                <Scheduler
                    {...props}
                    maxEventsPerDayInMonth={maxEventsPerDayInMonth}
                    hiddenEventsLabel='More events'
                    onHiddenEventsClick={onHiddenEventsClick}
                />,
            );

            // make sure we are on the month view
            await act(async () => {
                await user.click(screen.getByRole('button', { name: /month/i }));
            });

            const buttons = screen.getAllByRole('button', {
                name: /more events/i,
            });

            for (const button of buttons) {
                await user.click(button);
            }

            // Expected calls are hardcoded here, so this test case may fail if the mock data changes.
            const expectedCalls = [
                [
                    new Date('2022-07-11T00:00:00'),
                    ['event-id-111', 'event-id-444', 'event-id-999'],
                ],
            ];

            expect(onHiddenEventsClick.mock.calls).toEqual(expectedCalls);
        });

        it('should render the correct number of hidden events on the hidden-events-button when "maxEventsPerDayInWeek" prop is set', async () => {
            const user = userEvent.setup();
            const maxEventsPerDayInWeek = 1;
            render(
                <Scheduler
                    {...props}
                    maxEventsPerDayInMonth={maxEventsPerDayInWeek}
                />,
            );

            // make sure we are on the week view
            await act(async () => {
                await user.click(screen.getByRole('button', { name: /month/i }));
            });

            const cells = screen.getAllByRole('cell');

            /**
             * It is hard to retrieve the number of events per day from
             * the mock data and match them with the correct cell, 
             * so we are using hardcoded data here as a workaround.
             */
            const eventsPerDay = [
            //  July 2022
            //  s  m  t  w  t  f  s
                0, 0, 0, 0, 0, 0, 0, // week 1
                0, 0, 0, 0, 0, 0, 0, // week 2
                0, 3, 0, 1, 0, 1, 0, // week 3
                1, 0, 0, 0, 0, 0, 0, // week 4
                0, 0, 0, 0, 0, 0, 0, // week 5
                0, 0, 0, 0, 0, 0, 0, // week 6
            ];

            if (cells.length !== eventsPerDay.length) {
                throw new Error('There is a mismatch in hardcoded data for tests and the mock data for the scheduler');
            }

            for (let i = 0; i < cells.length; i++) {
                const hiddenEventsNum = eventsPerDay[i] - maxEventsPerDayInWeek;
                const button = within(cells[i]).queryByRole('button', { name: `+${hiddenEventsNum} more` });

                if (hiddenEventsNum > 0) {
                    expect(button).toBeVisible();
                } else {
                    expect(button).not.toBeInTheDocument();
                }
            }
        });
    });
});
