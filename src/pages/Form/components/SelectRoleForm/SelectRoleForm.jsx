import { Box, Card, CardActionArea, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import mentorImage from '../../../../assets/mentor_image.jpg'
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function SelectRoleForm({ roleData }) {
    const { control } = useFormContext();
    return (
        <div className='w-full h-full flex justify-center items-center flex-col '>
            <h1 className='font-bold text-2xl'>Chọn vai trò bạn muốn đăng kí</h1>
            <div className="flex justify-center items-center w-full h-full ">
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <FormControl component="fieldset" required className='flex w-full h-full'>
                            <RadioGroup {...field} row className='flex w-full h-full  justify-center items-center gap-10'>
                                {roleData && roleData.map((role) => (
                                    <Card key={role.role} className='w-60 h-fit '>
                                        <CardActionArea onClick={() => field.onChange(role.role)}>
                                            <CardContent className='flex flex-col justify-center items-center h-fit'>
                                                <div className="flex w-full justify-start items-center">
                                                    <Radio
                                                        {...field}
                                                        value={role.role}
                                                        className='!px-0'
                                                    />
                                                    <p className='px-2'>{role.label}</p>
                                                </div>
                                                <Box display="flex" justifyContent="center" height={200}>
                                                    <CardMedia
                                                        component="img"
                                                        width="100%"
                                                        sx={{ objectFit: "cover", borderRadius: 2 }}
                                                        image={role.image}
                                                        alt={role.label}
                                                    />
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                />
            </div>
        </div >
    )
}
