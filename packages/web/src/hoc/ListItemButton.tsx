import React, { ReactNode } from 'react';

import MuiListItemButton from '@mui/material/ListItemButton';

const ListItemButton = (
    autoFocus?: boolean,
    button?: boolean,
    children?: ReactNode,
    disabled?: boolean,
    selected?: boolean,
) => {
    return button ? (
        <MuiListItemButton
            autoFocus={autoFocus}
            disabled={disabled}
            selected={selected}
        >
            {children}
        </MuiListItemButton>
    ) : (
        <>children</>
    );
};

export default ListItemButton;
