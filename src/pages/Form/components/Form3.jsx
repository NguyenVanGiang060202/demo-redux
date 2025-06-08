import React, { useEffect } from 'react'
import AutocompleteBox from './AutoCompleteBox'
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { menteeTarget, shareContent, expertise } from './schema';
import { Button, styled, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShowUpload from './ShowUpload';



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



export default function Form3() {
	const { control } = useFormContext()
	const role = useWatch({ name: 'role' })
	const { watch } = useFormContext()
	const file = watch('resume');


	return (
		<div className='w-full h-full flex items-start justify-center'>
			<div className="w-full h-full flex justify-between items-start gap-10">
				{role === 'mentor' && (
					<>
						<AutocompleteBox
							name="menteeTarget"
							control={control}
							options={menteeTarget}
							label="Đối tượng mentee của bạn"
						/>
						<AutocompleteBox
							name="shareContent"
							control={control}
							options={shareContent}
							label="Nội dung chia sẻ"
						/>
					</>
				)}
				{role === 'educator' && (
					<>
						<div className='w-full h-full flex flex-col space-y-4'>
							<div className="w-full flex space-x-4">
								<div className='flex items-start flex-col w-full space-y-4'>
									<h6 className='font-bold text-lg'>Số năm kinh nghiệm</h6>
									<Controller
										name="experience"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												type="number"
												inputProps={{ min: 0 }}
												fullWidth
											/>
										)}
									/>
								</div>
								<AutocompleteBox
									name="expertise"
									control={control}
									options={expertise}
									label="Chuyên môn"
								/>
							</div>
							<div className='w-full h-full flex justify-center items-start gap-10'>
								<div className='flex justify-start items-start flex-col w-full h-full space-y-4'>
									<h6 className='font-bold text-lg'>Đăng tải chứng chỉ (Image/PDF)</h6>
									<Controller
										name="resume"
										control={control}
										render={({ field }) => (
											<>
												<Button
													component="label"
													role={undefined}
													variant="contained"
													tabIndex={-1}
													startIcon={<CloudUploadIcon />}
												>
													Upload files
													<VisuallyHiddenInput
														type="file"
														onChange={(event) => {
															const file = event.target.files?.[0];
															if (file) {
																field.onChange(file);
															}
														}}
														multiple
													/>
												</Button>
											</>
										)}
									/>
								</div>
								<div className="w-fit h-fit">
									{file && <ShowUpload data={file} />}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

