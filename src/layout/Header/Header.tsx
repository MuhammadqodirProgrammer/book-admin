'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import './header.css';
import Image from 'next/image';
import Logo from '../../../public/images/logo2.png';
import adminImg from '../../../public/images/user.png';
import { PiStudentDuotone } from 'react-icons/pi';
import { FaBlackTie } from 'react-icons/fa';
import { RiMovie2Line, RiSoundModuleFill } from 'react-icons/ri';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import DashImg from '../../../public/icons/dashboard.svg';
import { AiFillStar } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiMenu } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
// icons
import { LuArrowLeftFromLine } from 'react-icons/lu';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoSettings } from 'react-icons/io5';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { LuArrowRightFromLine } from 'react-icons/lu';
import { PiArrowsHorizontalBold } from 'react-icons/pi';
import { RiMenu3Fill } from 'react-icons/ri';
import { CgLogOut } from 'react-icons/cg';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { menuState } from '../../stores/counterSlice';
import { useRouter } from 'next/navigation';

// images

import BarImg1 from '../../../public/images/card.png';
import BarImg2 from '../../../public/images/default.png';
import BarImg3 from '../../../public/images/inverted.png';
import BarImg4 from '../../../public/images/vibrant.png';
import { layoutState } from '@/stores/layoutSlice';
import { containerState } from '@/stores/containerSlice';
const Header = () => {
	const isOpenMenu: any = useSelector((state: any) => state.isOpenMenu);
	const positionNav: any = useSelector((state: any) => state.positionNav);
	const containerSt: any = useSelector((state: any) => state.containerSt);
	const dispatch = useDispatch();

	const pathname = usePathname();
	const { setTheme } = useTheme();
	const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
	const [SettingsBar, setSettingsBar] = useState(false);
	const [active, setActive] = useState(true);
	const [display, setDisplay] = useState<string>();
	const [theme, setThemeState] = useState('light');
	const router = useRouter();

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setThemeState(newTheme);
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			setThemeState(storedTheme);
			setTheme(storedTheme);
		}
	}, []);

	const toggleOffcanvas = () => {
		setOffcanvasOpen(!isOffcanvasOpen);
	};
	const toggleSettingsOffCanvas = () => {
		setSettingsBar(!SettingsBar);
	};

	const fullScreen = {
		width: '100%',
	};
	let isOpen = /true/.test(isOpenMenu);

	useEffect(() => {
		localStorage.setItem('isOpen', isOpenMenu);
	}, [isOpen]);
	let isContainerSt = /true/.test(containerSt);

	useEffect(() => {
		localStorage.setItem('my_container', containerSt);
	}, [isContainerSt]);
	useEffect(() => {
		localStorage.setItem('positionNav', positionNav);
	}, [positionNav]);
	const toggleActiveBar = (e: any) => {
		e.preventDefault();
		console.log(e?.target?.classList?.toggle('img_label_border_active'));
	};
