import { createTheme as muiCreateTheme } from '@mui/material';

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
const createTheme = muiCreateTheme;

export default createTheme;
