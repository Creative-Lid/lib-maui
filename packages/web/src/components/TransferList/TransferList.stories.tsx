import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransferList from './TransferList';
import {
    TransferListItem,
    ListHeaderComponentProps,
} from './TransferListTypes';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Button from '../Button';
import Divider from '../Divider';

export default {
    title: 'MAUI/Data Display/TransferList',
    component: TransferList,
} as ComponentMeta<typeof TransferList>;

const initialLeftList: readonly TransferListItem[] = [
    { id: '1', value: 'item 1' },
    { id: '2', value: 'item 2' },
    { id: '3', value: 'long long long long item 3' },
];

const initialRightList: readonly TransferListItem[] = [
    { id: '4', value: 'item 4' },
    { id: '5', value: 'item 5' },
];

const Template: ComponentStory<typeof TransferList> = (args) => {
    const [leftList, setLeftList] = useState(initialLeftList);
    const [rightList, setRightList] = useState(initialRightList);

    return (
        <TransferList
            {...args}
            leftList={leftList}
            rightList={rightList}
            onLeftListChange={setLeftList}
            onRightListChange={setRightList}
        />
    );
};

export const Default = Template.bind({});

const CustomizedTemplate: ComponentStory<typeof TransferList> = (args) => {
    const [leftList, setLeftList] = useState(initialLeftList);
    const [rightList, setRightList] = useState(initialRightList);

    return (
        <TransferList
            {...args}
            leftList={leftList}
            rightList={rightList}
            onLeftListChange={setLeftList}
            onRightListChange={setRightList}
            width={1000}
            height={200}
            checkboxSize='small'
            listItemTextComponent={(props: TransferListItem) => (
                <Typography fontSize={12}>{props.value}</Typography>
            )}
            controlsComponent={(props) => (
                <Stack direction='column' height='100%' justifyContent='center'>
                    <Button
                        onClick={props.handleCheckedRight}
                        disabled={props.leftChecked.length === 0}
                        aria-label='move selected right'
                    >
                        Add
                    </Button>
                    <Button
                        onClick={props.handleCheckedLeft}
                        disabled={props.rightChecked.length === 0}
                        aria-label='move selected left'
                    >
                        Remove
                    </Button>
                    <Divider
                        sx={{ width: '100%', marginTop: 1, marginBottom: 1 }}
                    />
                    <Button
                        onClick={props.handleAllRight}
                        disabled={leftList.length === 0}
                        aria-label='move all right'
                    >
                        Add all
                    </Button>
                    <Button
                        onClick={props.handleAllLeft}
                        disabled={rightList.length === 0}
                        aria-label='move all left'
                    >
                        Remove all
                    </Button>
                </Stack>
            )}
            leftListHeaderComponent={(props: ListHeaderComponentProps) => (
                <>
                    <CardHeader
                        title='Left List'
                        subheader={`${props.checked.length}/${leftList.length} selected`}
                    />
                    <Divider />
                </>
            )}
            rightListHeaderComponent={(props: ListHeaderComponentProps) => (
                <>
                    <CardHeader
                        title='Right List'
                        subheader={`${props.checked.length}/${rightList.length} selected`}
                    />
                    <Divider />
                </>
            )}
        />
    );
};

export const Customized = CustomizedTemplate.bind({});