console.log(isContainerSt ,"isContainerSt header");

	return (
		<>
			<header className=' px-3  header bg-[#fff] dark:bg-topColor text-black dark:text-white  fixed w-full z-40 top-0 left-0 flex items-center'>
				<div
					className={`flex    ${
						positionNav == 'left' ? ' ' : 'flex-row-reverse'
					} m-auto  justify-between w-[${fullScreen?.width}] items-center  ${isContainerSt ? "my_small_container":""}  `} 
				>
					<div
						className={`flex  items-center gap-x-[30px] ${
							positionNav == 'right' ? 'flex-row-reverse' : ''
						}`}
					>
						<div
							className='w-[40px] h-[40px] rounded-full max-[768px]:hidden transition-all hover:bg-slate-700 flex items-center justify-center '
							data-tooltip-id='my-tooltip'
							data-tooltip-content='Toggle Navigation!'
							data-tooltip-place='right'
							onClick={() => dispatch(menuState())}
						>
							{isOpen ? (
								<FiMenu />
							) : positionNav == 'right' ? (
								<RiMenu3Fill />
							) : (
								<HiMenuAlt1 />
							)}

							<Tooltip id='my-tooltip' />
						</div>

						<Link
							href='/'
							className='flex items-center font-semibold gap-2 sm:text-[24px]  text-[16px]'
						>
							<Image src={Logo} width={32} height={32} alt='logo' />
							Book
						</Link>
					</div>

					<div className=' flex items-center md:gap-x-2  gap-x-3 '>
						{/* <div className='dropdown'>
							<button className='dropbtn text-[14px] text-black dark:text-white'>
								English
							</button>
							<div className='dropdown-content'>
								<button className='w-full'>1</button>
								<button className='w-full'>2</button>
								<button className='w-full'>3</button>
							</div>
						</div> */}

						<button
							type='button'
							className='menu header_icons_box '
							onClick={toggleOffcanvas}
						>
							<svg
								stroke='currentColor'
								fill='currentColor'
								strokeWidth={0}
								viewBox='0 0 24 24'
								focusable='false'
								className='chakra-icon css-13otjrl'
								height='1em'
								width='1em'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g id='Menu_Fries'>
									<path d='M20.437,19.937c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002Z' />
									<path d='M20.437,11.5c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l10,-0.001Z' />
									<path d='M20.437,3.062c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.001Z' />
								</g>
							</svg>
						</button>

						<button
							type='button'
							className=' header_icons_box'
							onClick={() => {
								toggleTheme();
								setActive(!active);
							}}
							data-tooltip-id='my-tooltip2'
							data-tooltip-content='Switch theme!'
							data-tooltip-place='bottom'
							// {active ? data-tooltip-id='my-tooltip':data-tooltip-id='my-tooltip'}
						>
							<svg
								className={active ? '' : 'hidden'}
								stroke='currentColor'
								fill='none'
								stroke-width='2'
								viewBox='0 0 24 24'
								stroke-linecap='round'
								stroke-linejoin='round'
								height='1em'
								width='1em'
								xmlns='http://www.w3.org/2000/svg'
							>
								<circle cx='12' cy='12' r='5'></circle>
								<line x1='12' y1='1' x2='12' y2='3'></line>
								<line x1='12' y1='21' x2='12' y2='23'></line>
								<line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
								<line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
								<line x1='1' y1='12' x2='3' y2='12'></line>
								<line x1='21' y1='12' x2='23' y2='12'></line>
								<line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
								<line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
							</svg>
						
							<svg
								className={!active ? '' : 'hidden'}
								stroke='currentColor'
								fill='currentColor'
								strokeWidth={0}
								viewBox='0 0 16 16'
								height='1em'
								width='1em'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z' />
								<path d='M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z' />
							</svg>
						</button>
						<Tooltip id='my-tooltip2' />
						{/* mode  */}

						<div className='sm:flex items-center ml-3  hidden  '>
							<div>
								<button
									onClick={() => setDisplay('hidden')}
									type='button'
									className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
									aria-expanded='false'
									data-dropdown-toggle='dropdown-user'
								>
									<span className='sr-only'>Open user menu</span>
									<Image
										width={100}
										height={100}
										className='w-8 h-8 rounded-full'
										src={adminImg}
										alt='user photo'
									/>
								</button>
							</div>
							<div
								className={`z-30 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
							>
								<div className='px-4 py-3' role='none'>
									<p
										className='text-sm text-gray-900 dark:text-white'
										role='none'
									>
										Neil Sims
									</p>
									<p
										className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'
										role='none'
									>
										neil.sims@flowbite.com
									</p>
								</div>
								<ul className='py-1' role='none'>
									<li>
										<a
											href='#'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
											role='menuitem'
										>
											Dashboard
										</a>
									</li>
									<li>
										<a
											href='#'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
											role='menuitem'
										>
											Settings
										</a>
									</li>
									<li>
										<a
											href='#'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
											role='menuitem'
										>
											Earnings
										</a>
									</li>
									<li>
										<a
											href='#'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
											role='menuitem'
										>
											Sign out
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<hr />
			</header>

			<div
				className={`flex justify-center bg-slate-800 cursor-pointer dark:hover:bg-[#8958ea] items-center gap-x-2 py-[5px] px-[10px]  rounded-[8px]  z-40 dark:bg-[#9F7AEA]  text-white   
					 ${positionNav == 'left' ? 'postion_st' : 'postion_st_left'} `}
				onClick={() => setSettingsBar(!SettingsBar)}
			>
				<IoSettings className='  animate-spin   ' size={25} />
				<h3 className=' text-[#dbd6d6] font-bold  dark:text-white  uppercase '>
					customize
				</h3>
			</div>

			{isOffcanvasOpen && (
				<nav className='navbar_offcanvas fixed top-0 left-0  h-screen  '>
					<div className='h-[70px] flex items-center px-3 justify-between'>
						<svg
							viewBox='0 0 112.5 30.000001'
							focusable='false'
							className='h-12'
							xmlns='http://www.w3.org/2000/svg'
							zoomAndPan='magnify'
							preserveAspectRatio='xMidYMid meet'
							version='1.0'
						>
							<defs>
								<g></g>
								<clipPath id='a52e12732b'>
									<path
										d='M 1.574219 0 L 30.734375 0 L 30.734375 29.03125 L 1.574219 29.03125 Z M 1.574219 0 '
										clip-rule='nonzero'
									></path>
								</clipPath>
							</defs>
							<g clip-path='url(#a52e12732b)'>
								<path
									fill='#ffffff'
									d='M 12.507812 0 L 19.796875 0 C 20.515625 0 21.226562 0.0703125 21.933594 0.210938 C 22.636719 0.351562 23.320312 0.558594 23.984375 0.832031 C 24.648438 1.105469 25.277344 1.445312 25.875 1.84375 C 26.472656 2.242188 27.023438 2.695312 27.53125 3.203125 C 28.039062 3.710938 28.492188 4.261719 28.890625 4.859375 C 29.289062 5.457031 29.625 6.085938 29.902344 6.75 C 30.175781 7.414062 30.382812 8.097656 30.523438 8.800781 C 30.664062 9.507812 30.734375 10.21875 30.734375 10.933594 L 30.734375 18.226562 C 30.734375 18.945312 30.664062 19.65625 30.523438 20.359375 C 30.382812 21.0625 30.175781 21.746094 29.902344 22.410156 C 29.625 23.074219 29.289062 23.703125 28.890625 24.300781 C 28.492188 24.898438 28.039062 25.449219 27.53125 25.957031 C 27.023438 26.464844 26.472656 26.917969 25.875 27.316406 C 25.277344 27.71875 24.648438 28.054688 23.984375 28.328125 C 23.320312 28.605469 22.636719 28.8125 21.933594 28.949219 C 21.226562 29.089844 20.515625 29.160156 19.796875 29.160156 L 12.507812 29.160156 C 11.789062 29.160156 11.078125 29.089844 10.375 28.949219 C 9.671875 28.8125 8.988281 28.605469 8.324219 28.328125 C 7.660156 28.054688 7.03125 27.71875 6.433594 27.316406 C 5.835938 26.917969 5.285156 26.464844 4.777344 25.957031 C 4.269531 25.449219 3.816406 24.898438 3.414062 24.300781 C 3.015625 23.703125 2.679688 23.074219 2.40625 22.410156 C 2.128906 21.746094 1.921875 21.0625 1.78125 20.359375 C 1.644531 19.65625 1.574219 18.945312 1.574219 18.226562 L 1.574219 10.933594 C 1.574219 10.21875 1.644531 9.507812 1.78125 8.800781 C 1.921875 8.097656 2.128906 7.414062 2.40625 6.75 C 2.679688 6.085938 3.015625 5.457031 3.414062 4.859375 C 3.816406 4.261719 4.269531 3.710938 4.777344 3.203125 C 5.285156 2.695312 5.835938 2.242188 6.433594 1.84375 C 7.03125 1.445312 7.660156 1.105469 8.324219 0.832031 C 8.988281 0.558594 9.671875 0.351562 10.375 0.210938 C 11.078125 0.0703125 11.789062 0 12.507812 0 Z M 12.507812 0 '
									fill-opacity='1'
									fill-rule='nonzero'
								></path>
							</g>
							<path
								fill='#1a202c'
								d='M 9.152344 13.726562 L 10.027344 14.242188 L 10.027344 18.335938 L 10.902344 18.847656 L 11.777344 19.363281 L 14.402344 20.898438 L 15.277344 21.414062 L 16.148438 21.925781 L 17.023438 21.414062 L 17.898438 20.898438 L 20.523438 19.363281 L 21.398438 18.847656 L 22.273438 18.335938 L 22.273438 14.242188 L 23.148438 13.726562 L 23.148438 15.582031 C 23.074219 15.625 23.027344 15.710938 23.027344 15.800781 C 23.027344 15.886719 23.066406 15.957031 23.128906 16.003906 L 23.097656 16.09375 L 22.921875 16.644531 L 23.625 16.644531 L 23.449219 16.09375 L 23.421875 16.003906 C 23.484375 15.957031 23.523438 15.898438 23.523438 15.800781 C 23.523438 15.703125 23.453125 15.59375 23.355469 15.558594 L 23.355469 13.605469 L 16.363281 9.507812 L 16.574219 9.382812 L 23.574219 13.480469 L 24.027344 13.214844 L 24.902344 12.703125 L 23.152344 11.679688 L 22.277344 11.164062 L 21.402344 10.65625 L 20.527344 10.140625 L 16.152344 7.582031 L 12.652344 9.628906 L 11.777344 10.144531 L 10.90625 10.65625 L 7.40625 12.703125 L 8.28125 13.214844 Z M 15.277344 12.191406 L 16.152344 11.679688 L 17.902344 12.703125 L 17.027344 13.21875 L 15.277344 14.242188 L 15.277344 15.265625 L 16.152344 15.777344 L 18.777344 14.242188 L 19.652344 13.726562 L 20.527344 13.214844 L 21.128906 12.863281 L 21.402344 12.703125 L 20.65625 12.269531 L 20.527344 12.191406 L 17.902344 10.65625 L 17.027344 10.140625 L 16.15625 9.628906 L 15.277344 10.144531 L 14.402344 10.65625 L 13.53125 11.167969 L 10.90625 12.703125 L 11.78125 13.21875 L 11.78125 17.3125 L 12.65625 17.824219 L 13.53125 18.339844 L 14.402344 18.851562 L 16.152344 19.875 L 18.777344 18.339844 L 19.652344 17.824219 L 20.527344 17.3125 L 20.527344 15.265625 L 17.902344 16.800781 L 17.027344 17.316406 L 16.152344 17.828125 L 15.277344 17.3125 L 14.402344 16.800781 L 13.53125 16.289062 L 13.53125 13.214844 L 14.402344 12.703125 Z M 15.277344 12.191406 '
								fill-opacity='1'
								fill-rule='evenodd'
							></path>
							<g fill='#ffffff' fill-opacity='1'>
								<g transform='translate(34.794244, 21.506453)'>
									<g>
										<path d='M 6.25 0.140625 C 5.289062 0.140625 4.425781 -0.0234375 3.65625 -0.359375 C 2.894531 -0.691406 2.289062 -1.164062 1.84375 -1.78125 C 1.40625 -2.40625 1.1875 -3.128906 1.1875 -3.953125 L 3.703125 -3.953125 C 3.753906 -3.335938 3.992188 -2.828125 4.421875 -2.421875 C 4.859375 -2.023438 5.46875 -1.828125 6.25 -1.828125 C 7.0625 -1.828125 7.691406 -2.019531 8.140625 -2.40625 C 8.597656 -2.800781 8.828125 -3.3125 8.828125 -3.9375 C 8.828125 -4.414062 8.6875 -4.804688 8.40625 -5.109375 C 8.125 -5.410156 7.773438 -5.640625 7.359375 -5.796875 C 6.941406 -5.960938 6.363281 -6.144531 5.625 -6.34375 C 4.6875 -6.582031 3.925781 -6.828125 3.34375 -7.078125 C 2.757812 -7.335938 2.257812 -7.734375 1.84375 -8.265625 C 1.4375 -8.804688 1.234375 -9.519531 1.234375 -10.40625 C 1.234375 -11.226562 1.4375 -11.945312 1.84375 -12.5625 C 2.257812 -13.1875 2.835938 -13.660156 3.578125 -13.984375 C 4.316406 -14.316406 5.175781 -14.484375 6.15625 -14.484375 C 7.539062 -14.484375 8.675781 -14.132812 9.5625 -13.4375 C 10.445312 -12.75 10.9375 -11.800781 11.03125 -10.59375 L 8.4375 -10.59375 C 8.394531 -11.113281 8.144531 -11.554688 7.6875 -11.921875 C 7.238281 -12.296875 6.644531 -12.484375 5.90625 -12.484375 C 5.226562 -12.484375 4.675781 -12.3125 4.25 -11.96875 C 3.832031 -11.632812 3.625 -11.144531 3.625 -10.5 C 3.625 -10.0625 3.753906 -9.703125 4.015625 -9.421875 C 4.285156 -9.140625 4.625 -8.914062 5.03125 -8.75 C 5.445312 -8.582031 6.015625 -8.398438 6.734375 -8.203125 C 7.679688 -7.941406 8.453125 -7.679688 9.046875 -7.421875 C 9.640625 -7.160156 10.144531 -6.757812 10.5625 -6.21875 C 10.976562 -5.675781 11.1875 -4.953125 11.1875 -4.046875 C 11.1875 -3.328125 10.988281 -2.644531 10.59375 -2 C 10.207031 -1.351562 9.640625 -0.832031 8.890625 -0.4375 C 8.148438 -0.0507812 7.269531 0.140625 6.25 0.140625 Z M 6.25 0.140625 '></path>
									</g>
								</g>
							</g>
							<g fill='#ffffff' fill-opacity='1'>
								<g transform='translate(47.219963, 21.506453)'>
									<g>
										<path d='M 0.765625 -5.71875 C 0.765625 -6.851562 1 -7.859375 1.46875 -8.734375 C 1.945312 -9.617188 2.59375 -10.304688 3.40625 -10.796875 C 4.21875 -11.285156 5.117188 -11.53125 6.109375 -11.53125 C 7.003906 -11.53125 7.785156 -11.351562 8.453125 -11 C 9.117188 -10.644531 9.648438 -10.207031 10.046875 -9.6875 L 10.046875 -11.34375 L 12.40625 -11.34375 L 12.40625 0 L 10.046875 0 L 10.046875 -1.6875 C 9.648438 -1.15625 9.109375 -0.707031 8.421875 -0.34375 C 7.734375 0.0078125 6.953125 0.1875 6.078125 0.1875 C 5.097656 0.1875 4.203125 -0.0625 3.390625 -0.5625 C 2.585938 -1.0625 1.945312 -1.757812 1.46875 -2.65625 C 1 -3.5625 0.765625 -4.582031 0.765625 -5.71875 Z M 10.046875 -5.671875 C 10.046875 -6.460938 9.882812 -7.144531 9.5625 -7.71875 C 9.238281 -8.289062 8.816406 -8.726562 8.296875 -9.03125 C 7.773438 -9.332031 7.210938 -9.484375 6.609375 -9.484375 C 6.003906 -9.484375 5.441406 -9.335938 4.921875 -9.046875 C 4.398438 -8.753906 3.976562 -8.320312 3.65625 -7.75 C 3.332031 -7.175781 3.171875 -6.5 3.171875 -5.71875 C 3.171875 -4.9375 3.332031 -4.25 3.65625 -3.65625 C 3.976562 -3.070312 4.398438 -2.625 4.921875 -2.3125 C 5.453125 -2.007812 6.015625 -1.859375 6.609375 -1.859375 C 7.210938 -1.859375 7.773438 -2.003906 8.296875 -2.296875 C 8.816406 -2.597656 9.238281 -3.039062 9.5625 -3.625 C 9.882812 -4.207031 10.046875 -4.890625 10.046875 -5.671875 Z M 10.046875 -5.671875 '></path>
									</g>
								</g>
							</g>
							<g fill='#ffffff' fill-opacity='1'>
								<g transform='translate(61.168033, 21.506453)'>
									<g>
										<path d='M 15.265625 -11.53125 C 16.160156 -11.53125 16.957031 -11.34375 17.65625 -10.96875 C 18.363281 -10.59375 18.921875 -10.039062 19.328125 -9.3125 C 19.734375 -8.59375 19.9375 -7.71875 19.9375 -6.6875 L 19.9375 0 L 17.609375 0 L 17.609375 -6.34375 C 17.609375 -7.351562 17.351562 -8.128906 16.84375 -8.671875 C 16.34375 -9.210938 15.65625 -9.484375 14.78125 -9.484375 C 13.894531 -9.484375 13.195312 -9.210938 12.6875 -8.671875 C 12.175781 -8.128906 11.921875 -7.351562 11.921875 -6.34375 L 11.921875 0 L 9.59375 0 L 9.59375 -6.34375 C 9.59375 -7.351562 9.335938 -8.128906 8.828125 -8.671875 C 8.316406 -9.210938 7.625 -9.484375 6.75 -9.484375 C 5.875 -9.484375 5.175781 -9.210938 4.65625 -8.671875 C 4.144531 -8.128906 3.890625 -7.351562 3.890625 -6.34375 L 3.890625 0 L 1.546875 0 L 1.546875 -11.34375 L 3.890625 -11.34375 L 3.890625 -10.046875 C 4.273438 -10.503906 4.757812 -10.863281 5.34375 -11.125 C 5.9375 -11.394531 6.570312 -11.53125 7.25 -11.53125 C 8.15625 -11.53125 8.960938 -11.335938 9.671875 -10.953125 C 10.378906 -10.566406 10.925781 -10.007812 11.3125 -9.28125 C 11.65625 -9.96875 12.191406 -10.515625 12.921875 -10.921875 C 13.648438 -11.328125 14.429688 -11.53125 15.265625 -11.53125 Z M 15.265625 -11.53125 '></path>
									</g>
								</g>
							</g>
							<g fill='#ffffff' fill-opacity='1'>
								<g transform='translate(82.542729, 21.506453)'>
									<g>
										<path d='M 15.265625 -11.53125 C 16.160156 -11.53125 16.957031 -11.34375 17.65625 -10.96875 C 18.363281 -10.59375 18.921875 -10.039062 19.328125 -9.3125 C 19.734375 -8.59375 19.9375 -7.71875 19.9375 -6.6875 L 19.9375 0 L 17.609375 0 L 17.609375 -6.34375 C 17.609375 -7.351562 17.351562 -8.128906 16.84375 -8.671875 C 16.34375 -9.210938 15.65625 -9.484375 14.78125 -9.484375 C 13.894531 -9.484375 13.195312 -9.210938 12.6875 -8.671875 C 12.175781 -8.128906 11.921875 -7.351562 11.921875 -6.34375 L 11.921875 0 L 9.59375 0 L 9.59375 -6.34375 C 9.59375 -7.351562 9.335938 -8.128906 8.828125 -8.671875 C 8.316406 -9.210938 7.625 -9.484375 6.75 -9.484375 C 5.875 -9.484375 5.175781 -9.210938 4.65625 -8.671875 C 4.144531 -8.128906 3.890625 -7.351562 3.890625 -6.34375 L 3.890625 0 L 1.546875 0 L 1.546875 -11.34375 L 3.890625 -11.34375 L 3.890625 -10.046875 C 4.273438 -10.503906 4.757812 -10.863281 5.34375 -11.125 C 5.9375 -11.394531 6.570312 -11.53125 7.25 -11.53125 C 8.15625 -11.53125 8.960938 -11.335938 9.671875 -10.953125 C 10.378906 -10.566406 10.925781 -10.007812 11.3125 -9.28125 C 11.65625 -9.96875 12.191406 -10.515625 12.921875 -10.921875 C 13.648438 -11.328125 14.429688 -11.53125 15.265625 -11.53125 Z M 15.265625 -11.53125 '></path>
									</g>
								</g>
							</g>
							<g fill='#ffffff' fill-opacity='1'>
								<g transform='translate(103.917426, 21.506453)'>
									<g>
										<path d='M 2.734375 -12.84375 C 2.304688 -12.84375 1.945312 -12.984375 1.65625 -13.265625 C 1.375 -13.554688 1.234375 -13.914062 1.234375 -14.34375 C 1.234375 -14.769531 1.375 -15.125 1.65625 -15.40625 C 1.945312 -15.695312 2.304688 -15.84375 2.734375 -15.84375 C 3.148438 -15.84375 3.5 -15.695312 3.78125 -15.40625 C 4.070312 -15.125 4.21875 -14.769531 4.21875 -14.34375 C 4.21875 -13.914062 4.070312 -13.554688 3.78125 -13.265625 C 3.5 -12.984375 3.148438 -12.84375 2.734375 -12.84375 Z M 3.890625 -11.34375 L 3.890625 0 L 1.546875 0 L 1.546875 -11.34375 Z M 3.890625 -11.34375 '></path>
									</g>
								</g>
							</g>
						</svg>
						<button
							onClick={toggleOffcanvas}
							type='button'
							className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900   rounded-lg text-sm w-8 h-8  inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
						>
							<svg
								className='w-3 h-3'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 14 14'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
								/>
							</svg>
						</button>
					</div>
					<div className=' bg-slate-100  dark:bg-slate-900 h-screen '>
					<div className='navbar_box text-black dark:text-mainColor '>
					<Link className='nav_link' href='/'>
						<button
							type='button'
							className={
								pathname == '/'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
							onClick={toggleOffcanvas}
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
					<Link className='nav_link' href='/author'>
						<button
							type='button'
							className={
								pathname == '/author'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
							onClick={toggleOffcanvas}

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
								 <p className='chakra-text css-0'>Author</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/users'>
						<button
							type='button'
							className={
								pathname == '/users'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
							onClick={toggleOffcanvas}

						>
							<div className='flex items-center gap-x-2 justify-start'>
								<PiStudentDuotone size={20} />
								 <p className='chakra-text css-0'>Users</p>
							</div>
						</button>
					</Link>
					<Link className='nav_link' href='/books'>
						<button
							type='button'
							className={
								pathname == '/books'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
							onClick={toggleOffcanvas}

						>
							<div className='flex items-center gap-x-2 justify-start'>
								<FaBlackTie size={20} />
								<p className='chakra-text css-0'>Books</p>
							</div>
						</button>
					</Link>

					<Link className='nav_link' href='/bookComments'>
						<button
							type='button'
							className={
								pathname == '/bookComments'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
							onClick={toggleOffcanvas}

						>
							<div className='flex items-center gap-x-2 justify-start'>
								<LiaCommentDotsSolid size={20} />
							 <p className='chakra-text css-0'>Books Comments</p>
							</div>
						</button>
					</Link>
					<div className='nav_link' >
						<button
							type='button'
							className={
								pathname == '/requirement'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
							

							onClick={()=>{
								router.push("/login")
								localStorage.removeItem("token")
								toggleOffcanvas()
							}}
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<CgLogOut />
						 <p className='chakra-text css-0'>LogOut</p>
							</div>
						</button>
					</div>
				</div>
					</div>
				</nav>
			)}

			{SettingsBar && (
				<nav
					className={`  h-screen  ${
						positionNav == 'left'
							? ' settings_offcanvas'
							: 'settings_offcanvas_left'
					}    `}
				>
					<div className='h-[10vh] flex items-center  px-3 py-1 justify-between dark:bg-[#171923] bg-[#6071d6] '>
						<div>
							<div className='flex items-center gap-x-3'>
								<IoColorPaletteSharp size={22} />
								<h3 className='font-bold text-[22px] '> Settins bar </h3>
							</div>
							<p className=' dark:text-slate-200 text-balck '>Set your own customized style</p>
						</div>

						<button
							onClick={() => setSettingsBar(!SettingsBar)}
							type='button'
							className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900   rounded-lg text-sm w-8 h-8  inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
						>
							<svg
								className='w-3 h-3'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 14 14'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
								/>
							</svg>
						</button>
					</div>
					<div className=' bg-slate-100  dark:bg-slate-900 min-h-screen p-3 '>
						<div className=' text-black mt-0 dark:text-mainColor '>
							<div className=' border-b-[1px]  mt-2 pb-2 border-cyan-100 flex items-center  justify-between'>
								<div>
									<div className='flex items-center gap-x-3'>
										{true ? (
											<LuArrowLeftFromLine size={22} />
										) : (
											<LuArrowRightFromLine size={22} />
										)}

										<h3 className='font-bold text-[20px]  '> RTL Mode </h3>
									</div>
									<p className=' dark:text-slate-200 text-balck  text-[13px]  '>
										Switch your navbar direction
									</p>
								</div>
								<button
									onClick={() => {
										dispatch(layoutState());
										toggleSettingsOffCanvas();
									}}
									className={`switch_btn ${
										positionNav == 'right' ? 'switch_btn_active' : ''
									} `}
								></button>
							</div>

							<div className=' border-b-[1px]  mt-3 pb-2 border-cyan-100 flex items-center  justify-between'>
								<div>
									<div className='flex items-center gap-x-3'>
										<PiArrowsHorizontalBold size={22} />

										<h3 className='font-bold text-[20px]  '> Fluid Layout</h3>
									</div>
									<p className=' dark:text-slate-200 text-balck  text-[13px]  '>
										Toggle container layout system
									</p>
								</div>

								<button
									onClick={() => {
										dispatch(containerState());
										toggleSettingsOffCanvas();
									}}
									className={`switch_btn  ${isContainerSt ? "":"switch_btn_active"}   `}
								></button>
							</div>

							<div className='   mt-3 pb-2  '>
								<div className='flex items-center gap-x-3'>
									<IoSettings size={22} />

									<h3 className='font-bold text-[20px]  '>
										{' '}
										Vertical Navbar Style
									</h3>
								</div>
								<p className=' dark:text-slate-200 text-balck  text-[13px]  '>
									Switch between styles for your vertical navbar
								</p>

								<div className='flex'></div>
								<div className='grid   gap-1 grid-cols-2  '>
									<div>
										<label htmlFor='cb1' className='img_label'>
											<Image
												alt='img'
												onClick={toggleActiveBar}
												src={BarImg1}
											/>
										</label>
										<div className='flex items-center gap-2'>
											<span
												className={` w-[15px] h-[15px] rounded-full border-cyan-200 border-[${
													true ? '1px' : '5px'
												}] `}
											></span>
											<p className=' text-[18px] dark:text-white text-slate-700  '>
												{' '}
												Inverted
											</p>
										</div>
									</div>
									<div>
										<label htmlFor='cb2' className='img_label'>
											<Image
												alt='img'
												onClick={toggleActiveBar}
												src={BarImg2}
											/>
										</label>
										<div className='flex items-center gap-2 '>
											<span
												className={` w-[15px] h-[15px] rounded-full border-cyan-200 border-[${
													true ? '1px' : '5px'
												}] `}
											></span>
											<p className=' text-[18px] dark:text-white text-slate-700  '>
												{' '}
												Inverted
											</p>
										</div>
									</div>
									<div>
										<label htmlFor='cb3' className='img_label'>
											<Image
												alt='img'
												onClick={toggleActiveBar}
												src={BarImg3}
											/>
										</label>
										<div className='flex  items-center gap-2 '>
											<span
												className={` w-[15px] h-[15px] rounded-full border-cyan-200 border-[${
													true ? '1px' : '5px'
												}] `}
											></span>
											<p className=' text-[18px] dark:text-white text-slate-700  '>
												{' '}
												Inverted
											</p>
										</div>
									</div>
									<div>
										<label htmlFor='cb4' className='img_label'>
											<Image
												alt='img'
												onClick={toggleActiveBar}
												src={BarImg4}
											/>
										</label>
										<div className='flex  items-center gap-2 '>
											<span
												className={` w-[15px] h-[15px] rounded-full border-cyan-200 border-[${
													true ? '1px' : '5px'
												}] `}
											></span>
											<p className=' text-[18px] dark:text-white text-slate-700  '>
												{' '}
												Inverted
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			)}
		</>
	);
};

export default Header;
