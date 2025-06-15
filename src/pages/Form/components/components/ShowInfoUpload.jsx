import React from 'react'
import avatarUser from '../../../../assets/02.png'
import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ShowListImage from './ShowListImage';
import { useEffect } from 'react';
import { useState } from 'react';
import { cn } from '../../../../lib/utils';

export default function ShowInfoUpload(infoUser) {
	const data = infoUser.infoUser
	const files = data.certificate
	const [previews, setPreviews] = useState([]);

	useEffect(() => {
		if (!files || files.length === 0) return;

		const newPreviews = Array.from(files).map((file) => ({
			file,
			previewUrl: file.type.startsWith("image/")
				? URL.createObjectURL(file)
				: "",
		}));

		setPreviews(newPreviews);

		return () => {
			newPreviews.forEach((p) => {
				if (p.previewUrl) {
					URL.revokeObjectURL(p.previewUrl);
				}
			});
		};
	}, [files]);
	if (data)
		return (
			<div className='w-full max-w-full grid grid-flow-col gap-8 place-items-center'>
				<Card className={cn(data.role === 'mentor' ? 'w-1/2' : 'w-full', 'flex flex-col justify-between items-start !bg-gradient-to-b !from-indigo-800 !to-violet-400 rounded-3xl p-8 gap-4')}>
					<CardContent className="bg-gray-50 rounded-xl w-full flex flex-col justify-between">
						<Typography variant='h6' className='!font-bold w-full !text-xl !text-black text-center capitalize'>{data.gender} {data.fullname}</Typography>
						<CardContent className='bg-gray-50 !p-0 rounded-xl  w-full flex justify-center gap-4'>
							<CardMedia className="w-32 h-full !flex justify-center items-center">
								<img src={avatarUser} alt="avatar user" className='size-32 aspect-square rounded-full flex justify-center items-center' />
							</CardMedia>
							<CardContent className="space-y-2 text-sm w-fit !p-0">
								<div className="flex items-center text-gray-600">
									<EmailIcon className="w-4 h-4 mr-3 text-gray-400" />
									<span className="break-all">{data.email}</span>
								</div>

								<div className="flex items-center text-gray-600">
									<LocalPhoneIcon className="w-4 h-4 mr-3 text-gray-400" />
									<span>{data.phonenumber}</span>
								</div>

								<div className="flex items-center text-gray-600">
									<LinkedInIcon className="w-4 h-4 mr-3 text-gray-400" />
									<a
										href={data.linkedln}
										className="text-violet-600 hover:text-violet-700 hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										{data.linkedln}
									</a>
								</div>

								<div className="flex items-center text-gray-600">
									<PublicIcon className="w-4 h-4 mr-3 text-gray-400" />
									<a
										href={data.social}
										className="text-violet-600 hover:text-violet-700 hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										{data.social}
									</a>
								</div>
								<div className="flex items-center text-gray-600">
									<StarIcon className="w-16 h-16 mr-3 text-gray-400" />
									<span className=' capitalize'>{data.role}</span>
								</div>
							</CardContent>
						</CardContent>
					</CardContent>
					<CardContent className='flex justify-start items-start flex-col w-full h-full gap-8'>
						<>
							{Array.isArray(data.menteeTarget) && data.menteeTarget.length > 0 && (
								<div className="space-y-3">
									<h3 className="font-semibold text-white flex items-center text-lg">
										<PersonIcon sx={{ color: 'white' }} className="w-4 h-4 mr-2 text-violet-500" />
										Đối tượng mentee
									</h3>
									<div className="space-y-3">
										<div className="flex flex-wrap gap-2">
											{data.menteeTarget.map((item, index) => (
												<Chip key={index} label={item} sx={{ backgroundColor: 'white', color: '#8b5cf6' }} />
											))}
										</div>
									</div>
								</div>
							)}
							{Array.isArray(data.shareContent) && data.shareContent.length > 0 && (
								<div className="space-y-3">
									<h3 className="font-semibold text-white flex items-center text-lg">
										<AutoStoriesIcon sx={{ color: 'white' }} className="w-4 h-4 mr-2 text-violet-500" />
										Nội dung chia sẻ
									</h3>
									<div className="space-y-3">
										<div className="flex flex-wrap gap-2">
											{data.shareContent.map((item, index) => (
												<Chip key={index} label={item} sx={{ backgroundColor: 'white', color: '#8b5cf6' }} />
											))}
										</div>
									</div>
								</div>
							)}
						</>
						{data.role === 'educator' && (
							<>
								{data.experience ? (
									<h3 className="font-semibold text-white flex items-center text-lg">
										<AutoStoriesIcon sx={{ color: 'white' }} className="w-4 h-4 mr-2 text-violet-500" />
										Số năm kinh nghiệm: {data.experience} năm
									</h3>
								) : (
									<h3 className="font-semibold text-white flex items-center text-lg">
										<AutoStoriesIcon sx={{ color: 'white' }} className="w-4 h-4 mr-2 text-violet-500" />
										Chưa có kinh nghiệm
									</h3>
								)
								}
								{Array.isArray(data.expertise) && data.expertise.length > 0 && (
									<div className="space-y-3">
										<h3 className="font-semibold text-white flex items-center text-lg">
											<WorkspacePremiumIcon sx={{ color: 'white' }} className="w-4 h-4 mr-2 text-violet-500" />
											Chứng chỉ
										</h3>
										<div className="space-y-3">
											<div className="flex flex-wrap gap-2">
												{data.expertise.map((item, index) => (
													<Chip key={index} label={item} sx={{ backgroundColor: 'white', color: '#8b5cf6' }} />
												))}
											</div>
										</div>
									</div>
								)}
							</>
						)}
					</CardContent>
				</Card>
				{data.role === 'educator' && previews && (
					<Card className="w-full h-full aspect-square">
						<ShowListImage previews={previews} imageActive={0} />
					</Card>
				)}
			</div>
		)
}
