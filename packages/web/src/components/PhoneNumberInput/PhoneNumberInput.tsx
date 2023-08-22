import React from 'react';

import TextField, { TextFieldProps } from '../TextField';

import { useIMask } from 'react-imask';

export type PhoneNumberInputProps = Omit<TextFieldProps, 'onChange'> & {
    /**
     * Callback fires with an argument - unmasked value.
     *
     * masked: (123) 456-7890
     *
     * unmasked: 1234567890
     *
     * @param {string} value Unmasked value.
     */
    onChange?: (value: string) => void;
    /**
     * Mask for the input.
     * @default '(000) 000-0000'
     * @see https://imask.js.org/guide.html
     */
    mask?: string;
};

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
    const { onChange, mask, ...restProps } = props;

    const { ref, unmaskedValue } = useIMask({
        mask: mask ?? '(000) 000-0000',
    });

    if (onChange !== undefined) {
        onChange(unmaskedValue);
    }

    return <TextField inputRef={ref} {...restProps} />;
};

export default PhoneNumberInput;
