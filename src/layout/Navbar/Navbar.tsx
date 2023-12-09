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
import { CgLogOut } from 'react-icons/cg';
// redux
import { useSelector } from 'react-redux';

function Navbar() {
	const pathname = usePathname();
	const isOpenMenu = useSelector((state: any) => state.isOpenMenu);
	const positionNav: any = useSelector((state: any) => state.positionNav);
	let isOpen = /true/.test(isOpenMenu);
	const containerSt: any = useSelector((state: any) => state.containerSt);
	let iscontainerSt = /true/.test(containerSt);
	console.log(positionNav, 'positionNav navda');
	return (
		<>
			<nav
				className={`navbar  shadow z-30 bg-[#fff] dark:bg-topColor hidden md:flex  ${
					isOpen ? 'w-[300px]' : 'w-[80px]'
				}  ${positionNav=="right" ? "right-0   ":"left-0 "}  ${iscontainerSt ? "navbar_absolute" :""} `} 
			>
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
								{isOpen && <p className='css-0'>Dashboard</p>}
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
								{isOpen && <p className='chakra-text css-0'>Author</p>}
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
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<PiStudentDuotone size={20} />
								{isOpen && <p className='chakra-text css-0'>Users</p>}
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
						>
							<div className='flex items-center gap-x-2 justify-start'>
								<FaBlackTie size={20} />
								{isOpen && <p className='chakra-text css-0'>Books</p>}
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
								{isOpen && <p className='chakra-text css-0'>Books Comments</p>}
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
								<CgLogOut />
								{isOpen && <p className='chakra-text css-0'>LogOut</p>}
							</div>
						</button>
					</Link>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
