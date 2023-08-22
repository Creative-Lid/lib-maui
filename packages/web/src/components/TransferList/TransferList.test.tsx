/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import TransferList from './TransferList';

it('it renders left list correctly', () => {
    const leftList = [
        { id: '1', value: 'item 1' },
        { id: '2', value: 'item 2' },
        { id: '3', value: 'long long long long item 3' },
    ];
    render(
        <TransferList
            leftList={leftList}
            rightList={[]}
            onLeftListChange={() => {
                return;
            }}
            onRightListChange={() => {
                return;
            }}
        />,
    );

    const leftListElement = screen.getByLabelText('left list');
    const leftListItems =
        within(leftListElement).getAllByRole('transfer-list-item');
    expect(leftListItems.length).toBe(3);
    expect(leftListItems[0]).toHaveTextContent('item 1');
    expect(leftListItems[1]).toHaveTextContent('item 2');
    expect(leftListItems[2]).toHaveTextContent('long long long long item 3');
});

it('it renders right list correctly', () => {
    const rightList = [
        { id: '4', value: 'item 4' },
        { id: '5', value: 'item 5' },
    ];
    render(
        <TransferList
            leftList={[]}
            rightList={rightList}
            onLeftListChange={() => {
                return;
            }}
            onRightListChange={() => {
                return;
            }}
        />,
    );

    const leftListElement = screen.getByLabelText('right list');
    const leftListItems =
        within(leftListElement).getAllByRole('transfer-list-item');
    expect(leftListItems.length).toBe(2);
    expect(leftListItems[0]).toHaveTextContent('item 4');
    expect(leftListItems[1]).toHaveTextContent('item 5');
});

it('fires "onLeftListChange" and "onRightListChange" callbacks with a correct argument when an item is moved right', async () => {
    const onLeftListChange = jest.fn();
    const onRightListChange = jest.fn();
    render(
        <TransferList
            onLeftListChange={onLeftListChange}
            onRightListChange={onRightListChange}
            leftList={[
                { id: 'id-1', value: 'item 1' },
                { id: 'id-2', value: 'item 2' },
            ]}
            rightList={[]}
        />,
    );
    const item = screen.getByText(/item 1/i);
    await userEvent.click(item);

    const moveRightButton = screen.getByRole('button', {
        name: /move left-selected/i,
    });
    await userEvent.click(moveRightButton);

    expect(onLeftListChange).toHaveBeenCalledTimes(1);
    expect(onLeftListChange).toHaveBeenCalledWith([
        { id: 'id-2', value: 'item 2' },
    ]);

    expect(onRightListChange).toHaveBeenCalledTimes(1);
    expect(onRightListChange).toHaveBeenCalledWith([
        { id: 'id-1', value: 'item 1' },
    ]);
});

it('fires "onLeftListChange" and "onRightListChange" callbacks with a correct argument when an item is moved left', async () => {
    const onLeftListChange = jest.fn();
    const onRightListChange = jest.fn();
    render(
        <TransferList
            onLeftListChange={onLeftListChange}
            onRightListChange={onRightListChange}
            leftList={[]}
            rightList={[
                { id: 'id-1', value: 'item 1' },
                { id: 'id-2', value: 'item 2' },
            ]}
        />,
    );
    const item = screen.getByText(/item 2/i);
    await userEvent.click(item);

    const moveRightButton = screen.getByRole('button', {
        name: /move right-selected/i,
    });
    await userEvent.click(moveRightButton);

    expect(onLeftListChange).toHaveBeenCalledTimes(1);
    expect(onLeftListChange).toHaveBeenCalledWith([
        { id: 'id-2', value: 'item 2' },
    ]);

    expect(onRightListChange).toHaveBeenCalledTimes(1);
    expect(onRightListChange).toHaveBeenCalledWith([
        { id: 'id-1', value: 'item 1' },
    ]);
});

it('fires "onLeftListChange" and "onRightListChange" callbacks with a correct argument when all items are moved left', async () => {
    const onLeftListChange = jest.fn();
    const onRightListChange = jest.fn();
    render(
        <TransferList
            onLeftListChange={onLeftListChange}
            onRightListChange={onRightListChange}
            leftList={[]}
            rightList={[
                { id: 'id-1', value: 'item 1' },
                { id: 'id-2', value: 'item 2' },
            ]}
        />,
    );

    const moveAllLeft = screen.getByRole('button', { name: /move all left/i });
    await userEvent.click(moveAllLeft);

    expect(onLeftListChange).toHaveBeenCalledTimes(1);
    expect(onLeftListChange).toHaveBeenCalledWith([
        { id: 'id-1', value: 'item 1' },
        { id: 'id-2', value: 'item 2' },
    ]);

    expect(onRightListChange).toHaveBeenCalledTimes(1);
    expect(onRightListChange).toHaveBeenCalledWith([]);
});

it('fires "onLeftListChange" and "onRightListChange" callbacks with a correct argument when all items are moved right', async () => {
    const onLeftListChange = jest.fn();
    const onRightListChange = jest.fn();
    render(
        <TransferList
            onLeftListChange={onLeftListChange}
            onRightListChange={onRightListChange}
            leftList={[
                { id: 'id-1', value: 'item 1' },
                { id: 'id-2', value: 'item 2' },
            ]}
            rightList={[]}
        />,
    );

    const moveAllLeft = screen.getByRole('button', { name: /move all right/i });
    await userEvent.click(moveAllLeft);

    expect(onLeftListChange).toHaveBeenCalledTimes(1);
    expect(onLeftListChange).toHaveBeenCalledWith([]);

    expect(onRightListChange).toHaveBeenCalledTimes(1);
    expect(onRightListChange).toHaveBeenCalledWith([
        { id: 'id-1', value: 'item 1' },
        { id: 'id-2', value: 'item 2' },
    ]);
});
