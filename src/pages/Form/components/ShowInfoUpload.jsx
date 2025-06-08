import React from 'react'
import ShowUpload from './ShowUpload';
import avatarUser from '../../../assets/02.png'
import { Typography } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function ShowInfoUpload(infoUser) {
	const data = infoUser.infoUser
	console.log("data load: ", data)

	if (data)
		return (
			<div className='w-fit h-full flex justify-center items-center text-white space-x-8'>
				<div className='w-full h-full flex flex-col justify-between items-start bg-gradient-to-b from-indigo-800 to-violet-400  rounded-3xl  p-8 gap-4'>
					<div className="bg-gray-50 rounded-xl p-4 space-y-3 w-full flex justify-between">
						<div className="w-full space-y-2">
							<div className="w-fit flex justify-center items-center">
								<img src={avatarUser} alt="avatar user" className='size-32 rounded-full' />
							</div>
							<Typography variant='h6' className='!font-bold w-fit !text-xl !text-black line-clamp-1'>{data.gender} {data.fullname}</Typography>
						</div>
						<div className="space-y-2 text-sm w-fit">
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
									LinkedIn Profile
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
									Social Media
								</a>
							</div>
						</div>
					</div>
					<div className='flex justify-start items-start flex-col w-full h-full gap-8'>
						<div className="flex items-center text-white">
							<StarIcon className="w-16 h-16 mr-3 text-white" sx={{ color: 'white' }} />
							<span className='text-xl capitalize'>{data.role}</span>
						</div>
						{data.role === 'mentor' && (
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
													<div key={index} className="bg-violet-100 text-violet-700 hover:bg-violet-200 rounded-full w-fit p-2">
														{item}
													</div>
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
													<div key={index} className="bg-violet-100 text-violet-700 hover:bg-violet-200 rounded-full w-fit p-2">
														{item}
													</div>
												))}
											</div>
										</div>
									</div>
								)}
							</>
						)}
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
													<div key={index} className="bg-violet-100 text-violet-700 hover:bg-violet-200 rounded-full w-fit p-2">
														{item}
													</div>
												))}
											</div>
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>
				<div className="w-full h-full bg-green-200">
					{data.role === 'educator' && (data?.resume && <ShowUpload data={data.resume} />)}
				</div>
			</div>
		)
}
