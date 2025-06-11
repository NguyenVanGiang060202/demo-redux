import { FormControl, MenuItem, Select, TextField } from '@mui/material'
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
export default function Form2() {
    const { register, formState: { errors } } = useFormContext();
    return (
        <>
            <div className="grid grid-rows-4 w-full h-full gap-y-2">
                <div className="flex justify-center items-center w-full h-full space-x-8">
                    <div className="flex flex-col w-full h-full justify-start items-start">
                        <p className='font-medium text-xl'>Họ và tên <span className='!text-red-500'>*</span></p>
                        <TextField
                            size='small'
                            placeholder='Họ và tên'
                            name="fullname"
                            error={!!errors.fullname}
                            helperText={errors.fullname?.message}
                            {...register('fullname', { required: true })}
                            className='w-full border-none'
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline':
                                {
                                    borderRadius: '0.5rem',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'indigo',    // viền khi hover
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'indigo',       // viền khi focus
                                },
                            }}
                        />
                    </div>
                    <FormControl className='w-full h-full flex justify-start items-start'>
                        <p className='font-medium text-xl '>Cách xưng hô phù hợp với bạn?</p>
                        <Select
                            size='small'
                            name="gender"
                            {...register('gender')}
                            defaultValue="Anh"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline':
                                {
                                    borderRadius: '0.5rem',
                                },
                            }}
                        >
                            {['Anh', 'Chị'].map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="flex justify-center items-center w-full h-full space-x-8">
                    <div className='flex flex-col w-full h-full justify-start items-start'>
                        <p className='font-medium text-xl '>Email <span className='!text-red-500'>*</span></p>
                        <TextField
                            name="email"
                            type="email"
                            size='small'
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            placeholder='example@gmail.com'
                            {...register('email', { required: true })}
                            className='w-full border-none disabled:bg-slate-600'
                            required
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline':
                                {
                                    borderRadius: '0.5rem',
                                },
                            }}
                        />
                    </div>
                    <div className="flex flex-col w-full h-full justify-start items-start">
                        <p className='font-medium text-xl '>Số diện thoại <span className='!text-red-500'>*</span></p>
                        <TextField
                            name="phonenumber"
                            type="tel"
                            size='small'
                            error={!!errors.phonenumber}
                            helperText={errors.phonenumber?.message}
                            placeholder='0123456789'
                            {...register('phonenumber', { required: true })}
                            className='w-full border-none'
                            required
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline':
                                {
                                    borderRadius: '0.5rem',
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full h-full justify-start items-start">
                    <p className='font-medium text-xl '>Linkedln của anh/chị <span className='!text-red-500'>*</span></p>
                    <TextField
                        name="linkedln"
                        type="text"
                        error={!!errors.linkedln}
                        helperText={errors.linkedln?.message}
                        size='small'
                        placeholder='https://www.linkedin.com/'
                        {...register('linkedln', { required: true })}
                        className='w-full border-none'
                        required
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline':
                            {
                                borderRadius: '0.5rem',
                            },
                        }}
                    />
                </div>
                <div className="flex flex-col w-full h-full justify-start items-start">
                    <p className='font-medium text-xl '>Social media mà anh/chị thường sử dụng (facebook, instagram, twitter,...) <span className='!text-red-500'>*</span></p>
                    <TextField
                        name="social"
                        type="text"
                        error={!!errors.social}
                        helperText={errors.social?.message}
                        placeholder='https://www.facebook.com/'
                        size='small'
                        {...register('social', { required: true })}
                        className='w-full border-none'
                        required
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline':
                            {
                                borderRadius: '0.5rem',
                            },
                        }}
                    />
                </div>
            </div>
        </>
    )
}
