import React, { Key, LegacyRef, useCallback, useState } from 'react';

import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';

import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import Button from '../Button';
import { Grey } from '@creativelid/maui-styles/colors';
import { convertToBytes, parseFloat } from '@creativelid/maui-utils/Number';

export interface FileUploadProps {
    acceptedFilesHeader?: string; // default string
    browseButton?: false | boolean; // default boolean false
    browseButtonText?: string; // default string 'Choose File'
    containerClassName?: string; // default string
    disabled?: boolean;
    fileTypes?: object; // default to allow all files types
    helperText?: string; // default string
    helperTextColor?: TypographyProps['color'];
    inputSize?: 'small' | 'medium'; // default string 'medium'
    inputRef?: LegacyRef<HTMLInputElement>;
    layout?: 'horizontal' | 'stacked' | 'standard' | string; // default string 'standard'
    maxFileSize?: number; // default size in MB set to 5
    noClick?: false | boolean; // default boolean false unless browseButton boolean true
    noKeyboard?: false | boolean; // default boolean false unless browseButton boolean true
    onFilesChange: (files?: File[]) => void;
    rejectedFilesHeader?: string; // default string
    showRejectedFiles?: boolean; // default boolean false
}

export interface FileRejectionWIthPath extends FileRejection {
    file: FileWithPath;
}

const FileUpload = (props: FileUploadProps) => {
    const [myFiles, setMyFiles] = useState<File[]>([]);

    const {
        acceptedFilesHeader,
        browseButton,
        browseButtonText,
        containerClassName,
        disabled = false,
        fileTypes,
        helperText,
        helperTextColor,
        inputSize,
        inputRef,
        layout,
        maxFileSize,
        noClick,
        noKeyboard,
        onFilesChange,
        rejectedFilesHeader,
        showRejectedFiles,
    } = props;

    const size = inputSize || 'medium';
    const buttonText = browseButtonText || 'Choose File';
    const orientation = layout || 'standard';
    const maxSize = convertToBytes(maxFileSize || 5);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (disabled) return;

            setMyFiles(acceptedFiles);
            onFilesChange(acceptedFiles);
        },
        [disabled, onFilesChange],
    );

    const { fileRejections, getInputProps, getRootProps, open } = useDropzone({
        ...fileTypes,
        maxSize,
        noClick: browseButton ? true : noClick,
        noKeyboard: browseButton ? true : noKeyboard,
        onDrop,
    });

    const removeFile = (file: File) => () => {
        const newFiles = [...myFiles];

        newFiles.splice(newFiles.indexOf(file), 1);
        setMyFiles(newFiles);
        onFilesChange(newFiles);
    };

    const acceptedFileItems = myFiles.map(
        (file: FileWithPath, index: number) => (
            <ListItem
                key={index}
                disableGutters
                disablePadding
                secondaryAction={
                    <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={removeFile(file)}
                        size='small'
                    >
                        <ClearIcon fontSize='inherit' />
                    </IconButton>
                }
            >
                <ListItemText
                    primary={`${file.path} - ${parseFloat(
                        file.size / 1048576,
                        2,
                    )} MB`}
                />
            </ListItem>
        ),
    );

    const fileRejectionItems = fileRejections.map(
        (file: FileRejectionWIthPath, index: number) => (
            <ListItem key={index} disableGutters disablePadding>
                <ListItemText
                    primary={`${file.file.path} - ${parseFloat(
                        file.file.size / 1048576,
                        2,
                    )} MB`}
                    secondary={file.errors.map(
                        (e: { code: Key; message: string }) => e.message,
                    )}
                />
            </ListItem>
        ),
    );

    return (
        <Grid container justifyContent='center' spacing={2}>
            <Grid
                item
                xs={12}
                {...(!disabled &&
                    getRootProps({ className: containerClassName }))}
            >
                <input
                    {...getInputProps()}
                    data-testid='drop-input'
                    {...(inputRef && { ref: inputRef })} // a fix, otherwise dropzone doesn't open the file dialog in browsers (except Chrome)
                />
                <Box
                    sx={{
                        textAlign:
                            orientation === 'horizontal' ||
                            orientation === 'stacked'
                                ? 'center'
                                : 'left',
                    }}
                >
                    <Paper
                        variant='outlined'
                        elevation={0}
                        sx={(theme) => ({
                            borderColor: disabled ? Grey[50] : Grey[100],
                            padding: !browseButton
                                ? theme.spacing(1.875, 2)
                                : browseButton && size === 'small'
                                    ? theme.spacing(0.25, 0.25, 0.25, 1.75)
                                    : theme.spacing(0.875, 0.875, 0.875, 1.75),
                        })}
                    >
                        <>
                            {(orientation === 'horizontal' ||
                                orientation === 'stacked') && (
                                <>
                                    <CloudUploadIcon
                                        sx={{ fontSize: '10rem' }}
                                    />
                                    <Typography variant='body1'>
                                        Drag and drop file(s)
                                    </Typography>
                                </>
                            )}
                            <Grid
                                container
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                {orientation === 'standard' && (
                                    <Grid item>
                                        <Typography variant='body1'>
                                            {`${
                                                myFiles.length === 0
                                                    ? 'No'
                                                    : myFiles.length
                                            } file${
                                                myFiles.length > 1 ? 's' : ''
                                            } selected`}
                                        </Typography>
                                    </Grid>
                                )}
                                {browseButton && (
                                    <Grid
                                        item
                                        sx={{
                                            width:
                                                orientation === 'horizontal' ||
                                                orientation === 'stacked'
                                                    ? '100%'
                                                    : 'auto',
                                        }}
                                    >
                                        {(orientation === 'horizontal' ||
                                            orientation === 'stacked') && (
                                            <Typography variant='body2'>
                                                or
                                            </Typography>
                                        )}
                                        <Button
                                            size={inputSize}
                                            variant='contained'
                                            color='primary'
                                            onClick={open}
                                            id='browseButton'
                                            name='browseButton'
                                            disabled={disabled}
                                        >
                                            {buttonText}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </>
                    </Paper>

                    {helperText && (
                        <Typography
                            variant='caption'
                            color={helperTextColor}
                            {...(disabled && {
                                sx: {
                                    color: (theme) =>
                                        theme.palette.text.disabled,
                                },
                            })}
                        >
                            {helperText}
                        </Typography>
                    )}
                </Box>
            </Grid>
            <Grid item xs={12}>
                {myFiles.length !== 0 && (
                    <>
                        {acceptedFilesHeader && (
                            <Typography variant='body1'>
                                <strong>{acceptedFilesHeader}</strong>
                            </Typography>
                        )}
                        <List disablePadding dense>
                            {acceptedFileItems}
                        </List>
                    </>
                )}
                {showRejectedFiles && fileRejections.length !== 0 && (
                    <>
                        {rejectedFilesHeader && (
                            <Typography variant='body1'>
                                <strong>{rejectedFilesHeader}</strong>
                            </Typography>
                        )}
                        <List disablePadding dense>
                            {fileRejectionItems}
                        </List>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default FileUpload;
