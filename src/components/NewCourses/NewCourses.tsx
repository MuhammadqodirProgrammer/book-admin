'use client';
import Link from 'next/link';
import Image from 'next/image';
import BgImage from 'public/images/react-native.webp';

import React, { useEffect, useRef, useState } from 'react';
import instance, { baseUrlImg } from '@/app/api/api';
import { Pagination } from '../Pagination/Pagination';
import { Modal } from '../Modal/Modal';
import { SkeletonDemo } from '../Skeleton/Skeleton';

const NewCourses = ({ myHref, data, totalPage }: any) => {
	const [activePage, setActivePage] = useState<any>(1);
	const [deleteId, setDeleteId] = useState<any>(1);
	const [editCourse, setEditCourse] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	const [course, setCourse] = useState<any>([]);
	const [oneId, setOneId] = useState<number>();
	const [oneData, setOneData] = useState<any>([]);

	const editName: any = useRef<HTMLInputElement>();
	const editDescription: any = useRef<HTMLInputElement>();
	const editInformation: any = useRef<HTMLInputElement>();
	const editLessons: any = useRef<HTMLInputElement>();
	const editLevel: any = useRef<HTMLInputElement>();
	const editLanguages: any = useRef<HTMLInputElement>();
	const editHours: any = useRef<HTMLInputElement>();
	const editPrice: any = useRef<HTMLInputElement>();
	const editDiscountPrice: any = useRef<HTMLInputElement>();
	const editMentorId: any = useRef<HTMLInputElement>();
	const editCategoryId: any = useRef<HTMLInputElement>();
	const editImage: any = useRef<HTMLInputElement>();

	const getCourse = async () => {
		let res = await instance.get(`/api/courses?page=${activePage}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		setCourse(res?.data);
	};

	const handleCreate = async (evt: any) => {
		evt.preventDefault();
		const formData = new FormData();
		formData.append('Name', editName?.current?.value || oneData?.name);
		formData.append(
			'Description',
			editDescription?.current?.value || oneData?.description
		);
		formData.append(
			'Information',
			editInformation?.current?.value || oneData?.information
		);
		formData.append('Lessons', editLessons?.current?.value || oneData?.lessons);
		formData.append('Level', editLevel?.current?.value || oneData?.level);
		formData.append(
			'Languages',
			editLanguages?.current?.value || oneData?.languages
		);
		formData.append('Hourse', editHours?.current?.value || oneData?.hourse);
		formData.append('Price', editPrice?.current?.value || oneData?.price);
		formData.append(
			'DiscountPrice',
			editDiscountPrice?.current?.value || oneData?.discountPrice
		);
		formData.append(
			'MentorId',
			editMentorId?.current?.value || oneData?.mentorId
		);
		formData.append(
			'CategoryId',
			editCategoryId?.current?.value || oneData?.categoryId
		);
		formData.append(
			'Image',
			editImage?.current?.files[0] || oneData?.imagePath
		);

		const res = await instance.put(`/api/courses/${oneId}`, formData);
		if (res.status === 200) {
			getCourse();
			alert('Success!');
			setEditCourse(false);
		}
	};
	const GetOne = async (id: any) => {
		const findOne = await course.find((el: any) => el?.id == id);
		setOneId(id);
		setOneData(findOne);
	};

	async function deleteFunc(evt: any) {
		evt.preventDefault();

		const res = await instance.delete(`api/courses/${deleteId}`);

		if (res.status == 200) {
			getCourse();
			setDeleteModal(false);
		}
	}

	useEffect(() => {
		getCourse();
	}, [data]);

	return (
		<>
			<div>
				<div className='flex flex-wrap gap-5'>
					{course.length ? (
						course.map((el: any) => {
							return (
								<div className='w-full lg:w-[31%] bg-[#eee] dark:bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5 max-lg:m-auto border border-[#ddd] dark:border-none'
                key={el?.id}
                >
									<Link
										href={myHref}
										className='flex flex-col relative  rounded-md max-lg:m-auto '
                   

									>
										<Image
											className='h-[250px]  w-full object-cover rounded-md transition ease-in-out hover:opacity-75'
											src={`${baseUrlImg}/${el.imagePath}`}
											alt='Picture of the course'
											width={'10000'}
											height={'10000'}
										/>
										<h5 className='pt-2 text-sm text-newCourcesPreTitleColor text-center uppercase'>
											mobil dastur
										</h5>
										<h6 className='pt-3 pb-3 font-medium text-[black] dark:text-white text-center'>
											{el.name}
										</h6>
										<hr className='h-1 w-full bg-[#000] dark:bg-CoursesHr' />
										<div className='flex justify-between pt-5 items-center'>
											<div className='flex gap-3 text-white items-center'>
												<button className='text-slate-700 dark:text-newCourcesBtn font-medium border border-solid border-[purple] dark:border-newCourcesBtn px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover'>
													batafsil
												</button>
											</div>
											<div className='flex gap-3 text-[black] dark:text-white items-center'>
												<p className='text-sm line-through'>{el.price}</p>
												<p className='font-bold'>Bepul</p>
											</div>
										</div>
									</Link>
									<div className='flex flex-col gap-2 mt-2'>
										<button
											className='p-2 rounded-md bg-[blue] text-white'
											onClick={() => {
												GetOne(el?.id);
												setEditCourse(true);
											}}
										>
											Edit
										</button>
										<button
											className='p-2 rounded-md bg-[red] text-white'
											onClick={() => {
												setDeleteModal(true);
												setDeleteId(el?.id);
											}}
										>
											Delete
										</button>
									</div>
								</div>
							);
						})
					) : (
						<div className='flex flex-wrap gap-5 mb-[150px]'>
							<SkeletonDemo />
							<SkeletonDemo />
							<SkeletonDemo />
						</div>
					)}
				</div>

				<Pagination
					totalPage={totalPage}
					setActivePage={setActivePage}
					activePage={activePage}
				/>
			</div>
			{/* delete */}
			<Modal
				width={'480px'}
				title={'Course'}
				modal={deleteModal}
				setModal={setDeleteModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={deleteFunc}
					>
						<h2 className='mb-2 text-[22px] text-gray-500 dark:text-gray-400'>
							Do you want to delete this Course?
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
			{/* edit  */}
			<Modal
				width={'50%'}
				title={'Edit Course'}
				modal={editCourse}
				setModal={setEditCourse}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={handleCreate}
					>
						<div className='flex flex-wrap gap-3'>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
								placeholder='Name'
								type='text'
								defaultValue={oneData?.name}
								ref={editName}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Description'
								type='text'
								defaultValue={oneData?.description}
								ref={editDescription}
							/>

							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Information'
								type='text'
								defaultValue={oneData?.information}
								ref={editInformation}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='Lessons'
								type='number'
								defaultValue={oneData?.lessons}
								ref={editLessons}
							/>

							<select
								ref={editLevel}
								defaultValue={oneData?.level}
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
							>
								<option selected disabled value='Select'>
									Level
								</option>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
							</select>
							<select
								ref={editLanguages}
								defaultValue={oneData?.languages}
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
							>
								<option selected disabled value='Select'>
									Languages
								</option>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
							</select>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='Hours'
								type='number'
								defaultValue={oneData?.hours}
								ref={editHours}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='Price'
								type='number'
								defaultValue={oneData?.price}
								ref={editPrice}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='DiscountPrice'
								type='number'
								defaultValue={oneData?.discountPrice}
								ref={editDiscountPrice}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='MentorId'
								type='number'
								defaultValue={oneData?.mentorId}
								ref={editMentorId}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='CategoryId'
								type='number'
								defaultValue={oneData?.categoryId}
								ref={editCategoryId}
							/>
						</div>
						<div className='flex flex-col gap-2 w-[100%]'>
							<div className='flex items-center justify-center w-full'>
								<label
									htmlFor='dropzone-file-edit'
									className=' relative flex flex-col items-center justify-center w-full h-[95px] md:h-[165px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
								>
									<div className='flex flex-col items-center justify-center pt-3 pb-4'>
										{oneData?.imagePath ? (
											<Image
												width={10000}
												height={10000}
												className='w-[100%] object-cover h-[90px] md:h-[160px] rounded-lg absolute left-0 top-0 mb-4 text-gray-500 dark:text-gray-400'
												src={`${baseUrlImg}/${oneData?.imagePath}`}
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
										ref={editImage}
										id='dropzone-file-edit'
										type='file'
										className='hidden'
									/>
								</label>
							</div>
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
								// onClick={() => setEditMentor(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default NewCourses;
