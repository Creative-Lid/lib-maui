/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import TextField from './TextField';

it('renders correctly gap between label and input when label', () => {
    render(<TextField label='testLabel' labelGutter={1} />);

    const labelElement = screen.getByText(/testLabel/i);
    const labelContainer = labelElement.parentElement;
    if (!labelContainer) {
        throw new Error('Label container not found');
    }
    const containerStyle = window.getComputedStyle(labelContainer);

    expect(containerStyle.gap).toBe('8px');
});

it('renders a label accordingly to the labelPosition prop', () => {
    render(<TextField label='testLabel' labelPosition='top' />);

    const labelElementTop = screen.getByText(/testLabel/i);
    const labelContainerTop = labelElementTop.parentElement;
    if (!labelContainerTop) {
        throw new Error('Label container not found');
    }
    const containerStyleTop = window.getComputedStyle(labelContainerTop);

    expect(containerStyleTop.flexDirection).toBe('column');

    cleanup();

    render(<TextField label='testLabel' labelPosition='left' />);

    const labelElementLeft = screen.getByText(/testLabel/i);
    const labelContainerLeft = labelElementLeft.parentElement;
    if (!labelContainerLeft) {
        throw new Error('Label container not found');
    }
    const containerStyleLeft = window.getComputedStyle(labelContainerLeft);

    expect(containerStyleLeft.flexDirection).toBe('row');
});

it('default value of labelPosition prop is "top"', () => {
    render(<TextField label='testLabel' />);

    const labelElement = screen.getByText(/testLabel/i);
    const labelContainer = labelElement.parentElement;
    if (!labelContainer) {
        throw new Error('Label container not found');
    }
    const containerStyle = window.getComputedStyle(labelContainer);

    expect(containerStyle.flexDirection).toBe('column');
});

it('default value of labelGutter prop is 8px (default MUI spacing) if labelPosition is "top"', () => {
    render(<TextField label='testLabel' labelPosition='top' />);

    const labelElement = screen.getByText(/testLabel/i);
    const labelContainer = labelElement.parentElement;
    if (!labelContainer) {
        throw new Error('Label container not found');
    }
    const containerStyle = window.getComputedStyle(labelContainer);

    expect(containerStyle.gap).toBe('8px');
});

it('default value of labelGutter prop is 8px (default MUI spacing) if labelPosition is "left"', () => {
    render(<TextField label='testLabel' labelPosition='left' />);

    const labelElement = screen.getByText(/testLabel/i);
    const labelContainer = labelElement.parentElement;
    if (!labelContainer) {
        throw new Error('Label container not found');
    }
    const containerStyle = window.getComputedStyle(labelContainer);

    expect(containerStyle.gap).toBe('8px');
});
