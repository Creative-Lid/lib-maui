import React, { useId } from 'react';

import MuiTextField, {
    TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

export type TextFieldProps = MuiTextFieldProps & {
    /**
     * @default false
     */
    floatingLabel?: boolean;
    /**
     * It takes on the position if only the floatingLabel prop is set to false
     * @default 'top'
     */
    labelPosition?: 'top' | 'left';
    /**
     * Gap between label and input when floatingLabel prop is set to false.
     * @units MUI Spacing https://mui.com/material-ui/customization/spacing/
     */
    labelGutter?: number;
};

const TextField = (props: TextFieldProps) => {
    const {
        floatingLabel = false,
        labelPosition = 'top',
        labelGutter = 1,
        ...muiProps
    } = props;

    const randomId = useId();

    if (floatingLabel || !muiProps.label) {
        return <MuiTextField {...muiProps} />;
    }

    const textFieldId = muiProps.id || randomId;

    const isHorizontal = labelPosition === 'left';

    const direction = isHorizontal ? 'row' : 'column';
    const alignItems = isHorizontal ? 'center' : 'flex-start';

    return (
        <Box
            sx={(theme) => ({
                display: 'inline-flex',
                flexDirection: direction,
                alignItems: alignItems,
                gap: theme.spacing(labelGutter),
                width: muiProps.fullWidth ? '100%' : 'fit-content', // "fit-content" is supported by all major browsers except IE - https://caniuse.com/mdn-css_properties_width_fit-content
            })}
        >
            <InputLabel
                htmlFor={textFieldId}
                {...(muiProps.disabled && { sx: { color: 'text.disabled' } })}
            >
                {props.label}
                {muiProps.required && <span style={{ color: 'red' }}>*</span>}
            </InputLabel>
            <MuiTextField {...muiProps} id={textFieldId} label={null} />
        </Box>
    );
};

export default TextField;
