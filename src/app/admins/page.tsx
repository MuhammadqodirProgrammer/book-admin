'use client';
import Link from 'next/link';
import Image from 'next/image';
import AdminImg from "../../../public/images/admin.png"
import { FaBirthdayCake } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { apiRoot, baseMediaUrl, baseUrlImg } from '../api/api';
import { SkeletonDemo } from '@/components/Skeleton/Skeleton';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Modal } from '@/components/Modal/Modal';
import { uploadFile, uploadImage } from '@/components/Upload/Upload';
import { ToastContainer, toast } from 'react-toastify';
import { FaUserSecret } from "react-icons/fa";
import { useRouter } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'
import { RiAdminFill } from "react-icons/ri";
export default function Page() {
	const [data, setData] = useState<any>([]);
	const [OneData, setOneData] = useState<any>([]);
	const [activePage, setActivePage] = useState(1);

	// Modals state
	const [Create, setCreate] = useState<any>(false);
	const [EditModal, setEditModal] = useState<any>(false);
	const [DeleteModal, setDeleteModal] = useState<any>(false);
	const [DeleteId, setDeleteId] = useState<any>(false);
	// media state
	const [ImageUrl, setImageUrl] = useState<any>('');

	// Refs
	const nameRef = useRef<any>();
	const emailRef = useRef<any>();
	const passwordRef = useRef<any>();

	const editnameRef = useRef<any>();
	const editemailRef = useRef<any>();
	const editpasswordRef = useRef<any>();
		
	const router = useRouter();
	const token =
	typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	useEffect(() => {
		if(!token){
			router.push("/login")
		}else{

			(async () =>{
				const data = {
					token,
				};
	
				const resp = await apiRoot.post('check/token', data, {
					headers: {
						Authorization: `${token}`,
						'Content-Type': 'application/json',
					},
				});
				console.log(resp ,"resp kffkjfj");
				if (!(resp?.data?.message === 'Token not expired') ) {
					router.push("/login")
					toast.error(resp?.data?.message);
					localStorage.removeItem('token');
				}
			})()
		}
		
	}, []);
	
	const getFunc = async () => {
		const resp = await apiRoot.get(`admins` ,{
			headers: {
				Authorization: token,
			},
		});

		if (resp?.status === 200) {
			setData(resp?.data);
		
		}
	};

	const getOneFunc = async (id: any) => {
		const resp = await apiRoot.get(`admins/${id}` ,{
			headers: {
				Authorization: token,
			},
		});
		setEditModal(true);
		setDeleteId(id);
		console.log(resp?.data, 'data editttttttttttttt');
		if (resp?.status === 200) {
			setOneData(resp?.data);
		}
	};


	// Create
	const createFunc = async (evt: any) => {
		evt.preventDefault();

		const req = {
			full_name: nameRef?.current?.value,
			email: emailRef?.current?.value,
			password: passwordRef?.current?.value,
			
		};
		
		const resp = await apiRoot
			.post('admins', req, {
				headers: {
					Authorization: token,
				},
			})
			.catch((err: any) => {
				toast.error(err?.response?.data?.message?.[0]);
			});

		if (resp?.status === 201) {
			toast.success('Succesfully created');
			setCreate(false)
			getFunc();
			nameRef.current.value=""
emailRef.current.value=""
passwordRef.current.value=""
		}
	};

	// edit
	const editFunc = async (evt: any) => {
		evt.preventDefault();

		const req = {
			full_name: editnameRef?.current?.value ||OneData?.full_name,
			email: editemailRef?.current?.value ||OneData?.email,
			password: editpasswordRef?.current?.value ||OneData?.password,
			
		};
console.log(req , "reqqqqqqqqqqqqq");


		const resp = await apiRoot
			.patch(`admins/${DeleteId}`, req, {
				headers: {
					Authorization: token,
				},
			})
			.catch((err: any) => {
				toast.error(err?.response?.data?.message?.[0]);
			});

		console.log(resp, 'resp');

		if (resp?.status === 200) {
			setEditModal(false);
			toast.success('Succesfully edited');
		await getFunc();
		}
	};
	// Delete
	async function deleteFunc(evt: any) {
		evt.preventDefault();
		const res = await apiRoot.delete(`/admins/${DeleteId}`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(res, 'resp');

		if (res?.status === 200) {
			toast.success('Successfully deleted ');
			setDeleteModal(false);
			getFunc();
		} else {
			toast.error('Something went wrong, please try again');
		}
	}

	useEffect(() => {
		getFunc();
		console.log(data , "dataaaaaaaaaaaaaaa");
	}, []);

	return (
		<>
			<div className='flex items-center  justify-center  gap-[30px] mb-[15px] '>
				<h3 className=' text-[22px] dark:text-white text-black  '>Admins </h3>

				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => setCreate(true)}
				>
					Add Admin
				</button>
			</div>

			<div className='grid lg:grid-cols-3 max-lg:grid-cols-2  max-sm:grid-cols-1  gap-3 py-3'>
				{data?.length ? (
					data?.map((item: any) => (
						<div
							key={item?.id}
							className='flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-lg:w-[90%] max-sm:w-[100%] w-[100%] max-lg:m-auto'
						>
							<Image
								className='h-[280px]  w-full object-contain rounded-lg transition ease-in-out hover:opacity-75'
								src={AdminImg}
								alt='Picture of the author'
								width={1000}
								height={1000}
							/>
							
							<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
							{item?.full_name?.length > 25 ? item?.full_name?.slice(0, 23 ) +".." :item?.full_name}
							</h6>
							<h6 className='pt-[10px] text-[18px] font-bold text-black dark:text-white'>
							{item?.email?.length > 25 ? item?.email?.slice(0, 23 ) +".." :item?.email}
							</h6>
							<div className='flex justify-between items-center mt-[10px]'>
								<span className='flex gap-[5px] mb-3 items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
									
									{item?.role =="superAdmin" ?<FaUserSecret size={20} />:<RiAdminFill size={20} /> }
									{item?.role}
								</span>
								<div className=' flex items-center gap-2 right-[10px] '>
									<RiDeleteBin5Fill
										size={25}
										onClick={() => {
											setDeleteId(item?.id);
											setDeleteModal(true);
										}}
										className=' text-red-600 hover:text-red-700  cursor-pointer h-[30px] '
									/>
									<FaEdit
										size={25}
										onClick={() => {
											getOneFunc(item?.id);
										}}
										className=' text-yellow-400 hover:text-yellow-500 cursor-pointer h-[30px] '
									/>
								</div>
							</div>
							<hr className='h-1 w-full bg-CoursesHr' />
							<div className='flex justify-between items-center pt-5'>
								<div className='flex gap-[10px] items-center text-black dark:text-white'>
									<p>Created:</p>
									{item?.createdAt?.slice(0, 10)}
								</div>
							
							</div>
						</div>
					))
				) : (
					<SkeletonDemo />
				)}
			</div>

		

			{/* create modal  */}

			<Modal
				width={'900px'}
				title={'Create Admin'}
				modal={Create}
				setModal={setCreate}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={createFunc}
					>
							
						<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
							placeholder='Admin fullName'
							type='text'
							ref={nameRef}
						/>
							<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
							placeholder='Eshmat@gmail.com '
							type='email'
							ref={emailRef}
						/>
						<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
							placeholder='Admin Password'
							type='text'
							ref={passwordRef}
						/>


						<div className='flex gap-x-2'>
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
								type='submit'
							>
								Add
							</button>
							<button
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
								type='button'
								onClick={() => setCreate(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>

			{/* edit modal  */}

			<Modal
				width={'900px'}
				title={'Edit Author'}
				modal={EditModal}
				setModal={setEditModal}
			>
				<div className=' md:p-5 '>
				<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={editFunc}
					>
							
						<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
							placeholder='Admin fullName'
							type='text'
							ref={editnameRef}
							defaultValue={OneData?.full_name}
						/>
							<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
							placeholder='Eshmat@gmail.com '
							type='email'
							ref={editemailRef}
							defaultValue={OneData?.email}
						/>
						<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
							placeholder='Enter new  Password'
							type='text'
							ref={editpasswordRef}
							
						/>


						<div className='flex gap-x-2'>
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
								type='submit'
							>
								Add
							</button>
							<button
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
								type='button'
								onClick={() => setEditModal(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>

			{/* delete modal  */}

			<Modal
				width={' w-[85%] md:w-[600px] '}
				title={'Delete Admin'}
				modal={DeleteModal}
				setModal={setDeleteModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={deleteFunc}
					>
						<h2 className='mb-2 text-[22px] text-gray-500 dark:text-gray-400'>
							{' '}
							Do you want to delete this Admin?{' '}
						</h2>
						<div className='flex gap-x-2'>
							<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
								Yes
							</button>
							<button
								type='button'
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
								onClick={() => setDeleteModal(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>

			<ToastContainer />
		</>
	);
}
