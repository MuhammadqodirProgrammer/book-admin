'use client';
import Link from 'next/link';
import { FaBook } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { apiRoot} from '../api/api';
import { SkeletonDemo } from '@/components/Skeleton/Skeleton';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { TbCategoryFilled } from "react-icons/tb";
import { Modal } from '@/components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { Pagination } from '@/components/Pagination/Pagination';

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

	// Refs
	const nameRef = useRef<any>();
	const editnameRef = useRef<any>();
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	const getFunc = async () => {
		const resp = await apiRoot.get(`category?page=${activePage}&pageSize=9`);

		if (resp?.status === 200) {
			setData(resp?.data);
		
		}
	};

	const getOneFunc = async (id: any) => {
		const resp = await apiRoot.get(`category/${id}`);
		setEditModal(true);
		setDeleteId(id);
		console.log(resp?.data, 'data');
		if (resp?.status === 200) {
			// setData(resp?.data);
			setOneData(resp?.data?.data);
		}
	};
	// Create
	const createFunc = async (evt: any) => {
		evt.preventDefault();

		const req = {
			category_name: nameRef?.current?.value,
	
		};
		const resp = await apiRoot
			.post('category', req, {
				headers: {
					Authorization: token,
				},
			})
			.catch((err: any) => {
				console.log(err , "errrr");
				
				if((typeof err?.response?.data?.message)=="object"){
					toast.error(err?.response?.data?.message?.[0]);
				}else{
					toast.error(err?.response?.data?.message);

				}
			});

		if (resp?.status === 201) {
			toast.success('Succesfully created');
			setCreate(false)
			getFunc();
			nameRef.current.value=""

		}
	};

	// edit
	const editFunc = async (evt: any) => {
		evt.preventDefault();

		const req = {
			category_name: editnameRef?.current?.value || OneData?.category_name,
		};
console.log(req ,"res edit ");

		const resp = await apiRoot
			.patch(`category/${DeleteId}`, req, {
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
		const res = await apiRoot.delete(`/category/${DeleteId}`, {
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
	}, [activePage]);

	return (
		<>
			<div className='flex items-center  justify-center  gap-[30px] mb-[15px] '>
				<h3 className=' text-[22px] dark:text-white text-black  '>categorys </h3>

				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => setCreate(true)}
				>
					Add category
				</button>
			</div>

			<div className='grid lg:grid-cols-3 max-lg:grid-cols-2  max-sm:grid-cols-1  gap-3 py-3'>
				{data?.data?.length ? (
					data?.data?.map((item: any) => (
						<div
							key={item?.id}
							className='flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-lg:w-[90%] max-sm:w-[100%] w-[100%] max-lg:m-auto'
						>
						
							<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
						{item?.category_name}
							</h6>
							<div className='flex gap-[6px] py-[15px]'>
								<span className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
									<TbCategoryFilled size={20} />
									Subcategory count:	{item?.subcategory_count}
								</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='flex gap-[5px] mb-3 items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
									<FaBook size={20} />
									Books count:
									{item?.books_count}
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
								<Link
									href={`/category/${item?.id}`}
									className='flex gap-[10px] items-center text-black dark:text-white'
								>
									<FaArrowRight size={20} className=' my_animate  ' />
								</Link>
							</div>
						</div>
					))
				) : (
					<SkeletonDemo />
				)}
			</div>

			{
				data?.data?.length && <Pagination
				activePage={activePage}
				setActivePage={setActivePage}
				totalPage={data?.pageCount}
			
			/>
			}

			{/* create modal  */}

			<Modal
				width={'900px'}
				title={'Create category'}
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
							placeholder='category name'
							type='text'
							ref={nameRef}
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
				title={'Edit category'}
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
							placeholder='category fullName'
							type='text'
							ref={editnameRef}
							defaultValue={OneData?.category_name}
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
				title={'Delete category'}
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
							Do you want to delete this category?{' '}
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
