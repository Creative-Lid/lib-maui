import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Button from '../Button';
import {
    ListHeaderComponent,
    TransferListItem,
    TransferListProps,
} from './TransferListTypes';

function not(a: readonly TransferListItem[], b: readonly TransferListItem[]) {
    const aIds = a.map((item) => item.id);
    const bIds = b.map((item) => item.id);

    const notIds = aIds.filter((value) => bIds.indexOf(value) === -1);

    return a.filter((item) => notIds.includes(item.id));
}

function intersection(
    a: readonly TransferListItem[],
    b: readonly TransferListItem[],
) {
    const aIds = a.map((item) => item.id);
    const bIds = b.map((item) => item.id);

    const intersectionIds = aIds.filter((value) => bIds.indexOf(value) !== -1);

    return a.filter((item) => intersectionIds.includes(item.id));
}

const TransferList = (props: TransferListProps) => {
    const {
        leftList = [],
        rightList = [],
        onLeftListChange,
        onRightListChange,
        checkboxSize,
        width,
        height,
        listItemTextComponent: ListItemTextComponent,
        controlsComponent: ControlsComponent,
        leftListHeaderComponent: LeftListHeaderComponent,
        rightListHeaderComponent: RightListHeaderComponent,
    } = props;

    const [checked, setChecked] = useState<readonly TransferListItem[]>([]);

    const leftChecked = intersection(checked, leftList);
    const rightChecked = intersection(checked, rightList);

    const handleToggle = (value: TransferListItem) => () => {
        const currentIndex = checked.findIndex((c) => c.id == value.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedLeft = () => {
        onLeftListChange(leftList.concat(rightChecked));
        onRightListChange(not(rightList, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleCheckedRight = () => {
        onRightListChange(rightList.concat(leftChecked));
        onLeftListChange(not(leftList, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleAllLeft = () => {
        onLeftListChange(leftList.concat(rightList));
        onRightListChange([]);
    };

    const handleAllRight = () => {
        onRightListChange(rightList.concat(leftList));
        onLeftListChange([]);
    };

    const customList = (
        items: readonly TransferListItem[],
        checkedItems: TransferListItem[],
        CommonListHeaderComponent?: ListHeaderComponent,
    ) => (
        <Card sx={{ height: '100%' }}>
            {CommonListHeaderComponent && (
                <CommonListHeaderComponent checked={checkedItems} />
            )}
            <List dense role='list' sx={{ overflow: 'auto', height: height }}>
                {items.map((item: TransferListItem) => {
                    const labelId = `transfer-list-all-item-${item.id}-label`;

                    return (
                        <ListItem
                            key={item.id}
                            role='transfer-list-item'
                            button
                            onClick={handleToggle(item)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedItems.indexOf(item) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    size={checkboxSize}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={
                                    ListItemTextComponent ? (
                                        <ListItemTextComponent
                                            id={item.id}
                                            value={item.value}
                                        />
                                    ) : (
                                        item.value
                                    )
                                }
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (
        <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='stretch'
            width={width}
        >
            <Grid item xs={5} aria-label='left list'>
                {customList(leftList, leftChecked, LeftListHeaderComponent)}
            </Grid>
            <Grid item xs={2}>
                {ControlsComponent ? (
                    <ControlsComponent
                        handleCheckedLeft={handleCheckedLeft}
                        handleCheckedRight={handleCheckedRight}
                        handleAllLeft={handleAllLeft}
                        handleAllRight={handleAllRight}
                        leftChecked={leftChecked}
                        rightChecked={rightChecked}
                    />
                ) : (
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        height='100%'
                        justifyContent='center'
                    >
                        <Button
                            sx={{ my: 0.5 }}
                            variant='outlined'
                            size='small'
                            onClick={handleAllRight}
                            disabled={leftList.length === 0}
                            aria-label='move all right'
                        >
                            ≫
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant='outlined'
                            size='small'
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label='move left-selected'
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant='outlined'
                            size='small'
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label='move right-selected'
                        >
                            &lt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant='outlined'
                            size='small'
                            onClick={handleAllLeft}
                            disabled={rightList.length === 0}
                            aria-label='move all left'
                        >
                            ≪
                        </Button>
                    </Grid>
                )}
            </Grid>
            <Grid item xs={5} aria-label='right list'>
                {customList(rightList, rightChecked, RightListHeaderComponent)}
            </Grid>
        </Grid>
    );
};

export default TransferList;
