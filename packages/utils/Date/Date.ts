export const formatTimeRange = (startDate: Date, endDate: Date) => {
    const startDateFormatted = startDate.toLocaleString('en-US', {
        timeStyle: 'short',
    });
    const endDateFormatted = endDate.toLocaleString('en-US', {
        timeStyle: 'short',
    });

    return `${startDateFormatted} - ${endDateFormatted}`;
};

export const getDateTitleForMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const getFirstDayOfWeek = (dateFromArgs: Date) => {
    const date = new Date(dateFromArgs); // avoid mutation
    date.setHours(0, 0, 0, 0);
    const firstDayOfWeek = date.getDate() - date.getDay();
    date.setDate(firstDayOfWeek);
    return date;
};

export const getLastDayOfWeek = (dateFromArgs: Date) => {
    const firstDayOfWeek = getFirstDayOfWeek(dateFromArgs);
    return new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 6));
};

export const getDateTitleRangeForWeek = (date: Date) => {
    const firstDayOfWeek = getFirstDayOfWeek(date);
    const lastDayOfWeek = getLastDayOfWeek(date);

    const startDate = firstDayOfWeek.toLocaleString('en-US', {
        day: 'numeric',
        ...(firstDayOfWeek.getMonth() !== lastDayOfWeek.getMonth() && { month: 'short' }), // if month is the same, don't show it
        ...(firstDayOfWeek.getFullYear() !== lastDayOfWeek.getFullYear() && { year: 'numeric' }), // if year is the same, don't show it
    });
    const endDate = `${lastDayOfWeek.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    return `${startDate} - ${endDate}`;
};

export const getFullMonthNames = () => {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
};

export const getWeek = (dateFromArgs: Date) => {
    const date = getFirstDayOfWeek(dateFromArgs); // avoid mutation
    const week: Date[] = [new Date(date)];

    for (let i = 0; i < 6; i++) {
        week.push(
            new Date(date.setDate(date.getDate() + 1)),
        );
    }

    return week;
};

export const getMonthByWeeks = (dateFromArgs: Date) => {
    const date = new Date(dateFromArgs); // avoid mutation
    date.setDate(1);
    date.setHours(0, 0, 0, 0);

    const lastDayOfMonth = new Date(dateFromArgs.getFullYear(), dateFromArgs.getMonth() + 1, 0).getDate();
    const monthIndex = dateFromArgs.getMonth();

    const monthByWeeks: ReturnType<typeof getWeek>[] = [];

    // append weeks until current week will include last day of a month
    while (
        !monthByWeeks[monthByWeeks.length - 1]?.some((d) => (
            d.getMonth() === monthIndex
            && d.getDate() === lastDayOfMonth
        ))
    ) {
        monthByWeeks.push(getWeek(date));
        date.setDate(date.getDate() + 7);
    }

    return monthByWeeks;
};

/**
 * @param {number} [year=new Date().getFullYear()] Year to get the range around it.
 * @param {number} [rangeLength=10] Length of the range to return.
 */
export const getYearRange = (year = new Date().getFullYear(), rangeLength = 10) => {
    const startYear = Math.floor(year - rangeLength / 2) + 1;
    const endYear = Math.floor(year + rangeLength / 2);

    const years: number[] = [];

    for (let y = startYear; y <= endYear; y++) {
        years.push(y);
    }

    return years;
};

/**
 * @param {Date} date Date to check.
 * @param {Date} [dateToCheckAgainst=new Date()] Date to check against.
 */
export const isPrevWeek = (date: Date, dateToCheckAgainst: Date = new Date()): boolean => {
    const lastWeekStart = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth(), dateToCheckAgainst.getDate() - dateToCheckAgainst.getDay() - 7, 0, 0, 0, 0);
    const lastWeekEnd = new Date(lastWeekStart.getFullYear(), lastWeekStart.getMonth(), lastWeekStart.getDate() + 6, 23, 59, 59, 999);

    return date >= lastWeekStart && date <= lastWeekEnd;
};

/**
 * @param {Date} date Date to check.
 * @param {Date} [dateToCheckAgainst=new Date()] Date to check against.
 */
export const isNextWeek = (date: Date, dateToCheckAgainst: Date = new Date()): boolean => {
    const nextWeekStart = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth(), dateToCheckAgainst.getDate() - dateToCheckAgainst.getDay() + 7, 0, 0, 0, 0);
    const nextWeekEnd = new Date(nextWeekStart.getFullYear(), nextWeekStart.getMonth(), nextWeekStart.getDate() + 6, 23, 59, 59, 999);

    return date >= nextWeekStart && date <= nextWeekEnd;
};

/**
 * @param {Date} date Date to check.
 * @param {Date} [dateToCheckAgainst=new Date()] Date to check against.
 */
export const isPrevMonth = (date: Date, dateToCheckAgainst: Date = new Date()): boolean => {
    const lastMonthStart = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth() - 1, 1, 0, 0, 0, 0);
    const lastMonthEnd = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth(), 0, 23, 59, 59, 999);

    return date >= lastMonthStart && date <= lastMonthEnd;
};

/**
 * @param {Date} date Date to check.
 * @param {Date} [dateToCheckAgainst=new Date()] Date to check against.
 */
export const isNextMonth = (date: Date, dateToCheckAgainst: Date = new Date()): boolean => {
    const nextMonthStart = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth() + 1, 1, 0, 0, 0, 0);
    const nextMonthEnd = new Date(dateToCheckAgainst.getFullYear(), dateToCheckAgainst.getMonth() + 2, 0, 23, 59, 59, 999);

    return date >= nextMonthStart && date <= nextMonthEnd;
};

/**
 * @param {Date} date Date to check.
 * @param {Date} [dateToCheckAgainst=new Date()] Date to check against.
 */
export const isPrevYear = (date: Date, dateToCheckAgainst: Date = new Date()): boolean => {
    const lastYearStart = new Date(dateToCheckAgainst.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
    const lastYearEnd = new Date(dateToCheckAgainst.getFullYear(), 0, 0, 23, 59, 59, 999);

    return date >= lastYearStart && date <= lastYearEnd;
};

/**
 * @param {Date} date Date to check.
 * @param {Date} [dateToCheckAgainst=new Date()] Date to check against.
 */
export const isNextYear = (date: Date, dateToCheckAgainst: Date = new Date()): boolean => {
    const nextYearStart = new Date(dateToCheckAgainst.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
    const nextYearEnd = new Date(dateToCheckAgainst.getFullYear() + 2, 0, 0, 23, 59, 59, 999);

    return date >= nextYearStart && date <= nextYearEnd;
};

/**
 * Returns start and end of a day.
 * @param {Date} date
 */
export const getDayBounds = (date: Date): { dayStart: Date, dayEnd: Date, } => {
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

    return { dayStart, dayEnd };
};

/**
 * Returns start and end of a week.
 * @param {Date} date
 */
export const getWeekBounds = (date: Date): { weekStart: Date, weekEnd: Date, } => {
    const weekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay(), 0, 0, 0, 0);
    const weekEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6, 23, 59, 59, 999);

    return { weekStart, weekEnd };
};

/**
 * Returns start and end of a month.
 * @param {Date} date
 */
export const getMonthBounds = (date: Date): { monthStart: Date, monthEnd: Date, } => {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

    return { monthStart, monthEnd };
};

/**
 * Returns start and end of a year.
 * @param {Date} date
 */
export const getYearBounds = (date: Date): { yearStart: Date, yearEnd: Date, } => {
    const yearStart = new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
    const yearEnd = new Date(date.getFullYear() + 1, 0, 0, 23, 59, 59, 999);

    return { yearStart, yearEnd };
};

/**
 * Returns start and end of yesterday.
 */
export const getYesterdayBounds = (): { yesterdayStart: Date, yesterdayEnd: Date, } => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    const { dayStart: yesterdayStart, dayEnd: yesterdayEnd } = getDayBounds(yesterday);

    return { yesterdayStart, yesterdayEnd };
};

/**
 * Returns start and end of today.
 */
export const getTodayBounds = (): { todayStart: Date, todayEnd: Date, } => {
    const { dayStart: todayStart, dayEnd: todayEnd } = getDayBounds(new Date());

    return { todayStart, todayEnd };
};

/**
 * Returns start and end of tomorrow.
 */
export const getTomorrowBounds = (): { tomorrowStart: Date, tomorrowEnd: Date, } => {
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

    const { dayStart: tomorrowStart, dayEnd: tomorrowEnd } = getDayBounds(tomorrow);

    return { tomorrowStart, tomorrowEnd };
};

/**
 * Returns start and end of previous week.
 */
export const getPreviousWeekBounds = (): { previousWeekStart: Date, previousWeekEnd: Date, } => {
    const previousWeek = new Date(new Date().setDate(new Date().getDate() - 7));

    const { weekStart: previousWeekStart, weekEnd: previousWeekEnd } = getWeekBounds(previousWeek);

    return { previousWeekStart, previousWeekEnd };
};

/**
 * Returns start and end of current week.
 */
export const getCurrentWeekBounds = (): { currentWeekStart: Date, currentWeekEnd: Date, } => {
    const { weekStart: currentWeekStart, weekEnd: currentWeekEnd } = getWeekBounds(new Date());

    return { currentWeekStart, currentWeekEnd };
};

/**
 * Returns start and end of next week.
 */
export const getNextWeekBounds = (): { nextWeekStart: Date, nextWeekEnd: Date, } => {
    const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7));

    const { weekStart: nextWeekStart, weekEnd: nextWeekEnd } = getWeekBounds(nextWeek);

    return { nextWeekStart, nextWeekEnd };
};

/**
 * Returns start and end of previous month.
 */
export const getPreviousMonthBounds = (): { previousMonthStart: Date, previousMonthEnd: Date, } => {
    const previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

    const { monthStart: previousMonthStart, monthEnd: previousMonthEnd } = getMonthBounds(previousMonth);

    return { previousMonthStart, previousMonthEnd };
};

/**
 * Returns start and end of current month.
 */
export const getCurrentMonthBounds = (): { currentMonthStart: Date, currentMonthEnd: Date, } => {
    const { monthStart: currentMonthStart, monthEnd: currentMonthEnd } = getMonthBounds(new Date());

    return { currentMonthStart, currentMonthEnd };
};

/**
 * Returns start and end of next month.
 */
export const getNextMonthBounds = (): { nextMonthStart: Date, nextMonthEnd: Date, } => {
    const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

    const { monthStart: nextMonthStart, monthEnd: nextMonthEnd } = getMonthBounds(nextMonth);

    return { nextMonthStart, nextMonthEnd };
};

/**
 * Returns start and end of previous year.
 */
export const getPreviousYearBounds = (): { previousYearStart: Date, previousYearEnd: Date, } => {
    const previousYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    const { yearStart: previousYearStart, yearEnd: previousYearEnd } = getYearBounds(previousYear);

    return { previousYearStart, previousYearEnd };
};

/**
 * Returns start and end of current year.
 */
export const getCurrentYearBounds = (): { currentYearStart: Date, currentYearEnd: Date, } => {
    const { yearStart: currentYearStart, yearEnd: currentYearEnd } = getYearBounds(new Date());

    return { currentYearStart, currentYearEnd };
};

/**
 * Returns start and end of next year.
 */
export const getNextYearBounds = (): { nextYearStart: Date, nextYearEnd: Date, } => {
    const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    const { yearStart: nextYearStart, yearEnd: nextYearEnd } = getYearBounds(nextYear);

    return { nextYearStart, nextYearEnd };
};
