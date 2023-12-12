'use client';
import Link from 'next/link';
import Image from 'next/image';
import BgImage from 'public/images/js.webp';
import profileImg from 'public/images/profile.jpg';
import { FaBirthdayCake } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { apiRoot, baseMediaUrl, baseUrlImg } from '../api/api';
import { SkeletonDemo } from '@/components/Skeleton/Skeleton';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Modal } from '@/components/Modal/Modal';
import {uploadFile, uploadImage} from '@/components/Upload/Upload';
import { ToastContainer, toast } from 'react-toastify';

export default function Page() {
	const [data, setData] = useState<any>([]);
	const [OneData, setOneData] = useState<any>([]);

	// Modals state
	const [Create, setCreate] = useState<any>(false);
	const [EditModal, setEditModal] = useState<any>(false);
  const [deleteModal, setdeleteModal] = useState<any>(false);
  // media state 
  const [Upload, setUpload] = useState<any>("");



	// Refs
	const nameRef = useRef<any>();
	const birthdayRef = useRef<any>();
	const stateRef = useRef<any>();

  const editnameRef = useRef<any>();
	const editbirthdayRef = useRef<any>();
	const editstateRef = useRef<any>();
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const createImg = async (file:any)=>{
      console.log(Upload ,"file");
      
      const imgUrl =uploadFile(file)
      console.log(imgUrl ,"url");

    }

	const getFunc = async () => {
		const resp = await apiRoot.get('author');

		if (resp?.status === 200) {
			setData(resp?.data);
			console.log(resp?.data, 'data');
		}
	};
	const createFunc = async (evt:any) => {
       evt.preventDefault()
    const imgUrl =await uploadImage(Upload)
    console.log(imgUrl, 'imgUrl');
    
		const req = {
			full_name: nameRef?.current?.value,
			birthday: birthdayRef?.current?.value,
			state_birth: stateRef?.current?.value,
			author_image: imgUrl,
		};
		const resp = await apiRoot.post('author', req, {
			headers: {
				Authorization: token,
			},
    
		}).catch((err:any)=>{
      console.log(err ,"errrrrrrrrrrrrr");
      toast.error(err?.response?.data?.message?.[0])
      
    })
console.log(resp , "resp");

		if (resp?.status === 201) {
			toast.success("Succesfully created")
      getFunc()

		}
	};
	useEffect(() => {
		getFunc();
		console.log(data);
	}, []);

	return (
		<>
			<div className='flex items-center  justify-center  gap-[30px] mb-[15px] '>
				<h3 className=' text-[22px] dark:text-white text-black  '>Authors </h3>

				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => setCreate(true)}
				>
					Add Author
				</button>
			</div>

			<div className='grid lg:grid-cols-3  md:grid-cols-1 grid-cols-1 gap-3'>
				{data?.length ? (
					data.map((item: any) => (
						<div
							key={item?.id}
							className='flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-w-md  max-lg:max-w-full max-lg:m-auto'
						>
							<div className='absolute top-[10px] flex items-center gap-2 right-[10px] '>
								<RiDeleteBin5Fill
									size={25}
									className=' text-red-700 hover:text-red-900  cursor-pointer h-[30px] '
								/>
								<FaEdit
									size={25}
									className=' text-yellow-400 hover:text-yellow-600 cursor-pointer h-[30px] '
								/>
							</div>
							<Image
								className='h-[280px]  w-full object-cover rounded-lg transition ease-in-out hover:opacity-75'
								src={`${baseMediaUrl}/images/${item?.author_image}`}
								alt='Picture of the author'
								width={1000}
								height={1000}
							/>
							<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
								{item?.full_name}
							</h6>
							<div className='flex gap-[6px] py-[15px]'>
								<span className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
									<FaBirthdayCake size={20} />
									{item?.birthday?.slice(0, 10)} {item?.state_birth}
								</span>
							</div>
							<span className='flex gap-[5px] mb-3 items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
								<FaBook size={20} />
								{item?.books_count}
							</span>
							<hr className='h-1 w-full bg-CoursesHr' />
							<div className='flex justify-between items-center pt-5'>
								<div className='flex gap-[10px] items-center text-black dark:text-white'>
									<p>Created:</p>
									{item?.createdAt?.slice(0, 10)}
								</div>
								<Link
									href={`/author/${item?.id}`}
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

			{/* create modal  */}

			<Modal
				width={'900px'}
				title={'Create Author'}
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
								placeholder='Author fullName'
								type='text'
								ref={nameRef}
							/>
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Author birthday state'
								type='text'
								ref={stateRef}
							/>

							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Author birthday '
								type='date'
								ref={birthdayRef}
							/>

						<div className='flex items-center justify-center w-full'>
							<label
								htmlFor='dropzone-file'
								className=' relative flex flex-col items-center justify-center w-full h-[95px] md:h-[165px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
							>
								<div className='flex flex-col items-center justify-center pt-3 pb-4'>
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

									<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
										<span className='font-semibold'>Click to upload</span> and
										img
									</p>
								</div>
								<input id='dropzone-file' type='file' className='hidden'  onChange={(evnt:any)=>setUpload(evnt?.target?.files?.[0])} />
							</label>
						</div>

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

			{/* edi modal  */}

			<Modal
				width={'900px'}
				title={'Edit Author'}
				modal={EditModal}
				setModal={setEditModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={createFunc}
					>
						
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
								placeholder='Author fullName'
								type='text'
								ref={editnameRef}
							/>
						
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Author birthday state '
								type='text'
								ref={editstateRef}
							/>

						
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Author email'
								type='date'
								ref={editbirthdayRef}
							/>

						<div className='flex items-center justify-center w-full'>
							<label
								htmlFor='dropzone-file-edit'
								className=' relative flex flex-col items-center justify-center w-full h-[95px] md:h-[165px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
							>
								<div className='flex flex-col items-center justify-center pt-3 pb-4'>
									{OneData?.imagePath ? (
										<Image
											width={10000}
											height={10000}
											className='w-[100%] object-cover h-[90px] md:h-[160px] rounded-lg absolute left-0 top-0 mb-4 text-gray-500 dark:text-gray-400'
											src={`${baseUrlImg}/${OneData?.imagePath}`}
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
								<input id='dropzone-file-edit' type='file' className='hidden' />
							</label>
						</div>

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

      <ToastContainer/>
		</>
	);
}
