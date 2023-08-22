import React from 'react';

import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import Select, { SelectProps } from '@mui/material/Select';
import Paper, { PaperProps } from '@mui/material/Paper';

export interface TextFieldWithSelectProps {
    /**
     * Demos:
     *
     * - [Paper](https://mui.com/material-ui/react-paper/)
     *
     * API:
     *
     * - [Paper API](https://mui.com/material-ui/api/paper/)
     */
    containerProps?: PaperProps;
    /**
     * API:
     *
     * - [InputBase API](https://mui.com/material-ui/api/input-base/)
     */
    textInputProps?: InputBaseProps;
    /**
     * API:
     *
     * - [Select API](https://mui.com/material-ui/api/select/)
     */
    selectProps?: SelectProps;
}

const TextFieldWithSelect = (props: TextFieldWithSelectProps) => {
    const { containerProps, textInputProps, selectProps } = props;

    return (
        <Paper
            variant='outlined'
            {...containerProps}
            sx={{
                display: 'inline-flex',
                borderColor: 'grey.300',
                ...containerProps?.sx,
            }}
        >
            <InputBase
                {...textInputProps}
                sx={{
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    flexGrow: 1,
                    ...textInputProps?.sx,
                }}
            />
            <Select
                variant='outlined'
                {...selectProps}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    backgroundColor: 'grey.50',
                    borderRadius: 0,
                    borderLeft: '1px solid',
                    borderLeftColor: 'grey.300',
                    ...selectProps?.sx,
                }}
            />
        </Paper>
    );
};

export default TextFieldWithSelect;
