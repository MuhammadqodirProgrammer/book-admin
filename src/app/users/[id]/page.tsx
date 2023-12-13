'use client';
import Image from 'next/image';
import { FaBirthdayCake } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { SkeletonDemo ,SingleSkeleton } from '@/components/Skeleton/Skeleton';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Modal } from '@/components/Modal/Modal';
import {  uploadImage } from '@/components/Upload/Upload';
import { ToastContainer, toast } from 'react-toastify';
import { apiRoot, baseMediaUrl } from '@/app/api/api';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoMdEye } from 'react-icons/io';
import { FaFileDownload } from 'react-icons/fa';
import { FaComments } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
export default function Page() {
	const [data, setData] = useState<any>([]);
	const [OneData, setOneData] = useState<any>([]);
	const { id } = useParams();
	const router = useRouter();
	// Modals state
	const [EditModal, setEditModal] = useState<any>(false);
	const [DeleteModal, setDeleteModal] = useState<any>(false);
	const [isLoading, setIsLoading] = useState<any>(false);
	// media state
	const [ImageUrl, setImageUrl] = useState<any>('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	// Refs

	const editnameRef = useRef<any>();
	const editbirthdayRef = useRef<any>();
	const editstateRef = useRef<any>();
	const editpasRef =useRef<any>();
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	const editImg = async (file: any) => {
		const url = await uploadImage(file);
		setImageUrl(url);
	};
	const getFunc = async () => {
		const resp = await apiRoot.get(`users/${id}` ,{
			headers: {
				Authorization: token,
			},
		});
		console.log(resp?.data, 'get func');

		if (resp?.status === 200) {
			setData(resp?.data);
			setIsLoading(true)
			console.log(resp?.data, 'data');
		}
	};

	// edit
	const editFunc = async (evt: any) => {
		evt.preventDefault();

		const req = {
			full_name: editnameRef?.current?.value || data?.full_name,
			password: editpasRef?.current?.value || data?.password,
			email: editstateRef?.current?.value || data?.email,
			user_image: ImageUrl || data?.user_image,
		};
		
	
		const resp = await apiRoot
			.patch(`users/${id}`, req, {
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
			getFunc();
		}
	};
	// Delete
	async function deleteFunc(evt: any) {
		evt.preventDefault();
		const res = await apiRoot.delete(`/users/${id}`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(res, 'resp');

		if (res?.status === 200) {
			toast.success('Successfully deleted ');
			setDeleteModal(false);
router.push("/users")
			// await getFunc();
		} else {
			toast.error('Something went wrong, please try again');
		}
	}

	useEffect(() => {
		getFunc();
	}, []);

	return (
		<>
			<div className='flex  max-[550px]:flex-col  justify-center items-center   gap-[30px] mb-[15px] '>
				<button
					className='bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => router.push('/users')}
				>
					<FaArrowLeftLong size={15} className=' my_animate  ' />
					Back
				</button>
				<h3 className=' text-[22px]  dark:text-white text-black text-center '>
					More about the users{' '}
				</h3>
			</div>

{
	isLoading  ? (
<div
				key={data?.id}
				className='flex  max-sm:flex-wrap gap-3 relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4  w-[100%] max-lg:m-auto'
			>
				<Image
					className='h-[400px] max-sm:h-[280px]  max-sm:w-[100%]  w-[50%] object-cover rounded-lg transition ease-in-out hover:opacity-75'
					src={`${baseMediaUrl}/images/${data?.user_image}`}
					alt='Picture of the author'
					width={1000}
					height={1000}
				/>
				<div className='max-sm:w-[100%] w-[50%] '>
					<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
						{data?.full_name}
					</h6>
					<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
						{data?.email}
					</h6>
					<div className='flex gap-[6px] py-[15px]'>
						<span className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
							<SlBasket size={20} />
							{data?.basket?.length }
						</span>
					</div>
					
					<div className='flex justify-between items-center'>
						<span className='flex gap-[5px] mb-3 items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
							<FaComments size={20} />
							{data?.comments?.length}
						</span>
					</div>
					<div className='flex gap-[10px] items-center text-black dark:text-white'>
						<p>Created:</p>
						{data?.createdAt?.slice(0, 10)}
					</div>
					<div className=' flex items-center gap-2  mt-3 '>
						<RiDeleteBin5Fill
							size={25}
							onClick={() => {
								setDeleteModal(true);
							}}
							className=' text-red-600 hover:text-red-700  cursor-pointer h-[30px] '
						/>
						<FaEdit
							size={25}
							onClick={() => {
								setEditModal(true);
							}}
							className=' text-yellow-400 hover:text-yellow-500 cursor-pointer h-[30px] '
						/>
					</div>
				</div>
			</div>

	) :<SingleSkeleton/>
}
			

			<h3 className=' text-[22px] my-3 dark:text-white text-black text-center '>
				Uset comments{' '}
			</h3>
			<div className='grid lg:grid-cols-3   max-lg:grid-cols-2  mb-3 max-sm:grid-cols-1  gap-3'>
				{data?.comments?.length
					? data?.comments.map((item: any) => (
							<div
								key={item?.id}
								className='flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-lg:w-[90%] max-sm:w-[100%] w-[100%] max-lg:m-auto'
							>
								<Image
									className='h-[280px]  w-full object-cover rounded-lg transition ease-in-out hover:opacity-75'
									src={`${baseMediaUrl}/images/${item?.book_image}`}
									alt='Picture of the author'
									width={1000}
									height={1000}
								/>
								<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
									{item?.book_title}
								</h6>
								<h6 className='pt-[10px] text-[16px] font-bold text-black dark:text-white'>
									{item?.book_description}
								</h6>
								<div className='flex justify-between items-center  py-[15px]'>
									<span className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
										<IoMdEye size={20} />
										{item?.number_view}
									</span>
									<div className=' flex items-center gap-2 right-[10px] '>
										<RiDeleteBin5Fill
											size={25}
											onClick={() => {}}
											className=' text-red-600 hover:text-red-700  cursor-pointer h-[30px] '
										/>
										<FaEdit
											size={25}
											className=' text-yellow-400 hover:text-yellow-500 cursor-pointer h-[30px] '
										/>
									</div>
								</div>
								<div className='flex justify-between items-center'>
							
									<audio
										controls
										src={`${baseMediaUrl}audios/${item?.book_audio}`}
										className=" mb-3 "
									>
										Your browser does not support the
										<code>audio</code> element.
									</audio>
									
								</div>
								<div className='flex '>
									<FaFileDownload size={20} />
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
					: 'comment hali qoshilmagan☹'}
			</div>

			{/* edit modal  */}

			<Modal
				width={'900px'}
				title={'Edit User'}
				modal={EditModal}
				setModal={setEditModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={editFunc}
					>
						<label
							htmlFor='dropzone-file-edit'
							className=' relative flex flex-col items-center justify-center w-full h-[95px] md:h-[165px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
						>
							<div className='flex flex-col items-center justify-center pt-3 pb-4'>
								{data?.user_image ? (
									<Image
										width={10000}
										height={10000}
										className='w-[100%] object-cover h-[90px] md:h-[160px] rounded-lg absolute left-0 top-0 mb-4 text-gray-500 dark:text-gray-400'
										src={`${baseMediaUrl}/images/${data?.user_image}`}
										alt='img'
									/>
								) : (
									<svg
										className='w-8 h-6 mb-4 text-gray-500 dark:text-gray-400'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 20 16'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
										/>
									</svg>
								)}
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Click to upload</span> and
									edit img
								</p>
							</div>
							<input
								id='dropzone-file-edit'
								type='file'
								className='hidden'
								onChange={(evt: any) => editImg(evt?.target?.files?.[0])}
							/>
						</label>
						<div className=' w-full'>
							<div className='relative w-[100%] '>
								<input
									type={isPasswordVisible ? 'text' : 'password'}
									placeholder='Password..'
									className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
									ref={editpasRef}
									// defaultValue={"adminni userni passwordini ozgartirolmaydi"}
									
								/>
								<button
									type='button'
									className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
									onClick={togglePasswordVisibility}
								>
									{isPasswordVisible ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
											/>
										</svg>
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									)}
								</button>
							</div>
						</div>

					
						<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
							placeholder='User fullName'
							type='text'
							ref={editnameRef}
							defaultValue={data?.full_name}
						/>

						<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
							placeholder='User email '
							type='email'
							ref={editstateRef}
							defaultValue={data?.email}
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
				title={'Delete Author'}
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
							Do you want to delete this Author?{' '}
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
