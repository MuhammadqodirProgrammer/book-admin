import React from 'react';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import FamousCourses from '@/components/FamousCourses/FamousCourses';
import NewCourses from '@/components/NewCourses/NewCourses';
import { useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'
import { useSelector, useDispatch } from 'react-redux';
export default function Layout({ children }: any) {
	const router = useRouter();

	const isOpenMenu = useSelector((state: any) => state.isOpenMenu);
	const positionNav: any = useSelector((state: any) => state.positionNav);
	const containerSt: any = useSelector((state: any) => state.containerSt);

	let isOpen = /true/.test(isOpenMenu);
	let isContainerSt = /true/.test(containerSt);
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	if (!token) {
		// router.replace("/login");
	} else {
		// router.replace("/");
	}
	console.log(token, 'token ');

		return (
			<>
				<div className={` ${isContainerSt ? 'my_small_container' : ''} `}>
					<div>
						<Header />
					</div>
					<Navbar />

					<div
						className={` mt-[12vh] min-h-[78vh] ${
							isOpen && positionNav == 'left'
								? 'inner_container_right_big'
								: isOpen && positionNav == 'right'
								? 'inner_container_right_big_left'
								: !isOpen && positionNav == 'left'
								? 'inner_container_right_small'
								: !isOpen && positionNav == 'right'
								? 'inner_container_right_small_left'
								: ''
						}   `}
					>
						{children}
					</div>
				</div>
			</>
		);
	
}
