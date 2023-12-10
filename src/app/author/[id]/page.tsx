'use client';
import Link from 'next/link';
import Image from 'next/image';
import BgImage from 'public/images/js.webp';
import profileImg from 'public/images/profile.jpg';

import { useEffect, useState } from 'react';
import { apiRoot } from '@/app/api/api';

import { useParams } from 'next/navigation'

export default function Page() {
	const [data, setData] = useState<any>([]);
    const {id} = useParams()
	console.log(id, 'params');

	const getFunc = async () => {
		const resp = await apiRoot.get(`author/${id} `);

		if (resp?.status === 200) {
			setData(resp?.data);
			console.log(resp?.data, 'data');
		}
	};
	useEffect(() => {
		getFunc();
		console.log(data);
	}, []);

	return (
		<>
			<Link
				href='/singleAuthor'
				className='flex flex-col relative bg-famousCourcesBg shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-w-md  max-lg:max-w-full max-lg:m-auto'
			>
				<div className='flex gap-2 absolute left-5 top-5 z-10'>
					<span className='text-xs py-[1px] rounded-md font-medium px-[8px] text-famousCourcesFirstType bg-famousCourcesFirstBg'>
						Popular
					</span>
					<span className='text-xs py-[1px] rounded-md font-medium px-[8px] text-famousCourcesSecondType bg-famousCourcesSecondBg'>
						Front-End
					</span>
				</div>
				<Image
					className='h-[280px]  w-full object-cover rounded-lg transition ease-in-out hover:opacity-75'
					src={BgImage}
					alt='Picture of the author'
					width={1000}
					height={1000}
				/>
				<h6 className='pt-[10px] text-[22px] font-bold text-white'>
					JavaScript darslari to&apos;liq kurs
				</h6>
				<div className='flex gap-[6px] py-[15px]'>
					<span className='flex gap-[5px] items-center text-[15px] text-famousCourcesDescsColor'>
						<svg
							stroke='currentColor'
							fill='none'
							stroke-width='2'
							viewBox='0 0 24 24'
							stroke-linecap='round'
							stroke-linejoin='round'
							focusable='false'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<path d='M10 9m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v9.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z'></path>
							<path d='M17 3m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v15.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z'></path>
							<path d='M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'></path>
						</svg>
						Boshlang&apos;ich
					</span>
					<span className='flex gap-[5px] items-center text-[15px] text-famousCourcesDescsColor'>
						<svg
							stroke='currentColor'
							fill='currentColor'
							stroke-width='0'
							viewBox='0 0 16 16'
							focusable='false'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z'></path>
							<path d='M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z'></path>
						</svg>
						93 darslar
					</span>
					<span className='flex gap-[5px] items-center text-[15px] text-famousCourcesDescsColor'>
						<svg
							stroke='currentColor'
							fill='none'
							stroke-width='2'
							viewBox='0 0 24 24'
							stroke-linecap='round'
							stroke-linejoin='round'
							focusable='false'
							height='1em'
							width='1em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle cx='12' cy='12' r='10'></circle>
							<polyline points='12 6 12 12 16 14'></polyline>
						</svg>
						23.0 soat
					</span>
				</div>
				<hr className='h-1 w-full bg-CoursesHr' />
				<div className='flex justify-between items-center pt-5'>
					<div className='flex gap-[10px] items-center text-white'>
						<Image
							className='w-[48px] h-[48px] rounded-full object-cover'
							src={profileImg}
							alt='Picture of the author'
							width={100}
							height={100}
						/>
						<p>Samar B.</p>
					</div>
					<div className='flex gap-[10px] items-center text-white'>
						<p className='text-[14px] line-through'>250.000</p>
						<p className='font-bold'>Bepul</p>
					</div>
				</div>
			</Link>
		</>
	);
}
