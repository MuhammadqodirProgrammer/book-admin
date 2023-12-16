import React, { useEffect } from 'react';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import FamousCourses from '@/components/FamousCourses/FamousCourses';
import NewCourses from '@/components/NewCourses/NewCourses';
import { useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { apiRoot } from '@/app/api/api';


const cookies = new Cookies();
export default function Layout({ children }: any) {
	const router = useRouter();

	const isOpenMenu = useSelector((state: any) => state.isOpenMenu);
	const positionNav: any = useSelector((state: any) => state.positionNav);
	const containerSt: any = useSelector((state: any) => state.containerSt);

	let isOpen = /true/.test(isOpenMenu);
	let isContainerSt = /true/.test(containerSt);

	useEffect(() => {
		const token =
			typeof window !== 'undefined' ? localStorage.getItem('token') : null;

		if (!token) {
			router.push('/login');
		} else {
			router.push('/');
		}
		console.log(token, 'token ');
	}, []);
	useEffect(() => {
		const getKey = async () => {
			const key =cookies.get("mykey") 
			// const isKey =localStorage.getItem("isKey")
			if(!key){
				const resp = await apiRoot.get(`check/key`);
				console.log(resp, 'response');
				if(resp?.status ==201){
					// localStorage.setItem("isKey" ,resp?.data?.key)
					cookies.set("mykey" ,resp?.data?.key ,{ maxAge: 365 * 24 * 60 * 60 * 1000 } )
					// res.cookie('mykey', myKey, { maxAge: 365 * 24 * 60 * 60 * 1000 });
				}
			}
			console.log(key, "my key");
	
			
		};
		getKey()
	}, []);
	return (
		<>
			<div className={` ${isContainerSt ? 'my_small_container' : ''} `}>
				<div>
					<Header />
				</div>
				<Navbar />

				<div
					className={` mt-[80px] min-h-[78vh] ${
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
