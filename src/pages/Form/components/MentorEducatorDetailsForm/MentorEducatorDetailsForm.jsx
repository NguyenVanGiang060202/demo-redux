import React, { useEffect } from 'react'
import AutocompleteBox from '../components/AutoCompleteBox'
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { menteeTarget, shareContent, expertise} from '../SchemaRegisterExpert/schemaRegUser';
import { styled, TextField } from '@mui/material';
import UploadCertificate from '../components/UploadCertificate';
import { cn } from '../../../../lib/utils';



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



export default function MentorEducatorDetailsForm() {
	const { control, getValues } = useFormContext()
	const role = useWatch({ name: 'role' })
	const files = getValues('certificate');

	return (
		<div className='w-full h-full flex gap-4'>
			<div className={cn(role === 'educator' && 'w-1/2 space-y-2', role === 'mentor' && 'w-full flex gap-8')}>
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
				{role === 'educator' && (
					<>
						<div className='w-full flex flex-col space-y-2'>
							<div className='flex items-start flex-col w-full'>
								<h6 className='font-bold text-lg'>Số năm kinh nghiệm <span className='!text-red-500'>*</span></h6>
								<Controller
									name="experience"
									control={control}
									render={({ field }) => (
										<TextField
											size='small'
											{...field}
											type="number"
											inputProps={{ min: 0, max: 50, step: 1 }}
											fullWidth
											onKeyDown={(e) => {
												if (['-', 'e', 'E'].includes(e.key)) {
													e.preventDefault();
												}
											}}
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
					</>
				)}
			</div>
			{role === 'educator' && (
				<UploadCertificate />
			)}
		</div>
	)
}

