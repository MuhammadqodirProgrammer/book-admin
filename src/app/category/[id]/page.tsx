'use client';
import Image from 'next/image';
import { FaBirthdayCake } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { SkeletonDemo, SingleSkeleton } from '@/components/Skeleton/Skeleton';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Modal } from '@/components/Modal/Modal';
import { uploadImage } from '@/components/Upload/Upload';
import { ToastContainer, toast } from 'react-toastify';
import { apiRoot, baseMediaUrl } from '@/app/api/api';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { TbCategoryFilled } from "react-icons/tb";

import { IoMdEye } from 'react-icons/io';
import { FaFileDownload } from 'react-icons/fa';
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

	// Refs

	const editnameRef = useRef<any>();
	const editbirthdayRef = useRef<any>();
	const editstateRef = useRef<any>();
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	const editImg = async (file: any) => {
		const url = await uploadImage(file);
		setImageUrl(url);
	};
	const getFunc = async () => {
		const resp = await apiRoot.get(`category/${id}`);
		console.log(resp?.data, 'get func');

		if (resp?.status === 200) {
			setData(resp?.data);
			setIsLoading(true);
			console.log(resp?.data, 'data');
		}
	};

	// edit
	const editFunc = async (evt: any) => {
		evt.preventDefault();

		const req = {
			category_name: editnameRef?.current?.value || data?.data?.category_name,
	
		};
console.log(req , "edit req");

		const resp = await apiRoot
			.patch(`category/${id}`, req, {
				headers: {
					Authorization: token,
				},
			})
			.catch((err: any) => {
			
				if((typeof err?.response?.data?.message)=="object"){
					toast.error(err?.response?.data?.message?.[0]);
				}else{
					toast.error(err?.response?.data?.message);

				}
			});

		if (resp?.status === 200) {
			setEditModal(false);
			toast.success('Succesfully edited');
		await getFunc();
		}
	};
	// Delete
	async function deleteFunc(evt: any) {
		evt.preventDefault();
		const res = await apiRoot.delete(`/author/${id}`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(res, 'resp');

		if (res?.status === 200) {
			toast.success('Successfully deleted ');
			setDeleteModal(false);
			await getFunc();
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
					onClick={() => router.push('/category')}
				>
					<FaArrowLeftLong size={15} className=' my_animate  ' />
					Back
				</button>
				<h3 className=' text-[22px]  dark:text-white text-black text-center '>
					Single category
				</h3>
			</div>

			{isLoading ? (
				<div
					key={data?.id}
					className='flex  flex-col  gap-3 relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4  w-[100%] max-lg:m-auto'
				>
					<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
					Category Name:	{data?.data?.category_name}
					</h6>
					<div className='flex gap-[6px] py-[15px]'>
						<span className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
							<TbCategoryFilled size={20} />
							Subcategory count:
							{data?.subcategory_count}
						</span>
					</div>
					<div className='flex justify-between items-center'>
						<span className='flex gap-[5px] mb-3 items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
							<FaBook size={20} />
							Books count:
							{data?.books_count}
						</span>
						
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
					<hr className='h-1 w-full bg-CoursesHr' />
				</div>
			) : (
				<SingleSkeleton />
			)}

			<h3 className=' text-[22px] my-3 dark:text-white text-black text-center '>
			Subcategory
			</h3>
			<div className='grid lg:grid-cols-3   max-lg:grid-cols-2  mb-3 max-sm:grid-cols-1  gap-3'>
				{data?.data?.subcategory?.length
					? data?.data?.subcategory.map((item: any) => (
							<div
								key={item?.id}
								className='flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-lg:w-[90%] max-sm:w-[100%] w-[100%] max-lg:m-auto'
							>
							
								<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
									{item?.subcategory_name}
								</h6>
								
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
							
							
								<hr className='h-1 w-full bg-CoursesHr' />
								<div className='flex justify-between items-center pt-5'>
									<div className='flex gap-[10px] items-center text-black dark:text-white'>
										<p>Created:</p>
										{item?.createdAt?.slice(0, 10)}
									</div>
								</div>
							</div>
					  ))
					: 'kitoblar hali qoshilmagan☹'}
			</div>

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
							placeholder='Author fullName'
							type='text'
							ref={editnameRef}
							defaultValue={data?.data?.category_name}
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
