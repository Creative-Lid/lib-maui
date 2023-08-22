/**
 * @jest-environment jsdom
 */

// Tests for react-dropzone functionality already exist
// https://github.com/react-dropzone/react-dropzone/blob/master/src/index.spec.js
// We are simply testing to see if the 'Choose File' button is shown or not depending on props

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import FileUpload from './FileUpload';

describe('Render dropzone without "Choose File" button', () => {
    beforeEach(() => {
        const props = {};
        render(
            <FileUpload
                {...props}
                onFilesChange={(files) => console.log(files)}
            />,
        );
    });

    it('renders without "Choose File" button', () => {
        expect(
            screen.queryByRole('button', { name: 'Choose File' }),
        ).not.toBeInTheDocument();
    });
});

describe('Render dropzone with "Choose File" button', () => {
    beforeEach(() => {
        const props = { browseButton: true };
        render(
            <FileUpload
                {...props}
                onFilesChange={(files) => console.log(files)}
            />,
        );
    });

    it('renders with "Choose File" button', () => {
        expect(
            screen.getByRole('button', { name: 'Choose File' }),
        ).toBeInTheDocument();
    });
});

it('should not display file names upon upload if disabled', async () => {
    const user = userEvent.setup();
    const onFilesChange = jest.fn();
    render(<FileUpload onFilesChange={onFilesChange} disabled={true} />);
    const files = [
        new File(['(⌝□_□)'], 'chucknorris.png', { type: 'image/png' }),
        new File(['(⌝□_□)(⌝□_□)'], 'chucknorris2.png', { type: 'image/png' }),
    ];

    const input = screen.getByTestId('drop-input');
    await act(async () => {
        await user.upload(input, files);
    });

    expect(screen.queryByText(/chucknorris.png/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/chucknorris2.png/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/chucknorris3.png/i)).not.toBeInTheDocument();
});

it('should not call onFilesChange if disabled', async () => {
    const user = userEvent.setup();
    const onFilesChange = jest.fn();
    render(<FileUpload onFilesChange={onFilesChange} disabled />);
    const files = [
        new File(['(⌝□_□)'], 'chucknorris.png', { type: 'image/png' }),
        new File(['(⌝□_□)(⌝□_□)'], 'chucknorris2.png', { type: 'image/png' }),
    ];

    const input = screen.getByTestId('drop-input');
    await act(async () => {
        await user.upload(input, files);
    });

    expect(onFilesChange).not.toBeCalled();
});

it('should display file names upon upload', async () => {
    const user = userEvent.setup();

    const onFilesChange = jest.fn();

    render(<FileUpload onFilesChange={onFilesChange} />);

    const files = [
        new File(['(⌝□_□)'], 'chucknorris.png', { type: 'image/png' }),
        new File(['(⌝□_□)(⌝□_□)'], 'chucknorris2.png', { type: 'image/png' }),
    ];

    const input = screen.getByTestId('drop-input');
    await act(async () => {
        await user.upload(input, files);
    });

    expect(screen.getByText(/chucknorris.png/i)).toBeVisible();
    expect(screen.getByText(/chucknorris2.png/i)).toBeVisible();
    expect(screen.queryByText(/chucknorris3.png/i)).not.toBeInTheDocument();
});

it('should call onFilesChange with correct arguments', async () => {
    const user = userEvent.setup();

    const onFilesChange = jest.fn();

    render(<FileUpload onFilesChange={onFilesChange} />);

    const files = [
        new File(['(⌝□_□)'], 'chucknorris.png', { type: 'image/png' }),
        new File(['(⌝□_□)(⌝□_□)'], 'chucknorris2.png', { type: 'image/png' }),
    ];

    const input = screen.getByTestId('drop-input');
    await act(async () => {
        await user.upload(input, files);
    });

    expect(onFilesChange).toBeCalled();
    expect(onFilesChange).toBeCalledWith(files);
});
