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

	let isOpen = /true/.test(isOpenMenu);
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	if (!token) {
		// router.replace("/login");
	} else {
		// router.replace("/");
	}

	return (
		<>
			<div>
				<Header />
			</div>
			<Navbar />

			<div
				className={` mt-[12vh] min-h-[78vh] ${
					isOpen ? 'inner_container_right_big' : 'inner_container_right_small'
				}    `}
			>
				{children}
			</div>
		</>
	);
}
