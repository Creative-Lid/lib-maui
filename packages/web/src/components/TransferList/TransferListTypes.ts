import { ReactElement } from 'react';

export interface TransferListProps {
    button?: boolean
    leftList?: readonly TransferListItem[],
    rightList?: readonly TransferListItem[],
    onLeftListChange: (leftList: readonly TransferListItem[]) => void,
    onRightListChange: (rightList: readonly TransferListItem[]) => void,
    /**
     * The component used to render the list-items-text. The list-item-value will be passed as a child.
     * @example ```jsx
     * listItemComponent={(props: TransferListItem) => <Typography fontSize={12}>{props.value}</Typography>}
     * ````
     * @param {TransferListItem} props The props of the input.
     * @returns {ReactElement} The node to render as the input.
     */
    listItemTextComponent?: (props: TransferListItem) => ReactElement;
    /**
     * @default 'medium'
     */
    checkboxSize?: 'small' | 'medium';
    /**
     * The component used to render the controls.
     * @example ```jsx
     * controlsComponent={(props) => (
     *    <Stack direction="column" height="100%" justifyContent="center">
     *        <Button
     *            onClick={props.handleCheckedRight}
     *            disabled={props.leftChecked.length === 0}
     *        >
     *            Add
     *        </Button>
     *        <Button
     *            onClick={props.handleCheckedLeft}
     *            disabled={props.rightChecked.length === 0}
     *        >
     *            Remove
     *        </Button>
     *        <Button
     *            onClick={props.handleAllRight}
     *            disabled={leftList.length === 0}
     *        >
     *            Add all
     *        </Button>
     *        <Button
     *            onClick={props.handleAllLeft}
     *            disabled={rightList.length === 0}
     *        >
     *            Remove all
     *        </Button>
     *    </Stack>
     * )}
     * ````
     */
    controlsComponent?: (props: ControlsComponentProps) => ReactElement;
    /**
     * The width of the Transfer List.
     * @default 100% of the parent
     */
    width?: string | number;
    /**
     * The height of the Transfer List. If list-items will not fit in the specified height, a scrollbar will appear.
     * @default fit the content
     */
    height?: string | number;
    /**
     * The component used to render a list header.
     * @example ```jsx
     * leftListHeaderComponent={(props: ListHeaderComponentProps) => (
     *     <>
     *         <CardHeader
     *             title="Left List"
     *             subheader={`${props.checked.length}/${leftList.length} selected`}
     *         />
     *         <Divider />
     *     </>
     * )}
     * ```
     */
    leftListHeaderComponent?: ListHeaderComponent;
    /**
     * The component used to render a list header.
     * @example ```jsx
     * rightListHeaderComponent={(props: ListHeaderComponentProps) => (
     *     <>
     *         <CardHeader
     *             title="Right List"
     *             subheader={`${props.checked.length}/${rightList.length} selected`}
     *         />
     *         <Divider />
     *     </>
     * )}
     * ```
     */
    rightListHeaderComponent?: ListHeaderComponent;
}

export interface TransferListItem {
    id: string,
    value: string,
}

export interface ControlsComponentProps {
    handleCheckedLeft: () => void,
    handleCheckedRight: () => void,
    handleAllLeft: () => void,
    handleAllRight: () => void,
    leftChecked: TransferListItem[],
    rightChecked: TransferListItem[],
}

export type ListHeaderComponent = (props: ListHeaderComponentProps) => ReactElement;

export interface ListHeaderComponentProps {
    checked: readonly TransferListItem[],
}
