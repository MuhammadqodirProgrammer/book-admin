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
import { IoMdEye } from 'react-icons/io';
import { FaFileDownload } from 'react-icons/fa';
import { IoMdCloudUpload } from 'react-icons/io';
import { FileModal, Modal } from '@/components/Modal/Modal';
import {
	uploadAudio,
	uploadFile,
	uploadImage,
} from '@/components/Upload/Upload';
import { ToastContainer, toast } from 'react-toastify';
import { Pagination } from '@/components/Pagination/Pagination';

export default function Page() {
	const [data, setData] = useState<any>([]);
	const [OneData, setOneData] = useState<any>([]);
	const [AuthorData, setAuthorData] = useState<any>([]);
	const [CategoryData, setCategoryData] = useState<any>([]);
	const [SubCategoryData, setSubCategoryData] = useState<any>([]);
	const [activePage, setActivePage] = useState(1);

	// Modals state
	const [Create, setCreate] = useState<any>(false);
	const [EditModal, setEditModal] = useState<any>(false);
	const [DeleteModal, setDeleteModal] = useState<any>(false);
	const [DeleteId, setDeleteId] = useState<any>(false);
	const [ViewModal, setViewModal] = useState<any>(false);
	// media state
	const [ImageUrl, setImageUrl] = useState<any>('');
	const [AudioUrl, setAudioUrl] = useState<any>('');
	const [FileUrl, setFileUrl] = useState<any>('');
	const [editImageUrl, setEditImageUrl] = useState<any>('');
	const [editAudioUrl, setEditAudioUrl] = useState<any>('');
	const [editFileUrl, setEditFileUrl] = useState<any>('');
	const [OneId, setOneId] = useState<any>('');
	const [embedUrl, setEmbedUrl] = useState<any>('');

	// Refs

	// create
	const stateRef = useRef<any>();
	const book_titleRef = useRef<any>();
	const book_descriptionRef = useRef<any>();
	
	const date_writtenRef = useRef<any>();
	const category_idRef = useRef<any>();
	const author_idRef = useRef<any>();
	const subcategory_idRef = useRef<any>();

	// edit
	const editstateRef = useRef<any>();
	const editbook_titleRef = useRef<any>();
	const editbook_descriptionRef = useRef<any>();
	const editdate_writtenRef = useRef<any>();
	const editcategory_idRef = useRef<any>();
	const editauthor_idRef = useRef<any>();
	const editsubcategory_idRef = useRef<any>();

	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const getSelectData = async () => {
		const author = await apiRoot.get(`author?page=${1}&pageSize=50`);
		const category = await apiRoot.get(`category?page=${1}&pageSize=90`);
		const subcategory = await apiRoot.get(`subcategory`);
		console.log(author?.data?.data, 'author');

		if (author?.status === 200) {
			setAuthorData(author?.data?.data);
			setCategoryData(category?.data?.data);
			setSubCategoryData(subcategory?.data);
		}
	};

	//upload funcs for  create
	const createImg = async (file: any) => {
		const url = await uploadImage(file);
		console.log(url, 'urlllllllllllllllllllllllllllllll');
		setImageUrl(url);
	};
	const createAudio = async (file: any) => {
		const url = await uploadAudio(file);
		console.log(url, 'urlllllllllllllllllllllllllllllll');
		setAudioUrl(url);
	};
	const createFile = async (file: any) => {
		const url = await uploadFile(file);
		console.log(url, 'createFile url');
		setFileUrl(url);
	};
	//upload funcs for  edit
	const editcreateImg = async (file: any) => {
		const url = await uploadImage(file);
		setEditImageUrl(url);
	};
	const editcreateAudio = async (file: any) => {
		const url = await uploadAudio(file);
		console.log(url, 'urlllllllllllllllllllllllllllllll');
		setEditAudioUrl(url);
	};
	const editcreateFile = async (file: any) => {
		const url = await uploadFile(file);
		setEditFileUrl(url);
	};

	const editImg = async (file: any) => {
		const url = await uploadImage(file);
		setImageUrl(url);
	};
	const getFunc = async () => {
		const resp = await apiRoot.get(`books?page=${activePage}&pageSize=6`);
		console.log(resp, 'response');

		if (resp?.status === 200) {
			setData(resp?.data);
		}
	};

	const getOneFunc = async (id: any) => {
		setEditModal(true);
		const resp = await apiRoot.get(`books/${id}`);
		setOneId(id);
		console.log(resp?.data, 'data oneeeeeeeeeeeeeeeeeeeeeeee');
		if (resp?.status === 200) {
			// setData(resp?.data);
			setOneData(resp?.data);
		}
	};
	type createType = {
		book_title: any;
		book_description: any;
		date_written: any;
		category_id: any;
		author_id: any;
		subcategory_id: any;
		book_file: any;
		book_image: any;
		book_audio?: any;
	};
	// Create
	const createFunc = async (evt: any) => {
		evt.preventDefault();

		const req: createType = {
			book_title: book_titleRef?.current?.value,
			book_description: book_descriptionRef?.current?.value,
			date_written: date_writtenRef?.current?.value,
			category_id: category_idRef?.current?.value,
			author_id: author_idRef?.current?.value,
			subcategory_id: subcategory_idRef?.current?.value,
			book_file: FileUrl,
			book_image: ImageUrl,
		};

		if (AudioUrl) {
			req.book_audio = AudioUrl;
		}

		const resp = await apiRoot
			.post('books', req, {
				headers: {
					Authorization: token,
				},
			})
			.catch((err: any) => {
				if (typeof err?.response?.data?.message == 'object') {
					toast.error(err?.response?.data?.message?.[0]);
				} else {
					toast.error(err?.response?.data?.message);
				}
			});

		if (resp?.status === 201) {
			toast.success('Succesfully created');
			setCreate(false);
			await getFunc();
			book_titleRef.current.value = '';
			book_descriptionRef.current.value = '';
			stateRef.current.value = '';
			date_writtenRef.current.value = '';
			category_idRef.current.value = '';
			author_idRef.current.value = '';
			subcategory_idRef.current.value = '';
		}
	};

	// edit
	const editFunc = async (evt: any) => {
		evt.preventDefault();

		const req = {
			book_title: editbook_titleRef?.current?.value || OneData?.book_title,
			book_description:
				editbook_descriptionRef?.current?.value || OneData?.book_description,
			date_written:
				editdate_writtenRef?.current?.value || OneData?.date_written,
			category_id: editcategory_idRef?.current?.value || OneData?.category_id,
			author_id: editauthor_idRef?.current?.value || OneData?.author_id,
			subcategory_id:
				editsubcategory_idRef?.current?.value || OneData?.subcategory_id,
			book_file: editFileUrl || OneData?.book_file,
			book_image: editImageUrl || OneData?.book_image,
			book_audio: editAudioUrl || OneData?.book_audio,
		};
console.log(req ,"edit req ");
console.log(editAudioUrl ,"editAudioUrl req ");

		const resp = await apiRoot
			.patch(`books/${OneId}`, req, {
				headers: {
					Authorization: token,
				},
			})
			.catch((err: any) => {
				if (typeof err?.response?.data?.message == 'object') {
					toast.error(err?.response?.data?.message?.[0]);
				} else {
					toast.error(err?.response?.data?.message);
				}
			});

		if (resp?.status === 200) {
			toast.success('Succesfully edited');
			setEditModal(false);
			await getFunc();
		}
	};
	// Delete
	async function deleteFunc(evt: any) {
		evt.preventDefault();
		const res = await apiRoot.delete(`/books/${OneId}`, {
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

	const checkView = async (book_id: any) => {
		const resp:any = await apiRoot.get(`check/view/${book_id}`);
		if (
			resp?.message == 'Increase the number of views of the book by 1' &&
			resp?.status == 200
		) {
			getFunc();
		}
	};

	useEffect(() => {
		getFunc();
	}, [activePage]);
	useEffect(() => {
		getSelectData();
	}, []);

	return (
		<>
			<div className='flex items-center  justify-center  gap-[30px] mb-[15px] '>
				<h3 className=' text-[22px] dark:text-white text-black  '>Books </h3>

				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => setCreate(true)}
				>
					Add Books
				</button>
			</div>

			<div className='grid lg:grid-cols-3 max-lg:grid-cols-2  max-sm:grid-cols-1  gap-3 py-3'>
				{data?.data?.length ? (
					data?.data?.map((item: any) => (
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
								{item?.book_description?.length > 85
									? item?.book_description?.slice(0, 82) + '..'
									: item?.book_description}
							</h6>

							<div className='flex justify-between items-center my-2'>
								{item?.book_audio && (
									<audio
										controls
										onPlay={() => checkView(item?.id)}
										src={`${baseMediaUrl}audios/${item?.book_audio}`}
										className=' mb-3 border-[2px]  h-[34px] border-dotted rounded-full border-mainColor '
									>
										Your browser does not support the
										<code>audio</code> element.
									</audio>
								)}
							</div>

							<h3>
								<a
									onClick={() => checkView(item?.id)}
									target='_blank'
									className=' text-[18px] text-mainColor  font-bold  cursor-pointer  '
									href={`${baseMediaUrl}/files/${item?.book_file}`}
								>
									Download
								</a>{' '}
								the file or{' '}
								<span
									className='text-[18px] text-mainColor  font-bold  cursor-pointer '
									onClick={() => {
										setEmbedUrl(item?.book_file);
										checkView(item?.id);
										setViewModal(true);
									}}
								>
									View
								</span>{' '}
								here
							</h3>

							<div className='flex justify-between items-center  py-[15px]'>
								<span className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
									<IoMdEye size={20} />
									{item?.number_view}
								</span>
								<div className=' flex items-center gap-2 right-[10px] '>
									<RiDeleteBin5Fill
										size={25}
										onClick={() => {
											setDeleteModal(true);
											setOneId(item?.id);
										}}
										className=' text-red-600 hover:text-red-700  cursor-pointer h-[30px] '
									/>
									<FaEdit
										size={25}
										className=' text-yellow-400 hover:text-yellow-500 cursor-pointer h-[30px] '
										onClick={() => {
											getOneFunc(item?.id);
										}}
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
									href={`/books/${item?.id}`}
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

			{data?.data?.length && (
				<Pagination
					activePage={activePage}
					setActivePage={setActivePage}
					totalPage={data?.pageCount}
				/>
			)}

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
						<label
							htmlFor='audio_file'
							title='Bosing va Audio yuklang!'
							className=' relative flex flex-col items-center justify-center w-full h-[50px]  border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
						>
							<div className='flex flex-col items-center justify-center pt-3 pb-3'>
								<IoMdCloudUpload className='w-6 h-4 mb-1 mt-2 text-gray-500 dark:text-gray-400' />
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Click to upload audio,</span>
									this optional
								</p>
							</div>
							<input
								id='audio_file'
								type='file'
								className='hidden'
								onChange={(evnt: any) => createAudio(evnt?.target?.files?.[0])}
							/>
						</label>

						<label
							htmlFor='for_file'
							title='Bosing va File yuklang!'
							className=' relative flex flex-col items-center justify-center w-full h-[50px]  border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
						>
							<div className='flex flex-col items-center justify-center pt-3 pb-3'>
								<IoMdCloudUpload className='w-6 h-4 mb-1 mt-2 text-gray-500 dark:text-gray-400' />
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Click to upload file, </span>
									only pdf
								</p>
							</div>
							<input
								id='for_file'
								type='file'
								className='hidden'
								accept='application/pdf'
								required
								onChange={(evnt: any) => createFile(evnt?.target?.files?.[0])}
							/>
						</label>

						<label
							htmlFor='dropzone-file'
							className=' relative flex flex-col items-center justify-center w-full h-[50px]  border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
						>
							<div className='flex flex-col items-center justify-center pt-3 pb-3'>
								<IoMdCloudUpload className='w-6 h-4 mb-1 mt-2 text-gray-500 dark:text-gray-400' />

								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Click to upload img</span>
								</p>
							</div>
							<input
								id='dropzone-file'
								type='file'
								className='hidden'
								onChange={(evnt: any) => createImg(evnt?.target?.files?.[0])}
							/>
						</label>

						<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
							placeholder='Book title '
							type='text'
							ref={book_titleRef}
							required
						/>

						<textarea
							name=''
							id=''
							cols={30}
							rows={2}
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
							placeholder='description'
							ref={book_descriptionRef}
						></textarea>

						<div className='flex w-full gap-2 items-center '>
							<input
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='date written '
								type='date'
								required
								ref={date_writtenRef}
							/>

							<select
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								ref={author_idRef}
								required
							>
								{AuthorData.length ? (
									AuthorData.map((item: any) => (
										<option value={item?.id}> {item?.full_name}</option>
									))
								) : (
									<option value='value' disabled>
										No Authors
									</option>
								)}
							</select>
						</div>

						<div className='flex w-full gap-2 items-center '>
							<select
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								ref={category_idRef}
								required
							>
								{CategoryData.length ? (
									CategoryData.map((item: any) => (
										<option value={item?.id}> {item?.category_name}</option>
									))
								) : (
									<option value='value' disabled>
										No category
									</option>
								)}
							</select>
							<select
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								ref={subcategory_idRef}
								required
							>
								{SubCategoryData.length ? (
									SubCategoryData.map((item: any) => (
										<option value={item?.id}>{item?.subcategory_name}</option>
									))
								) : (
									<option value='value' disabled>
										No subcategory
									</option>
								)}
							</select>
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

			{/* edit modal  */}

			<Modal
				width={'900px'}
				title={'Create Author'}
				modal={EditModal}
				setModal={setEditModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={editFunc}
					>
						<label
							htmlFor='audio_file_edit'
							title='audio yuklash uchun bosing!'
							className=' relative flex flex-col items-center justify-center w-full h-[50px]  border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
						>
							<div className='flex flex-col items-center justify-center pt-3 pb-3'>
								<IoMdCloudUpload className='w-6 h-4 mb-1 mt-2 text-gray-500 dark:text-gray-400' />
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'> Click to upload </span>edit
									audio
								</p>
							</div>
							<input
								id='audio_file_edit'
								type='file'
								className='hidden'
								onChange={(evnt: any) =>
									editcreateAudio(evnt?.target?.files?.[0])
								}
							/>
						</label>

						<label
							htmlFor='for_file_edit'
							title='file yuklash uchun bosing!'
							className=' relative flex flex-col items-center justify-center w-full h-[50px]  border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
						>
							<div className='flex flex-col items-center justify-center pt-3 pb-3'>
								<IoMdCloudUpload className='w-6 h-4 mb-1 mt-2 text-gray-500 dark:text-gray-400' />
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Click to upload </span> edit
									file
								</p>
							</div>
							<input
								id='for_file_edit'
								type='file'
								className='hidden'
								onChange={(evnt: any) =>
									editcreateFile(evnt?.target?.files?.[0])
								}
							/>
						</label>

						<label
							htmlFor='id_for'
							title='rasm yuklash uchun bosing!'
							className=' relative flex flex-col items-center justify-center w-full h-[50px]  border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
						>
							<div className='flex flex-col items-center justify-center pt-3 pb-3'>
								{OneData?.book_image ? (
									<Image
										width={10000}
										height={10000}
										className='w-[100%] object-cover h-[50px]  rounded-lg absolute left-0 top-0 mb-4 text-gray-500 dark:text-gray-400'
										src={`${baseMediaUrl}/images/${OneData?.book_image}`}
										alt='img'
									/>
								) : (
									<IoMdCloudUpload className='w-6 h-4 mb-1 mt-2 text-gray-500 dark:text-gray-400' />
								)}

								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'>Click to upload img</span>
								</p>
							</div>
							<input
								id='id_for'
								type='file'
								className='hidden'
								onChange={(evnt: any) =>
									editcreateImg(evnt?.target?.files?.[0])
								}
							/>
						</label>

						<input
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
							placeholder='Book title '
							type='text'
							ref={editbook_titleRef}
							defaultValue={OneData?.book_title}
						/>

						<textarea
							name=''
							id=''
							cols={30}
							rows={2}
							className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
							placeholder='description'
							ref={editbook_descriptionRef}
							defaultValue={OneData?.book_description}
						></textarea>

						<div className='flex w-full gap-2 items-center '>
							<input
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='date written'
								type='date'
								ref={editdate_writtenRef}
								defaultValue={OneData?.date_written?.slice(0, 10)}
							/>

							<select
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								ref={editauthor_idRef}
							>
								{AuthorData.length ? (
									AuthorData.map((item: any) => {
										if (item?.full_name == OneData?.author?.full_name) {
											return (
												<option selected value={item?.id}>
													{' '}
													{item?.full_name}
												</option>
											);
										} else {
											return (
												<option value={item?.id}> {item?.full_name}</option>
											);
										}
									})
								) : (
									<option value='value' disabled>
										No Authors
									</option>
								)}
							</select>
						</div>

						<div className='flex w-full gap-2 items-center '>
							<select
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								ref={editcategory_idRef}
							>
								{CategoryData.length ? (
									CategoryData.map((item: any) => {
										if (
											item?.category_name == OneData?.category?.category_name
										) {
											return (
												<option selected value={item?.id}>
													{item?.category_name}
												</option>
											);
										} else {
											return (
												<option value={item?.id}> {item?.category_name}</option>
											);
										}
									})
								) : (
									<option value='value' disabled>
										No category
									</option>
								)}
							</select>
							<select
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								ref={editsubcategory_idRef}
							>
								{SubCategoryData.length ? (
									SubCategoryData.map((item: any) => {
										// console.log(item ,"subb itemmmmmm");

										if (
											item?.subcategory_name ==
											OneData?.subcategory?.subcategory_name
										) {
											return (
												<option selected value={item?.id}>
													{item?.subcategory_name}
												</option>
											);
										} else {
											return (
												<option value={item?.id}>
													{' '}
													{item?.subcategory_name}
												</option>
											);
										}
									})
								) : (
									<option value='value' disabled>
										No subcategory
									</option>
								)}
							</select>
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

			{/* delete modal  */}

			<Modal
				width={' w-[85%] md:w-[600px] '}
				title={'Delete Book'}
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
							Do you want to delete this Books?{' '}
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

			<FileModal
				width={' w-[85%] md:w-[600px] '}
				title={'Delete Author'}
				modal={ViewModal}
				setModal={setViewModal}
			>
				<embed
					src={`${baseMediaUrl}/files/${embedUrl}`}
					type='application/pdf'
					width='100%'
					className='h-[90vh]'
				/>
			</FileModal>

			<ToastContainer />
		</>
	);
}
