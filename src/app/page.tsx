'use client';
import React, { useEffect, useState } from 'react';

import CardDataStats from './CardDataStats';

import { PiStudentDuotone } from 'react-icons/pi';
import { FaBlackTie } from 'react-icons/fa';
import { RiMovie2Line, RiSoundModuleFill } from 'react-icons/ri';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import DashImg from '../../../public/icons/dashboard.svg';
import { AiFillStar } from 'react-icons/ai';

import instance from './api/api';
// import { Chart } from '@/components/CHart/Chart';

const ECommerce: React.FC = () => {
	const [studentsCount, setStudentsCount] = useState<any>(0);
	const [mentorsCount, setMentorsCount] = useState<any>(0);
	const [coursesCount, setCoursesCount] = useState<any>(0);
	const [categoriesCount, setCategoriesCount] = useState<any>(0);
	// get students
	const getStudents = async () => {
		const res = await instance.get(`api/students?page=1`);
		const courses = await instance.get(`api/courses?page=1`);
		const mentors = await instance.get(`api/mentors?page=1`);
		const categories = await instance.get(`api/categories?page=1`);

		if (res?.status == 200) {
			const studentInfo = JSON.parse(res?.headers['x-pagination']);
			const coursesInfo = JSON.parse(courses.headers['x-pagination']);

			setStudentsCount(studentInfo?.TotalItems);
			setMentorsCount(mentors?.data?.length);
			setCategoriesCount(categories?.data?.length);
			setCoursesCount(coursesInfo?.TotalItems);
		}
	};

	useEffect(() => {
		getStudents();
	}, []);

	return (
		<>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
				<CardDataStats
					title='Mentors'
					total={mentorsCount}
					rate='  0.43%'
					levelUp
				>
					<FaBlackTie size={40} className='dark:text-mainColor' />
				</CardDataStats>
				<CardDataStats
					title='Students'
					total={studentsCount}
					rate='4.35%'
					levelUp
				>
					<PiStudentDuotone size={40} className='dark:text-mainColor' />
				</CardDataStats>
				<CardDataStats
					title='Courses'
					total={coursesCount}
					rate='2.59%'
					levelUp
				>
					<svg
						stroke='currentColor'
						fill='none'
						strokeWidth={2}
						viewBox='0 0 24 24'
						strokeLinecap='round'
						strokeLinejoin='round'
						focusable='false'
						className=' w-[40px] h-[40px] text-balck dark:text-mainColor '
						height='1em'
						width='1em'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path stroke='none' d='M0 0h24v24H0z' fill='none' />
						<path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
						<path d='M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
					</svg>
				</CardDataStats>
				<CardDataStats
					title='Categories'
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
