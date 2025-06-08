import * as React from 'react';
import PropTypes from 'prop-types';
import useAutocomplete from '@mui/material/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';

const Root = styled('div')(({ theme }) => ({
    color: 'rgba(0,0,0,0.85)',
    fontSize: '14px',
    ...theme.applyStyles('dark', {
        color: 'rgba(255,255,255,0.65)',
    }),
}));

const InputWrapper = styled('div')(({ theme }) => ({
    width: '300px',
    border: '1px solid #d9d9d9',
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '1px',
    display: 'flex',
    flexWrap: 'wrap',
    ...theme.applyStyles('dark', {
        borderColor: '#434343',
        backgroundColor: '#141414',
    }),
    '&:hover': {
        borderColor: '#40a9ff',
        ...theme.applyStyles('dark', {
            borderColor: '#177ddc',
        }),
    },
    '&.focused': {
        borderColor: '#40a9ff',
        boxShadow: '0 0 0 2px rgb(24 144 255 / 0.2)',
        ...theme.applyStyles('dark', {
            borderColor: '#177ddc',
        }),
    },
    '&.error': {
        borderColor: '#ff4d4f',
        '&:hover': {
            borderColor: '#ff4d4f',
        },
        '&.focused': {
            borderColor: '#ff4d4f',
            boxShadow: '0 0 0 2px rgb(255 77 79 / 0.2)',
        },
    },
    '& input': {
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,.85)',
        height: '30px',
        boxSizing: 'border-box',
        padding: '4px 6px',
        width: '0',
        minWidth: '30px',
        flexGrow: 1,
        border: 0,
        margin: 0,
        outline: 0,
        ...theme.applyStyles('dark', {
            color: 'rgba(255,255,255,0.65)',
            backgroundColor: '#141414',
        }),
    },
}));

function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other} className='w-fit bg-slate-200 p-1 rounded-md space-x-1 flex items-center'>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} fontSize="small" className="cursor-pointer" />
        </div>
    );
}

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '24px',
    margin: '2px',
    lineHeight: '22px',
    backgroundColor: '#fafafa',
    border: `1px solid #e8e8e8`,
    borderRadius: '2px',
    boxSizing: 'content-box',
    padding: '0 4px 0 10px',
    outline: 0,
    overflow: 'hidden',
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderColor: '#303030',
    }),
    '&:focus': {
        borderColor: '#40a9ff',
        backgroundColor: '#e6f7ff',
        ...theme.applyStyles('dark', {
            backgroundColor: '#003b57',
            borderColor: '#177ddc',
        }),
    },
    '& span': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    '& svg': {
        fontSize: '12px',
        cursor: 'pointer',
        padding: '4px',
    },
}));

const Listbox = styled('ul')(({ theme }) => ({
    width: 'fit-content',
    margin: '2px 0 0',
    padding: 0,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#fff',
    overflow: 'auto',
    maxHeight: '250px',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgb(0 0 0 / 0.15)',
    zIndex: 1,
    ...theme.applyStyles('dark', {
        backgroundColor: '#141414',
    }),
    '& li': {
        padding: '5px 12px',
        display: 'flex',
        '& span': {
            flexGrow: 1,
        },
        '& svg': {
            color: 'transparent',
        },
    },
    "& li[aria-selected='true']": {
        backgroundColor: '#fafafa',
        fontWeight: 600,
        ...theme.applyStyles('dark', {
            backgroundColor: '#2b2b2b',
        }),
        '& svg': {
            color: '#1890ff',
        },
    },
    [`& li.${autocompleteClasses.focused}`]: {
        backgroundColor: '#e6f7ff',
        cursor: 'pointer',
        ...theme.applyStyles('dark', {
            backgroundColor: '#003b57',
        }),
        '& svg': {
            color: 'currentColor',
        },
    },
}));

export function Autocomplete({ 
    label, 
    options, 
    value = [], 
    onChange, 
    error = false,
    ...props 
}) {
    const [listboxWidth, setListboxWidth] = useState(null);

    const handleSetAnchorEl = (el) => {
        setAnchorEl(el);
        if (el) setListboxWidth(el.clientWidth);
    };

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value: autocompleteValue,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: `auto-complete-${label}`,
        value: value,
        multiple: true,
        options,
        onChange: (event, newValue) => {
            onChange?.(newValue);
        },
        isOptionEqualToValue: (option, value) => option === value,
    });

    return (
        <div className='w-full'>
            <div {...getRootProps()} className='w-full space-y-4'>
                <h6 className='font-bold text-lg'>{label}</h6>
                <InputWrapper 
                    ref={handleSetAnchorEl} 
                    className={`${focused ? 'focused' : ''} ${error ? 'error' : ''} !w-full !p-3 !gap-2 !`}
                >
                    {autocompleteValue.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return <StyledTag key={key} {...tagProps} label={option} />;
                    })}
                    <input {...getInputProps()} />
                </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()} style={{ width: listboxWidth }}>
                    {groupedOptions.map((option, index) => {
                        const { key, ...optionProps } = getOptionProps({ option, index });
                        return (
                            <li key={key} {...optionProps}>
                                <span>{option}</span>
                                <CheckIcon fontSize="small" />
                            </li>
                        );
                    })}
                </Listbox>
            ) : null}
        </div>
    );
}

export default function AutoCompleteBox({ 
    name, 
    control, 
    label, 
    options, 
    rules = {},
    defaultValue = [],
    ...props 
}) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div className="w-full">
                    <Autocomplete
                        label={label}
                        options={options}
                        value={value || []}
                        onChange={onChange}
                        error={!!error}
                        {...props}
                    />
                    {error && (
                        <div className="text-red-500 text-sm mt-1">
                            {error.message}
                        </div>
                    )}
                </div>
            )}
        />
    );
}