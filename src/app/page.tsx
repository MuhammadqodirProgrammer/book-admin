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

import instance, { apiRoot } from './api/api';
// import { Chart } from '@/components/CHart/Chart';

const ECommerce: React.FC = () => {
	const [studentsCount, setStudentsCount] = useState<any>(0);
	const [mentorsCount, setMentorsCount] = useState<any>(0);
	const [coursesCount, setCoursesCount] = useState<any>(0);
	const [categoriesCount, setCategoriesCount] = useState<any>(0);

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

	useEffect(() => {
		getStudents();
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
				<CardDataStats
					title='Users'
					total={studentsCount}
					rate='4.35%'
					levelUp
				>
					<PiStudentDuotone size={40} className='dark:text-mainColor' />
				</CardDataStats>
				<CardDataStats
					title='Books'
					total={coursesCount}
					rate='2.59%'
					levelUp
				>
	<FaBook size={40}  className='dark:text-mainColor' />

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
			{/* <Chart/> */}
		</>
	);
};

export default ECommerce;
