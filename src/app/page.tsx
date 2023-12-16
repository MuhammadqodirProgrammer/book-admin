'use client';
import React, { useEffect, useState } from 'react';

import CardDataStats from './CardDataStats';
import { FaBook } from 'react-icons/fa';

import { PiStudentDuotone } from 'react-icons/pi';
import { FaBlackTie } from 'react-icons/fa';
import { RiMovie2Line, RiSoundModuleFill } from 'react-icons/ri';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import DashImg from '../../../public/icons/dashboard.svg';
import { AiFillStar } from 'react-icons/ai';
import { IoMdEye } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa6';
import { FaPencil } from "react-icons/fa6";

import instance, { apiRoot, baseMediaUrl } from './api/api';
import Image from '../../node_modules/next/image';
import Link from '../../node_modules/next/link';
import { SkeletonDemo } from '@/components/Skeleton/Skeleton';
import { Pagination } from '@/components/Pagination/Pagination';
import { FileModal } from '@/components/Modal/Modal';
// import { Chart } from '@/components/CHart/Chart';

const ECommerce: React.FC = () => {
	const [studentsCount, setStudentsCount] = useState<any>(0);
	const [mentorsCount, setMentorsCount] = useState<any>(0);
	const [coursesCount, setCoursesCount] = useState<any>(0);
	const [categoriesCount, setCategoriesCount] = useState<any>(0);
	const [data, setData] = useState<any>([]);
	const [Count, setCount] = useState(3);
	const [embedUrl, setEmbedUrl] = useState<any>('');
	const [ViewModal, setViewModal] = useState<any>(false);

	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	const getStudents = async () => {
		const res = await apiRoot.get(`author?page=1&pageSize=9`, {
			headers: {
				Authorization: token,
			},
		});
		const students = await apiRoot.get(`users?page=1&pageSize=9`, {
			headers: {
				Authorization: token,
			},
		});
		const books = await apiRoot.get(`books?page=1&pageSize=9`, {
			headers: {
				Authorization: token,
			},
		});
		const category = await apiRoot.get(`category`, {
			headers: {
				Authorization: token,
			},
		});

		console.log(category?.data?.data?.length, 'category');

		if (res?.status == 200) {
			setStudentsCount(students?.data?.total);
			setMentorsCount(res?.data?.total);
			setCoursesCount(books?.data?.total);
			setCategoriesCount(category?.data?.data?.length);
		}
	};
	const getFunc = async () => {
		const resp = await apiRoot.get(`search/mostview`);
		console.log(resp?.data, 'response');

		if (resp?.status === 200) {
			setData(resp?.data?.most_read);
		}
	};
	useEffect(() => {
		getStudents();
		getFunc();
	}, []);

	return (
		<>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
				<CardDataStats
					title='Authors'
					total={mentorsCount}
					rate='  0.43%'
					levelUp
				>
					<FaBlackTie size={40} className='dark:text-mainColor' />
				</CardDataStats>
				<CardDataStats title='Users' total={studentsCount} rate='4.35%' levelUp>
					<PiStudentDuotone size={40} className='dark:text-mainColor' />
				</CardDataStats>
				<CardDataStats title='Books' total={coursesCount} rate='2.59%' levelUp>
					<FaBook size={40} className='dark:text-mainColor' />
				</CardDataStats>
				<CardDataStats
					title='Categories '
					total={categoriesCount}
					rate='0.95%'
					levelDown
				>
					<svg
						stroke='currentColor'
						fill='currentColor'
						strokeWidth={0}
						viewBox='0 0 24 24'
						focusable='false'
						className=' w-[40px] h-[40px] text-balck dark:text-mainColor '
						height='1em'
						width='1em'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path d='M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-2-6H6v-2h12v2zm-4 4H6v-2h8v2z' />
					</svg>
				</CardDataStats>
			</div>

			<div className='flex items-center  justify-center  gap-[30px] my-[15px] '>
				<h3 className=' text-[22px] dark:text-white  font-bold text-black  '>
				Most viewed books
				</h3>

			</div>


			<div className='grid lg:grid-cols-3 max-lg:grid-cols-2  max-sm:grid-cols-1  gap-3 '>
				{data?.length ? (
					data?.slice(0,Count)?.map((item: any) => (
						<div
							key={item?.id}
							className='flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-lg:w-[90%] max-sm:w-[100%] w-[100%] max-lg:m-auto'
						>
							<Image
								className='h-[280px]  w-full object-cover rounded-lg transition ease-in-out hover:opacity-75'
								src={`${baseMediaUrl}/images/${item?.book_image}`}
								alt='Picture of the book'
								width={1000}
								height={1000}
							/>
							<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
								{item?.book_title}
							</h6>

							<h6 className='pt-[10px] text-[16px] font-bold text-black dark:text-white'>
								{item?.book_description?.length > 45
									? item?.book_description?.slice(0, 42) + '..'
									: item?.book_description}
							</h6>

							<div className='flex justify-between items-center my-2'>
								{item?.book_audio && (
									<audio
										controls
										// onPlay={() => checkView(item?.id)}
										src={`${baseMediaUrl}audios/${item?.book_audio}`}
										className=' mb-3 border-[2px]  h-[34px] border-dotted rounded-full border-mainColor '
									>
										Your browser does not support the
										<code>audio</code> element.
									</audio>
								)}
							</div>

						
						
							<hr className='h-1 w-full bg-CoursesHr' />
							<div className='flex justify-between items-center pt-5'>
								<div className='flex gap-[10px] items-center text-[15px] text-black dark:text-white'>
								<FaPencil size={16} />

									{item?.date_written?.slice(0, 10)}
								</div>
								<span className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
									<IoMdEye size={20} />
									{item?.number_view}
								</span>
							</div>
						</div>
					))
				) : (
					<SkeletonDemo />
				)}
			</div>
{
	data?.length > 3 ? (<button
		className='bg-teal-500 hover:bg-teal-700 mx-auto block my-3 text-white font-bold py-2 px-5 rounded'
		onClick={() => setCount(Count + 3)}
	>
		More
	</button>) :""
}
			
		</>
	);
};

export default ECommerce;
