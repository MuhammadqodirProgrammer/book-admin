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
import { uploadAudio, uploadFile, uploadImage } from '@/components/Upload/Upload';
import { ToastContainer, toast } from 'react-toastify';
import { apiRoot, baseMediaUrl } from '@/app/api/api';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoMdEye } from 'react-icons/io';
import { FaFileDownload } from 'react-icons/fa';
import { FaPencil } from "react-icons/fa6";
import { IoMdCloudUpload } from 'react-icons/io';


export default function Page() {
	const [data, setData] = useState<any>([]);
	const [OneData, setOneData] = useState<any>([]);
	const { id } = useParams();
	const router = useRouter();
	// Modals state
	const [EditModal, setEditModal] = useState<any>(false);
	const [DeleteModal, setDeleteModal] = useState<any>(false);
	const [isLoading, setIsLoading] = useState<any>(false);
	const [AuthorData, setAuthorData] = useState<any>([]);
	const [CategoryData, setCategoryData] = useState<any>([]);
	const [SubCategoryData, setSubCategoryData] = useState<any>([]);
	const [editImageUrl, setEditImageUrl] = useState<any>('');
	const [editAudioUrl, setEditAudioUrl] = useState<any>('');
	const [editFileUrl, setEditFileUrl] = useState<any>('');
	// media state
	const [ImageUrl, setImageUrl] = useState<any>('');

	// Refs

		// edit
		const editstateRef = useRef<any>();
		const editbook_titleRef = useRef<any>();
		const editbook_descriptionRef = useRef<any>();
		const editstate_birthRef = useRef<any>();
		const editdate_writtenRef = useRef<any>();
		const editcategory_idRef = useRef<any>();
		const editauthor_idRef = useRef<any>();
		const editsubcategory_idRef = useRef<any>();
	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;

		
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
	const getFunc = async () => {
		const resp = await apiRoot.get(`books/${id}`);
		console.log(resp?.data, 'get func');

		if (resp?.status === 200) {
			setData(resp?.data);
			setIsLoading(true);
		
		}
	};
	const checkView = async (book_id:any) => {
		const resp:any = await apiRoot.get(`check/view/${book_id}`);
		console.log(resp?.data, 'check func');

	
	};
	// edit
	const editFunc = async (evt: any) => {
		evt.preventDefault();

		const req = {
			book_title: editbook_titleRef?.current?.value  || data?.book_title,
			book_description: editbook_descriptionRef?.current?.value  || data?.book_description,
			state_birth: editstateRef?.current?.value  || data?.state_birth,
			date_written: editdate_writtenRef?.current?.value  || data?.date_written,
			category_id: editcategory_idRef?.current?.value  || data?.category_id,
			author_id: editauthor_idRef?.current?.value  || data?.author_id,
			subcategory_id: editsubcategory_idRef?.current?.value  || data?.subcategory_id,
			book_file: editFileUrl || data?.book_file,
			book_image: editImageUrl || data?.book_image,
			book_audio: editAudioUrl || data?.book_audio,
		};

		const resp = await apiRoot
			.patch(`books/${id}`, req, {
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
		const res = await apiRoot.delete(`/books/${id}`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(res, 'resp');

		if (res?.status === 200) {
			toast.success('Successfully deleted ');
			setDeleteModal(false);
			router.push("/books")
		} else {
			toast.error('Something went wrong, please try again');
		}
	}
	function generateRandomHexColor() {
		var hexDigits = '0123456789ABCDEF';
		var color = '';
		for (var i = 0; i < 6; i++) {
			color += hexDigits[Math.floor(Math.random() * 16)];
		}
		return color;
	}
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
	useEffect(() => {
		getFunc();
		getSelectData()
	}, []);

	return (
		<>
			<div className='flex  max-[550px]:flex-col  justify-center items-center   gap-[30px] mb-[15px] '>
				<button
					className='bg-red-500 flex items-center gap-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => router.push('/books')}
				>
					<FaArrowLeftLong size={15} className=' my_animate  ' />
					Back
				</button>
				<h3 className=' text-[22px]  dark:text-white text-black text-center '>
					More about the book{' '}
				</h3>
			</div>

			{isLoading ? (
				<div
					key={data?.id}
					className='flex  max-sm:flex-wrap gap-3 relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4  w-[100%] max-lg:m-auto'
				>
					<Image
						className='h-[420px] max-sm:h-[280px]  max-sm:w-[100%]  w-[50%] object-cover rounded-lg transition ease-in-out hover:opacity-75'
						src={`${baseMediaUrl}/images/${data?.book_image}`}
						alt='Picture of the author'
						width={1000}
						height={1000}
					/>
					<div className='max-sm:w-[100%] w-[50%] '>
						<h6 className='pt-[10px] text-[22px] font-bold text-black dark:text-white'>
							{data?.book_title}
						</h6>
						<h6 className='pt-[10px] text-[20px] font-bold text-black dark:text-white'>
						{data?.category?.category_name}, {data?.subcategory?.subcategory_name}
						</h6>
						<h6 className='pt-[10px] text-[16px] font-bold text-black dark:text-white max-h-[180px] overflow-y-scroll '>
							{data?.book_description}
						</h6>

					


						
						<div className='flex gap-[6px] py-[15px] items-center '>
							
							<span className='flex gap-[5px]  items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
								<FaPencil size={20} />
								{data?.author?.full_name}
							</span>
							<span className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
								{data?.date_written?.slice(0,10)}
							</span>
						</div>
						{
							data?.book_audio && <audio
							controls
							src={`${baseMediaUrl}audios/${data?.book_audio}`}
						onPlay={()=>checkView(data?.id)}
							className=' mb-3 border-[2px]  h-[40px] border-dotted rounded-full border-mainColor '
						>
							Your browser does not support the
							<code>audio</code> element.
						</audio>
						}
						
						<div className='flex gap-[10px] items-center text-black dark:text-white'>
							<p>Created:</p>
							{data?.createdAt?.slice(0, 10)}
						</div>
						<div className="flex  items-center justify-between mt-2">

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
						<div className='flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor'>
								<IoMdEye size={20} />
								<p>{data?.number_view}</p>
								
							</div>
						</div>
					</div>
				</div>
			) : (
				<SingleSkeleton />
			)}

			<h3 className=' text-[22px] my-3 dark:text-white text-black text-center '>
				Book file{' '}
			</h3>
			<embed
				src={`${baseMediaUrl}/files/${data?.book_file}`}
				type='application/pdf'
				width='100%'
				className='h-[50vh]'
			/>
			<h3 className=' text-[22px] my-3 dark:text-white text-black text-center '>
				Book commnets
			</h3>

			{
				data?.comments?.length ? (
<div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
	{
							data?.comments.map((item:any)=> <div
							key={item?.id}
							className="flex items-start mb-4 cursor-pointer hover:bg-gray-400 p-2 rounded-md"
						  >
							<div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
							  <img
								src={`https://placehold.co/200x/001/${generateRandomHexColor() || "fff"}.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
								alt="User Avatar"
								className="w-12 h-12 rounded-full object-cover"
							  />
							</div>
							<div className="flex-1">
							  <h2 className="text-lg font-semibold dark:text-white  text-black "> {item?.user?.full_name}</h2>
							  <p className="text-gray-600">{item?.message}</p>
							  <p className="text-gray-600 text-[12px] ">{item?.createdAt?.slice(11, 19)} {item?.createdAt?.slice(0, 10)} </p>
							</div>
						  </div>)
	}
</div>
				):"commnetlar yoq ☹"
			}



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
							{
							data?.book_audio && <audio
							controls
							src={`${baseMediaUrl}audios/${data?.book_audio}`}
						onPlay={()=>checkView(data?.id)}
							className=' mb-3 border-[2px] w-[140px] absolute top-[0px] left-[10px] h-[40px] border-dotted rounded-full border-mainColor '
						>
							Your browser does not support the
							<code>audio</code> element.
						</audio>
						}
								<IoMdCloudUpload className='w-6 h-4 mb-1 mt-2 text-gray-500 dark:text-gray-400' />
								<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
									<span className='font-semibold'> Click to upload  </span>edit audio 
									
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
									<span className='font-semibold'>Click to upload </span> edit file
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
							{data?.book_image ? (
										<Image
											width={10000}
											height={10000}
											className='w-[100%] object-cover h-[50px]  rounded-lg absolute left-0 top-0 mb-4 text-gray-500 dark:text-gray-400'
											src={`${baseMediaUrl}/images/${data?.book_image}`}
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
							defaultValue={data?.book_title}
						/>

						<textarea name="" id="" cols={30} rows={2}  className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
						placeholder='description'
							ref={editbook_descriptionRef}
							defaultValue={data?.book_description} ></textarea>

						<div className='flex w-full gap-2 items-center '>
							<input
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='state_birth state'
								type='date'
								ref={editdate_writtenRef}
								defaultValue={data?.date_written?.slice(0, 10)}
							/>

							<select
								className='w-[48%] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								ref={editauthor_idRef}
							>
								{AuthorData.length ? (
									AuthorData.map((item: any) => {
										if (item?.full_name == data?.author?.full_name) {
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
											if (item?.category_name == data?.category?.category_name) {
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
									}
									)
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
										
										if (item?.subcategory_name == data?.subcategory?.subcategory_name) {
											return (
												<option selected value={item?.id}>
													
													{item?.subcategory_name}
												</option>
											);
										} else {
											return (
												<option value={item?.id}> {item?.subcategory_name}</option>
											);
										}
									}
									)
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
							Do you want to delete this Book?{' '}
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
