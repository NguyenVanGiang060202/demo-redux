import { Box, Button, Card, FormHelperText, Modal, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { MAX_FILE_COUNT } from '../SchemaRegisterExpert/schemaRegUser';
import ShowListImage from './ShowListImage';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '75%',
    '&:focus-visible': {
        outline: 'none',
    }
};


export default function UploadCertificate() {
    const { control, setValue, formState: { errors } } = useFormContext();
    const certificate = useWatch({ control, name: 'certificate' })
    const [previews, setPreviews] = useState([]);
    const [active, setActive] = useState(0);
    const [open, setOpen] = useState(false);

    const handleOpenPopup = (index) => {
        setOpen(true);
        setActive(index);
    }

    const handleClosePopup = () => {
        setOpen(false);
    }

    function handleOnChange(event, field) {
        const files = Array.from(event.target.files);
        if (previews.length + files.length <= MAX_FILE_COUNT) {
            field.onChange(files);
        } else {
            alert(`Bạn chỉ được tải lên tối đa ${MAX_FILE_COUNT} file`);
            return;
        }

        const existingFileNames = previews.map(p => p.file.name);
        const newFiles = files.filter(file => !existingFileNames.includes(file.name));
        const newPreviews = newFiles.map((file) => ({
            file,
            previewUrl: file.type.startsWith("image/")
                ? URL.createObjectURL(file)
                : "",
        }));
        setPreviews(prev => [...prev, ...newPreviews]);
    }

    const handleDelete = (indexToDelete) => {
        URL.revokeObjectURL(previews[indexToDelete].previewUrl);
        setPreviews(prev => prev.filter((_, index) => index !== indexToDelete));
        const updatedFiles = Array.from(certificate).filter((_, index) => index !== indexToDelete);
        setValue('certificate', updatedFiles.length > 0 ? updatedFiles : null, {
            shouldValidate: true,
          });
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClosePopup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ShowListImage previews={previews} imageActive={active} />
                </Box>
            </Modal>

            <div className="w-1/2 h-full flex flex-col ">
                <div className='w-full flex flex-col'>
                    <div className='w-full h-full flex flex-col justify-center items-start gap-2'>
                        <div className='flex justify-between items-start w-full h-full '>
                            <h6 className='font-bold text-lg'>Đăng tải chứng chỉ (Image/PDF) <span className='!text-red-500'>*</span></h6>
                            <Controller
                                name="certificate"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Button
                                            component="label"
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload files
                                            <VisuallyHiddenInput
                                                type="file"
                                                accept='image/*, application/pdf'
                                                onChange={(event) => handleOnChange(event, field)}
                                                multiple
                                            />
                                        </Button>
                                    </>
                                )}
                            />
                        </div>
                        {errors.certificate && <FormHelperText error>{errors.certificate.message}</FormHelperText>}

                        <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                            {previews.map((preview, index) => (
                                <Card className='w-full h-44 cursor-pointer' key={index} sx={{ borderRadius: '8px' }}>
                                    {preview.file.type.startsWith("image/") && (
                                        <div className="relative w-full h-full flex justify-center items-center">
                                            <img
                                                onClick={() => handleOpenPopup(index)}
                                                src={preview.previewUrl}
                                                alt="Preview"
                                                className="border w-full h-full object-cover rounded-lg"
                                            />
                                            <div className="absolute top-0 right-0">
                                                <IconButton sx={{
                                                    backgroundColor: 'white',
                                                    borderRadius: '20%',
                                                    padding: '4px',
                                                    '&:hover': {
                                                        backgroundColor: '#f0f0f0',
                                                    }
                                                }}
                                                    onClick={() => handleDelete(index)}>
                                                    <DeleteIcon sx={{ color: 'black' }} />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )}
                                    {preview.file.type === "application/pdf" && (
                                        <div className="relative flex items-center justify-center gap-2 text-sm text-gray-700 w-full h-full rounded-lg border-2">
                                            <CloudUploadIcon />
                                            <span>{preview.file.name}</span>
                                            <div className="absolute top-0 right-0">
                                                <IconButton onClick={() => handleDelete(index)}>
                                                    <DeleteIcon sx={{ color: 'black' }} />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
