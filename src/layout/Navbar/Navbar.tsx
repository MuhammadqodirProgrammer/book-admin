'use client';
import Link from 'next/link';
import { useState } from 'react';
import './navbar.css';
import { usePathname } from 'next/navigation';
import { PiStudentDuotone } from 'react-icons/pi';
import { FaBlackTie } from 'react-icons/fa';
import { RiMovie2Line, RiSoundModuleFill } from 'react-icons/ri';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import DashImg from '../../../public/icons/dashboard.svg';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';

function Navbar() {
	const pathname = usePathname();

	console.log(pathname == ('/coursevideo' || '/video'), 'testing ');

	return (
		<>
			<nav className='navbar shadow z-30 bg-[#fff] dark:bg-topColor hidden md:flex'>
				<div className='navbar_box text-black dark:text-mainColor '>
					<Link className='nav_link' href='/'>
						<button
							type='button'
							className={
								pathname == '/'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<svg
									stroke='currentColor'
									fill='currentColor'
									strokeWidth={0}
									viewBox='0 0 1024 1024'
									focusable='false'
									className='nav_link_icon'
									height='1em'
									width='1em'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M924.8 385.6a446.7 446.7 0 0 0-96-142.4 446.7 446.7 0 0 0-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 0 0-142.4 96 446.7 446.7 0 0 0-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6A371.12 371.12 0 0 1 140 560c0-99.4 38.7-192.8 109-263 70.3-70.3 163.7-109 263-109 99.4 0 192.8 38.7 263 109 70.3 70.3 109 163.7 109 263 0 105.6-44.5 205.5-122.6 276zM623.5 421.5a8.03 8.03 0 0 0-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 0 0 0 79.2 55.95 55.95 0 0 0 79.2 0 55.87 55.87 0 0 0 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zm260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zm12.7-197.2l-31.1-31.1a8.03 8.03 0 0 0-11.3 0l-56.6 56.6a8.03 8.03 0 0 0 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zm-458.6-31.1a8.03 8.03 0 0 0-11.3 0l-31.1 31.1a8.03 8.03 0 0 0 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z' />
								</svg>
								<p className='css-0'>Dashboard</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/category'>
						<button
							type='button'
							className={
								pathname == '/category'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<svg
									stroke='currentColor'
									fill='currentColor'
									strokeWidth={0}
									viewBox='0 0 24 24'
									focusable='false'
									className='nav_link_icon'
									height='1em'
									width='1em'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path fill='none' d='M0 0h24v24H0z' />
									<path d='M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-2-6H6v-2h12v2zm-4 4H6v-2h8v2z' />
								</svg>
								<p className='chakra-text css-0'>Categories</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/student'>
						<button
							type='button'
							className={
								pathname == '/student'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<PiStudentDuotone size={20} />

								<p className='chakra-text css-0'>Students</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/mentor'>
						<button
							type='button'
							className={
								pathname == '/mentor'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<FaBlackTie size={20} />
								<p className='chakra-text css-0'>Mentors</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/coursemodule'>
						<button
							type='button'
							className={
								pathname == ('/coursemodule' || '/module')
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<RiSoundModuleFill size={20} />
								<p className='chakra-text css-0'>Course Modules</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/course'>
						<button
							type='button'
							data-active
							className={
								pathname == '/course'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<svg
									stroke='currentColor'
									fill='none'
									strokeWidth={2}
									viewBox='0 0 24 24'
									strokeLinecap='round'
									strokeLinejoin='round'
									focusable='false'
									className='nav_link_icon'
									height='1em'
									width='1em'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none' />
									<path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
									<path d='M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
								</svg>
								<p className='chakra-text css-0'>Course</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/comment'>
						<button
							type='button'
							className={
								pathname == '/comment'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<LiaCommentDotsSolid size={20} />
								<p className='chakra-text css-0'>Course Comments</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/requirement'>
						<button
							type='button'
							className={
								pathname == '/requirement'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<svg
									stroke='currentColor'
									fill='currentColor'
									strokeWidth={0}
									viewBox='0 0 1024 1024'
									focusable='false'
									className='nav_link_icon'
									height='1em'
									width='1em'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z' />
									<path d='M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z' />
								</svg>
								<p className='chakra-text css-0'>Course Requirements</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/benefit'>
						<button
							type='button'
							className={
								pathname == '/benefit'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<AiFillStar size={20} />
								<p className='chakra-text css-0'>Course Benefits</p>
							</div>
						</button>
					</Link>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
