import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import FileUpload from './FileUpload';

export default {
    args: {
        onFilesChange: (files) => console.log(files),
    },
    argTypes: {
        acceptedFilesHeader: {
            control: {
                type: 'text',
            },
            description: 'Set a header for accepted files.',
            table: {
                type: { summary: 'string' },
            },
        },
        browseButton: {
            description: 'If `true`, a browse button will be shown',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        browseButtonText: {
            description:
                'If browseButton `true`, a button will be shown with the text of "Choose File". This can be overridden.',
            defaultValue: 'Choose File',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Choose File' },
            },
        },
        containerClassName: {
            control: {
                type: 'text',
            },
            description:
                'Pass a class to the file upload input container. (example: dropzone)',
        },
        inputSize: {
            description:
                'The size of the component and button will be dense if set to `small`.',
            options: ['small', 'medium'],
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' },
            },
        },
        layout: {
            description:
                'This is planned for future enhancements and currently does nothing.',
        },
        maxFileSize: {
            description:
                'Pass a number to limit the file size. By default, the maxFileSize is set to `5MB`. Any number passed will be taken in as **MB**.',
            defaultValue: 5,
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 5 },
            },
        },
        noClick: {
            description:
                'By default, noClick boolean `false` unless browseButton boolean `true`.',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        noKeyboard: {
            description:
                'By default, noKeyboard boolean `false` unless browseButton boolean `true`.',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        rejectedFilesHeader: {
            control: {
                type: 'text',
            },
            description: 'Set a header for rejected files.',
            table: {
                type: { summary: 'string' },
            },
        },
        showRejectedFiles: {
            description:
                'By default, a list of rejected files is NOT shown and the boolean `false`. To see rejected files, set boolean `true`.',
            defaultValue: false,
            options: [false, true],
            control: { type: 'boolean' },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
    },
    component: FileUpload,
    title: 'MAUI/Inputs/FileUpload',
} as ComponentMeta<typeof FileUpload>;

const Template: ComponentStory<typeof FileUpload> = (args) => (
    <FileUpload {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const WithBrowseButton = Template.bind({});
WithBrowseButton.args = {
    browseButton: true,
};

export const WithBrowseButtonSmall = Template.bind({});
WithBrowseButtonSmall.args = {
    browseButton: true,
    inputSize: 'small',
};

export const SpecificFileTypes = Template.bind({});
SpecificFileTypes.args = {
    browseButton: false,
    fileTypes: {
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/rtf': ['.rtf'],
            'text/plain': ['.txt'],
        },
    },
    helperText:
        'Files may be .pdf, .doc, .rtf or .txt. Files must be under 5.0 MB.',
};

export const SpecificFileTypesWithBrowseButton = Template.bind({});
SpecificFileTypesWithBrowseButton.args = {
    browseButton: true,
    fileTypes: {
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/rtf': ['.rtf'],
            'text/plain': ['.txt'],
        },
    },
    helperText:
        'Files may be .pdf, .doc, .rtf or .txt. Files must be under 5.0 MB.',
};

export const ErrorHelperText = Template.bind({});
ErrorHelperText.args = {
    browseButton: false,
    fileTypes: {
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/rtf': ['.rtf'],
            'text/plain': ['.txt'],
        },
    },
    helperText:
        'Files may be .pdf, .doc, .rtf or .txt. Files must be under 5.0 MB.',
    helperTextColor: 'error',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    helperText: 'Optional disabled helper text.',
};

export const DisabledWithButton = Template.bind({});
DisabledWithButton.args = {
    browseButton: true,
    disabled: true,
    helperText: 'Optional disabled helper text.',
};
