import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import mentorImage from '../../../assets/mentor_image.jpg'
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function Form1() {
    const { control } = useFormContext();

    return (
        <div className='w-full h-full flex justify-center items-center flex-col gap-10'>
            <h1 className='font-bold text-2xl'>Chọn vai trò bạn muốn đăng kí</h1>
            <div className="flex justify-center items-center">
                <FormControl component="fieldset" required>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                {...field}
                            >
                                <div className="flex justify-center items-center space-x-8">
                                    <div className="p-4 border-2 rounded-lg pt-0">
                                        <FormControlLabel value="mentor" control={<Radio />} label="Mentor" />
                                        <img src={mentorImage} alt='mentor image' className='aspect-[5/6] h-48 rounded-lg object-cover' />
                                    </div>
                                    <div className="p-4 border-2 rounded-lg pt-0">
                                        <FormControlLabel value="educator" control={<Radio />} label="Giảng viên" />
                                        <img src={mentorImage} alt='educator image' className='aspect-[5/6] h-48 rounded-lg object-cover' />
                                    </div>
                                </div>
                            </RadioGroup>
                        )}
                    />
                </FormControl>
            </div>
        </div>
    )
}
