/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { within } from '@testing-library/dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import TimePickerNoProvider, { TimePickerProps } from './TimePicker';
import TextField from '../TextField';

const TimePicker = (props: TimePickerProps) => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePickerNoProvider {...props} />
    </LocalizationProvider>
);

/* This functionality was replaced by MUI's code

it('opens menu when "open time-picker" button clicked', async () => {
    const user = userEvent.setup();
    render(<TimePicker onChange={() => { return; }} renderInput={props => <TextField {...props} />} value={new Date()} />);

    expect(screen.queryByRole('presentation', { name: 'time-picker menu'})).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: /open time-picker/i });
    await user.click(button);

    expect(screen.getByRole('presentation', { name: 'time-picker menu'})).toBeVisible();
}); */

it('fires "onChange" callback with a correct argument when menu-item is clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<TimePicker onChange={onChange} renderInput={props => <TextField {...props} />} value={new Date(2022, 7, 26, 11, 11, 11, 111)} />);

    const button = screen.getByRole('button', { name: /choose time/i });
    await user.click(button);

    const hoursList = screen.getByRole('menu', { name: /hours list/i });
    await user.click(within(hoursList).getByRole('menuitem', { name: '10' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith<[Date]>(new Date(2022, 7, 26, 10, 11, 11, 111));

    onChange.mockClear();

    const minutesList = screen.getByRole('menu', { name: /minutes list/i });
    await user.click(within(minutesList).getByRole('menuitem', { name: '00' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith<[Date]>(new Date(2022, 7, 26, 11, 0, 11, 111));

    onChange.mockClear();

    const pm = screen.getByRole('menuitem', { name: /pm/i });
    await user.click(pm);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith<[Date]>(new Date(2022, 7, 26, 23, 11, 11, 111));
});

/* This functionality was replaced by MUI's code

    it('fires "onChange" callback with a correct argument when user inputs value with keyboard', () => {
    const onChange = jest.fn();
    render(<TimePicker onChange={onChange} renderInput={props => <TextField {...props} />} value={new Date('2022-08-26T00:00:00')} />);

    const textField = screen.getByRole('textbox');

    fireEvent.change(textField, { target: { value: '1' } });
    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.change(textField, { target: { value: '1:' } });
    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.change(textField, { target: { value: '1:1' } });
    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.change(textField, { target: { value: '1:11' } });
    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.change(textField, { target: { value: '1:11 ' } });
    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.change(textField, { target: { value: '1:11 p' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith<[Date]>(new Date('2022-08-26T13:11:00'));
    fireEvent.change(textField, { target: { value: '1:11 pm' } });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith<[Date]>(new Date('2022-08-26T13:11:00'));
}); */

/** Removed functionality

it('displays "Invalid time" message when date object is invalid', () => {
    render(<TimePicker onChange={() => { return; }} renderInput={props => <TextField {...props} />} />);

    const textField = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.change(textField, { target: { value: '1:1' } });

    expect(screen.getByText(/invalid time/i)).toBeVisible();
});
*/

/** Removed functionality

it('displays "Minutes are not valid" message when minutes are not matching the minuteStep prop', () => {
    render(<TimePicker onChange={() => { return; }} renderInput={props => <TextField {...props} />} minuteStep={15}/>);

    const textField = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.change(textField, { target: { value: '1:14 pm' } });

    expect(screen.getByText(/minutes are not valid/i)).toBeVisible();
});
*/
