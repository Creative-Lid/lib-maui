import React from 'react';

import Button, { ButtonProps } from '../components/Button';

interface Props {
    children?: ButtonProps['children'];
    onClick?: () => void;
    'data-testid'?: string;
}

const EventContainer = (props: Props) => {
    const {
        children,
        onClick,
        'data-testid': dataTestId,
    } = props;

    return (
        <Button
            onClick={onClick}
            variant='contained'
            fullWidth
            sx={{
                padding: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: .5,
            }}
            data-testid={dataTestId}
        >
            {children}
        </Button>
    );
};

export default EventContainer;
