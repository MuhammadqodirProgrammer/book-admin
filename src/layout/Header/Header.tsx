'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import './header.css';
import Image from 'next/image';
import Logo from '../../../public/images/logo2.png';
import adminImg from '../../../public/images/user.png';
import MyLogo from '../../../public/images/mylogo.png';
import { PiStudentDuotone } from 'react-icons/pi';
import { FaBlackTie } from 'react-icons/fa';
import { RiMovie2Line, RiSoundModuleFill } from 'react-icons/ri';
import { LiaCommentDotsSolid } from 'react-icons/lia';
import { FaBook } from "react-icons/fa";
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
import { BiCategory } from "react-icons/bi";
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
	const [theme, setThemeState] = useState('dark');
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
							<Image src={MyLogo}  alt='logo' className="  w-[auto] h-[60px]  " />
							
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
					

						<Image src={MyLogo} alt="logo"  className=" h-[60px] w-[80%] " /> 
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
								{/* <svg
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
								</svg> */}
								<FaBlackTie size={20}/>
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
					<Link className='nav_link' href='/category'>
						<button
							type='button'
							className={
								pathname == '/category'
									? 'active_link nav_link-button'
									: 'nav_link-button'
							}
							onClick={toggleOffcanvas}
						>
							<div className='flex items-center gap-x-2 justify-start'>
							<BiCategory size={20}/>
								 <p className='chakra-text css-0'>Category</p>
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
								<FaBook size={20} />
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
