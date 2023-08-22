import {
    formatTimeRange,
    getDateTitleForMonth,
    getDateTitleRangeForWeek,
    getFirstDayOfWeek,
    getLastDayOfWeek,
    getMonthByWeeks,
    getWeek,
    getYearRange,
    isPrevWeek,
    isNextWeek,
    isPrevMonth,
    isNextMonth,
    isPrevYear,
    isNextYear,
} from './Date';

describe('Date helpers', () => {
    describe('formatTimeRange()', () => {
        const dataSet = [
            {
                input: {
                    start: new Date('2022-08-26T12:34:56'),
                    end: new Date('2022-08-26T12:34:56'),
                },
                output: '12:34 PM - 12:34 PM',
            },
            {
                input: {
                    start: new Date('2022-03-12T00:42:56'),
                    end: new Date('2022-03-12T09:12:57'),
                },
                output: '12:42 AM - 9:12 AM',
            },
            {
                input: {
                    start: new Date('2222-02-22T00:00:00'),
                    end: new Date('2222-02-22T23:59:59'),
                },
                output: '12:00 AM - 11:59 PM',
            },
        ];

        dataSet.forEach((data) => {
            it(`${data.input.start.toLocaleString()} - ${data.input.end.toLocaleString()} => ${data.output}`, () => {
                expect(formatTimeRange(data.input.start, data.input.end)).toMatch(data.output);
            });
        });
    });

    describe('getDateTitleRangeForMonth()', () => {
        const pairs = [
            {
                input: new Date('2022-08-26T12:34:56'),
                output: 'August 2022',
            },
            {
                input: new Date('2030-07-04T11:22:33'),
                output: 'July 2030',
            },
            {
                input: new Date('1999-01-01T23:45:59'),
                output: 'January 1999',
            },
        ];

        pairs.forEach((pair) => {
            it(`${pair.input} => ${pair.output}`, () => {
                expect(getDateTitleForMonth(pair.input)).toBe(pair.output);
            });
        });
    });

    describe('getDateTitleRangeForWeek()', () => {
        const pairs = [
            {
                input: new Date('2022-08-26T12:34:56'),
                output: '21 - Aug 27, 2022',
            },
            {
                input: new Date('2022-08-04T11:22:33'),
                output: 'Jul 31 - Aug 6, 2022',
            },
            {
                input: new Date('2022-01-01T23:45:59'),
                output: 'Dec 26, 2021 - Jan 1, 2022',
            },
        ];

        pairs.forEach((pair) => {
            it(`${pair.input} => ${pair.output}`, () => {
                expect(getDateTitleRangeForWeek(pair.input)).toBe(pair.output);
            });
        });
    });

    describe('getFirstDayOfWeek()', () => {
        it('returns Sunday as first day of week', () => {
            let date: Date, weekDay: string;

            date = new Date('2022-08-04');
            weekDay = getFirstDayOfWeek(date).toLocaleDateString('default', { weekday: 'long' });
            expect(weekDay).toMatch(/sunday/i);

            date = new Date('1950-09-03');
            weekDay = getFirstDayOfWeek(date).toLocaleDateString('default', { weekday: 'long' });
            expect(weekDay).toMatch(/sunday/i);

            date = new Date('2222-12-31');
            weekDay = getFirstDayOfWeek(date).toLocaleDateString('default', { weekday: 'long' });
            expect(weekDay).toMatch(/sunday/i);
        });

        it('returns first date of week with reset time', () => {
            let firstDateOfWeek: Date;

            firstDateOfWeek = getFirstDayOfWeek(new Date('2022-08-04T11:22:33'));
            expect(firstDateOfWeek).toStrictEqual(new Date('2022-07-31T00:00:00'));

            firstDateOfWeek = getFirstDayOfWeek(new Date('2022-12-31T22:33:44'));
            expect(firstDateOfWeek).toStrictEqual(new Date('2022-12-25T00:00:00'));

            firstDateOfWeek = getFirstDayOfWeek(new Date('2022-01-01T05:06:07'));
            expect(firstDateOfWeek).toStrictEqual(new Date('2021-12-26T00:00:00'));
        });
    });

    describe('getLastDayOfWeek()', () => {
        it('returns Saturday as last day of week', () => {
            let date: Date, weekDay: string;

            date = new Date('2021-08-04');
            weekDay = getLastDayOfWeek(date).toLocaleDateString('default', { weekday: 'long' });
            expect(weekDay).toMatch(/saturday/i);

            date = new Date('1988-11-23');
            weekDay = getLastDayOfWeek(date).toLocaleDateString('default', { weekday: 'long' });
            expect(weekDay).toMatch(/saturday/i);

            date = new Date('2232-12-31');
            weekDay = getLastDayOfWeek(date).toLocaleDateString('default', { weekday: 'long' });
            expect(weekDay).toMatch(/saturday/i);
        });

        it('returns last date of week with reset time', () => {
            let lastDateOfWeek: Date;

            lastDateOfWeek = getLastDayOfWeek(new Date('2022-08-04T11:22:33'));
            expect(lastDateOfWeek).toStrictEqual(new Date('2022-08-06T00:00:00'));

            lastDateOfWeek = getLastDayOfWeek(new Date('2022-12-31T22:33:44'));
            expect(lastDateOfWeek).toStrictEqual(new Date('2022-12-31T00:00:00'));

            lastDateOfWeek = getLastDayOfWeek(new Date('2022-01-01T05:06:07'));
            expect(lastDateOfWeek).toStrictEqual(new Date('2022-01-01T00:00:00'));

            lastDateOfWeek = getLastDayOfWeek(new Date('2022-04-05T05:06:07'));
            expect(lastDateOfWeek).toStrictEqual(new Date('2022-04-09T00:00:00'));
        });
    });

    describe('getMonthByWeeks()', () => {
        it('returns array of weeks', () => {
            const month = getMonthByWeeks(new Date('2022-08-04T11:22:33'));
            const expectedMonth = [
                [
                    new Date('2022-07-31T00:00:00'),
                    new Date('2022-08-01T00:00:00'),
                    new Date('2022-08-02T00:00:00'),
                    new Date('2022-08-03T00:00:00'),
                    new Date('2022-08-04T00:00:00'),
                    new Date('2022-08-05T00:00:00'),
                    new Date('2022-08-06T00:00:00'),
                ],
                [
                    new Date('2022-08-07T00:00:00'),
                    new Date('2022-08-08T00:00:00'),
                    new Date('2022-08-09T00:00:00'),
                    new Date('2022-08-10T00:00:00'),
                    new Date('2022-08-11T00:00:00'),
                    new Date('2022-08-12T00:00:00'),
                    new Date('2022-08-13T00:00:00'),
                ],
                [
                    new Date('2022-08-14T00:00:00'),
                    new Date('2022-08-15T00:00:00'),
                    new Date('2022-08-16T00:00:00'),
                    new Date('2022-08-17T00:00:00'),
                    new Date('2022-08-18T00:00:00'),
                    new Date('2022-08-19T00:00:00'),
                    new Date('2022-08-20T00:00:00'),
                ],
                [
                    new Date('2022-08-21T00:00:00'),
                    new Date('2022-08-22T00:00:00'),
                    new Date('2022-08-23T00:00:00'),
                    new Date('2022-08-24T00:00:00'),
                    new Date('2022-08-25T00:00:00'),
                    new Date('2022-08-26T00:00:00'),
                    new Date('2022-08-27T00:00:00'),
                ],
                [
                    new Date('2022-08-28T00:00:00'),
                    new Date('2022-08-29T00:00:00'),
                    new Date('2022-08-30T00:00:00'),
                    new Date('2022-08-31T00:00:00'),
                    new Date('2022-09-01T00:00:00'),
                    new Date('2022-09-02T00:00:00'),
                    new Date('2022-09-03T00:00:00'),
                ],
            ];

            expect(month).toStrictEqual(expectedMonth);

            const month2 = getMonthByWeeks(new Date('2022-02-01T22:33:44'));
            const expectedMonth2 = [
                [
                    new Date('2022-01-30T00:00:00'),
                    new Date('2022-01-31T00:00:00'),
                    new Date('2022-02-01T00:00:00'),
                    new Date('2022-02-02T00:00:00'),
                    new Date('2022-02-03T00:00:00'),
                    new Date('2022-02-04T00:00:00'),
                    new Date('2022-02-05T00:00:00'),
                ],
                [
                    new Date('2022-02-06T00:00:00'),
                    new Date('2022-02-07T00:00:00'),
                    new Date('2022-02-08T00:00:00'),
                    new Date('2022-02-09T00:00:00'),
                    new Date('2022-02-10T00:00:00'),
                    new Date('2022-02-11T00:00:00'),
                    new Date('2022-02-12T00:00:00'),
                ],
                [
                    new Date('2022-02-13T00:00:00'),
                    new Date('2022-02-14T00:00:00'),
                    new Date('2022-02-15T00:00:00'),
                    new Date('2022-02-16T00:00:00'),
                    new Date('2022-02-17T00:00:00'),
                    new Date('2022-02-18T00:00:00'),
                    new Date('2022-02-19T00:00:00'),
                ],
                [
                    new Date('2022-02-20T00:00:00'),
                    new Date('2022-02-21T00:00:00'),
                    new Date('2022-02-22T00:00:00'),
                    new Date('2022-02-23T00:00:00'),
                    new Date('2022-02-24T00:00:00'),
                    new Date('2022-02-25T00:00:00'),
                    new Date('2022-02-26T00:00:00'),
                ],
                [
                    new Date('2022-02-27T00:00:00'),
                    new Date('2022-02-28T00:00:00'),
                    new Date('2022-03-01T00:00:00'),
                    new Date('2022-03-02T00:00:00'),
                    new Date('2022-03-03T00:00:00'),
                    new Date('2022-03-04T00:00:00'),
                    new Date('2022-03-05T00:00:00'),
                ],
            ];

            expect(month2).toStrictEqual(expectedMonth2);
        });
    });

    describe('getWeek()', () => {
        it('returns array of dates of week with reset time', () => {
            const week = getWeek(new Date('2022-08-11'));
            expect(week[0]).toStrictEqual(new Date('2022-08-07T00:00:00'));
            expect(week[1]).toStrictEqual(new Date('2022-08-08T00:00:00'));
            expect(week[2]).toStrictEqual(new Date('2022-08-09T00:00:00'));
            expect(week[3]).toStrictEqual(new Date('2022-08-10T00:00:00'));
            expect(week[4]).toStrictEqual(new Date('2022-08-11T00:00:00'));
            expect(week[5]).toStrictEqual(new Date('2022-08-12T00:00:00'));
            expect(week[6]).toStrictEqual(new Date('2022-08-13T00:00:00'));
        });

        it('returns a week with Sunday as the first day', () => {
            const week = getWeek(new Date('2022-03-04'));
            expect(week[0].toLocaleDateString('default', { weekday: 'long' })).toMatch(/sunday/i);
        });

        it('returns array of length 7', () => {
            const week = getWeek(new Date('2030-10-10'));
            expect(week.length).toBe(7);
        });
    });

    describe('getYearRange()', () => {
        it('should return the correct range', () => {
            expect(getYearRange(2000, 1)).toEqual([2000]);
            expect(getYearRange(2000, 2)).toEqual([2000, 2001]);
            expect(getYearRange(2000, 3)).toEqual([1999, 2000, 2001]);
            expect(getYearRange(2000, 4)).toEqual([1999, 2000, 2001, 2002]);
            expect(getYearRange(2000, 5)).toEqual([1998, 1999, 2000, 2001, 2002]);
            expect(getYearRange(2000, 6)).toEqual([1998, 1999, 2000, 2001, 2002, 2003]);
            expect(getYearRange(2000, 7)).toEqual([1997, 1998, 1999, 2000, 2001, 2002, 2003]);
            expect(getYearRange(2000, 8)).toEqual([1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004]);
            expect(getYearRange(2000, 9)).toEqual([1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004]);
            expect(getYearRange(2000, 10)).toEqual([1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005]);

            expect(getYearRange(1000, 10)).toEqual([996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005]);
        });

        it('should return the correct range with default year param', () => {
            expect(getYearRange(undefined, 1)).toEqual([new Date().getFullYear()]);
        });

        it('should return the correct range with default rangeLength param', () => {
            expect(getYearRange(2222)).toEqual([2218, 2219, 2220, 2221, 2222, 2223, 2224, 2225, 2226, 2227]);
        });
    });

    describe('isNextWeek()', () => {
        it('should return true for dates within the next week', () => {
            const currentDate = new Date(2022, 11, 15); // Thursday
            const nextWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 7, 0, 0, 0, 0);

            for (let i = 0; i < 7; i++) {
                expect(isNextWeek(new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() + i), currentDate)).toBe(true);
            }
        });

        it('should return false for dates outside the next week', () => {
            const currentDate = new Date(2022, 11, 15); // Thursday
            const nextWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 7, 0, 0, 0, 0);
            const nextWeekEnd = new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() + 6, 23, 59, 59, 999);

            expect(isNextWeek(new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() - 1), currentDate)).toBe(false);
            expect(isNextWeek(new Date(nextWeekEnd.getFullYear(), nextWeekEnd.getMonth(), nextWeekEnd.getDate() + 1), currentDate)).toBe(false);
            expect(isNextWeek(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3), currentDate)).toBe(false);
        });

        it('should use the current date if dateToCheckAgainst is not provided', () => {
            const currentDate = new Date();
            const nextWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 7, 0, 0, 0, 0);
            const nextWeekEnd = new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() + 6, 23, 59, 59, 999);

            expect(isNextWeek(nextWeekStart)).toBe(true);
            expect(isNextWeek(new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() + 3))).toBe(true);
            expect(isNextWeek(nextWeekEnd)).toBe(true);
        });

        it('should return true for dates on the same day as the start or end of the next week', () => {
            const currentDate = new Date(2022, 11, 15); // Thursday
            const nextWeekStart = new Date(2022, 11, 18, 0, 0, 0, 0);
            const nextWeekEnd = new Date(2022, 11, 23, 23, 59, 59, 999);

            expect(isNextWeek(nextWeekStart, currentDate)).toBe(true);
            expect(isNextWeek(nextWeekEnd, currentDate)).toBe(true);
        });

        it('should return false for dates on the same day as dateToCheckAgainst', () => {
            const currentDate = new Date(2022, 11, 15); // Thursday

            expect(isNextWeek(currentDate, currentDate)).toBe(false);
        });

        it('should use dateToCheckAgainst if provided', () => {
            const currentDate = new Date(2022, 11, 15); // Thursday
            const nextWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 7, 0, 0, 0, 0);
            expect(isNextWeek(nextWeekStart, currentDate)).toBe(true);
        });

        it('should return false for dates in a different year but within the next week', () => {
            const currentDate = new Date(2022, 11, 31); // Friday
            const nextWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 7, 0, 0, 0, 0);
            const nextWeekEnd = new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() + 6, 23, 59, 59, 999);

            expect(isNextWeek(new Date(nextWeekStart.getFullYear() + 1, nextWeekStart.getMonth(), nextWeekStart.getDate()), currentDate)).toBe(false);
            expect(isNextWeek(new Date(nextWeekEnd.getFullYear() + 1, nextWeekEnd.getMonth(), nextWeekEnd.getDate()), currentDate)).toBe(false);

            expect(isNextWeek(new Date(nextWeekStart.getFullYear() - 1, nextWeekStart.getMonth(), nextWeekStart.getDate()), currentDate)).toBe(false);
            expect(isNextWeek(new Date(nextWeekEnd.getFullYear() - 1, nextWeekEnd.getMonth(), nextWeekEnd.getDate()), currentDate)).toBe(false);
        });

    });

    describe('isPrevWeek()', () => {
        it('should return true for each day within the previous week', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const prevWeekStart = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth(), dateToCheckAgainst.getDate() - dateToCheckAgainst.getDay() - 7, 0, 0, 0, 0);
            const prevWeekEnd = new Date(prevWeekStart.getFullYear(), prevWeekStart.getMonth(), prevWeekStart.getDate() + 6, 23, 59, 59, 999);

            for (let d = prevWeekStart; d <= prevWeekEnd; d.setDate(d.getDate() + 1)) {
                expect(isPrevWeek(d, dateToCheckAgainst)).toBe(true);
            }
        });

        it('should return false for multiple dates that are not within the previous week', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const dates = [
                new Date(2022, 6, 15, 10, 15, 30, 450), // Friday, July 15, 2022, 10:15:30.450 AM
                new Date(2022, 6, 16, 22, 45), // Saturday, July 16, 2022, 10:45 PM
                new Date(2022, 6, 16, 23, 59, 59, 999), // Saturday, July 16, 2022, 11:59:59.999 PM
                new Date(2022, 6, 24, 0), // Sunday, July 24, 2022, 12:00 AM
                new Date(2022, 6, 26, 12), // Tuesday, July 26, 2022, 12:00 PM
                new Date(2021, 11, 31, 0), // Friday, December 31, 2021, 12:00 AM
                new Date(2021, 0, 6, 12), // Saturday, January 1, 2021, 12:00 PM
                new Date(2023, 0, 6, 16, 59, 59, 999), // Sunday, July 16, 2023, 11:59:59.999 PM
                new Date(2023, 0, 6, 22, 15, 30, 450), // Saturday, July 22, 2023, 10:15:30.450 AM
            ];

            for (const date of dates) {
                expect(isPrevWeek(date, dateToCheckAgainst)).toBe(false);
            }
        });
    });

    describe('isPrevMonth()', () => {
        it('should return true for each day within the previous month', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const prevMonthStart = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth() - 1, 1, 0, 0, 0, 0);
            const prevMonthEnd = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth(), 0, 23, 59, 59, 999);

            for (let d = prevMonthStart; d <= prevMonthEnd; d.setDate(d.getDate() + 1)) {
                expect(isPrevMonth(d, dateToCheckAgainst)).toBe(true);
            }
        });

        it('should return false for multiple dates that are not within the previous month', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const dates = [
                new Date(2022, 4, 31, 23, 59, 59, 999), // Tuesday, May 31, 2022, 11:59:59.999 PM
                new Date(2022, 6, 1, 0, 0, 0, 0), // Friday, July 1, 2022, 12:00 AM
                new Date(2022, 6, 16, 22, 45), // Saturday, July 16, 2022, 10:45 PM
                new Date(2022, 6, 16, 23, 59, 59, 999), // Saturday, July 16, 2022, 11:59:59.999 PM
                new Date(2022, 6, 24, 0), // Sunday, July 24, 2022, 12:00 AM
                new Date(2022, 6, 26, 12), // Tuesday, July 26, 2022, 12:00 PM
                new Date(2021, 11, 31, 0), // Friday, December 31, 2021, 12:00 AM
                new Date(2021, 0, 1, 12), // Saturday, January 1, 2021, 12:00 PM
                new Date(2023, 0, 1, 23, 59, 59, 999), // Saturday, January 1, 2023, 11:59:59.999 PM
                new Date(2023, 0, 2, 10, 15, 30, 450), // Sunday, January 2, 2023, 10:15:30.450 AM
                new Date(2021, 3, 30, 12), // Friday, April 30, 2021, 12:00 PM
                new Date(2023, 2, 29, 23, 59, 59, 999), // Wednesday, March 29, 2023, 11:59:59.999 PM
                new Date(2023, 1, 28, 10, 15, 30, 450), // Wednesday, February 28, 2023, 10:15:30.450 AM
            ];

            for (const date of dates) {
                expect(isPrevMonth(date, dateToCheckAgainst)).toBe(false);
            }
        });
    });

    describe('isNextMonth()', () => {
        it('should return true for each day within the next month', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const nextMonthStart = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth() + 1, 1, 0, 0, 0, 0);
            const nextMonthEnd = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth() + 2, 0, 23, 59, 59, 999);

            for (let d = nextMonthStart; d <= nextMonthEnd; d.setDate(d.getDate() + 1)) {
                expect(isNextMonth(d, dateToCheckAgainst)).toBe(true);
            }
        });

        it('should return false for multiple dates that are not within the next month', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const dates = [
                new Date(2022, 4, 31, 23, 59, 59, 999), // Tuesday, May 31, 2022, 11:59:59.999 PM
                new Date(2022, 6, 31, 23, 59, 59, 999), // Sunday, July 31, 2022, 11:59:59.999 PM
                new Date(2022, 6, 16, 22, 45), // Saturday, July 16, 2022, 10:45 PM
                new Date(2022, 6, 16, 23, 59, 59, 999), // Saturday, July 16, 2022, 11:59:59.999 PM
                new Date(2022, 6, 24, 0), // Sunday, July 24, 2022, 12:00 AM
                new Date(2022, 6, 26, 12), // Tuesday, July 26, 2022, 12:00 PM
                new Date(2022, 8, 1, 0, 0, 0, 0), // Tuesday, September 1, 2022, 12:00 AM
                new Date(2021, 11, 31, 0), // Friday, December 31, 2021, 12:00 AM
                new Date(2021, 0, 1, 12), // Saturday, January 1, 2021, 12:00 PM
                new Date(2023, 0, 1, 23, 59, 59, 999), // Saturday, January 1, 2023, 11:59:59.999 PM
                new Date(2023, 0, 2, 10, 15, 30, 450), // Sunday, January 2, 2023, 10:15:30.450 AM
                new Date(2021, 3, 30, 12), // Friday, April 30, 2021, 12:00 PM
                new Date(2023, 2, 29, 23, 59, 59, 999), // Wednesday, March 29, 2023, 11:59:59.999 PM
                new Date(2023, 1, 28, 10, 15, 30, 450), // Wednesday, February 28, 2023, 10:15:30.450 AM
            ];

            for (const date of dates) {
                expect(isNextMonth(date, dateToCheckAgainst)).toBe(false);
            }
        });
    });

    describe('isPrevYear', () => {
        it('should return true for each day within the previous year', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const prevYearStart = new Date(dateToCheckAgainst.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
            const prevYearEnd = new Date(dateToCheckAgainst.getFullYear(), 0, 0, 23, 59, 59, 999);

            for (let d = prevYearStart; d <= prevYearEnd; d.setDate(d.getDate() + 1)) {
                expect(isPrevYear(d, dateToCheckAgainst)).toBe(true);
            }
        });

        it('should return false for multiple dates that are not within the previous year', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const dates = [
                new Date(2022, 6, 1, 0, 0, 0, 0), // Friday, July 1, 2022, 12:00 AM
                new Date(2022, 6, 16, 22, 45), // Saturday, July 16, 2022, 10:45 PM
                new Date(2022, 6, 16, 23, 59, 59, 999), // Saturday, July 16, 2022, 11:59:59.999 PM
                new Date(2022, 6, 24, 0), // Sunday, July 24, 2022, 12:00 AM
                new Date(2022, 6, 26, 12), // Tuesday, July 26, 2022, 12:00 PM
                new Date(2022, 0, 1, 0, 0, 0, 0), // Saturday, January 1, 2022, 12:00 AM
                new Date(2020, 11, 31, 23, 59, 59, 999), // Tuesday, December 31, 2020, 11:59:59.999 PM
            ];

            for (const date of dates) {
                expect(isPrevYear(date, dateToCheckAgainst)).toBe(false);
            }
        });
    });

    describe('isNextYear', () => {
        it('should return true for each day within the next year', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const nextYearStart = new Date(dateToCheckAgainst.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
            const nextYearEnd = new Date(dateToCheckAgainst.getFullYear() + 2, 0, 0, 23, 59, 59, 999);

            for (let d = nextYearStart; d <= nextYearEnd; d.setDate(d.getDate() + 1)) {
                expect(isNextYear(d, dateToCheckAgainst)).toBe(true);
            }
        });

        it('should return false for multiple dates that are not within the next year', () => {
            const dateToCheckAgainst = new Date(2022, 6, 25); // Monday, July 25, 2022
            const dates = [
                new Date(2022, 6, 1, 0, 0, 0, 0), // Friday, July 1, 2022, 12:00 AM
                new Date(2022, 6, 16, 22, 45), // Saturday, July 16, 2022, 10:45 PM
                new Date(2022, 6, 16, 23, 59, 59, 999), // Saturday, July 16, 2022, 11:59:59.999 PM
                new Date(2022, 6, 24, 0), // Sunday, July 24, 2022, 12:00 AM
                new Date(2022, 6, 26, 12), // Tuesday, July 26, 2022, 12:00 PM
                new Date(2024, 0, 1, 0, 0, 0, 0), // Monday, January 1, 2024, 12:00 AM
            ];


            for (const date of dates) {
                expect(isNextYear(date, dateToCheckAgainst)).toBe(false);
            }
        });
    });

});
