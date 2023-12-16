'use client';
import { useEffect, useState } from 'react';
import { apiRoot } from '../api/api';
import { FaBook } from 'react-icons/fa';
import { FaUserTie } from "react-icons/fa";
import { CommnetSkeleton } from '@/components/Skeleton/Skeleton';
export default function Page() {
	const [data, setData] = useState<any>([]);
	const [Count, setCount] = useState(6);

	const token =
		typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	const getFunc = async () => {
		const resp = await apiRoot.get(`comment`, {
			headers: {
				Authorization: token,
			},
		});
		console.log(resp?.data, 'commnets');

		if (resp?.status === 200) {
			setData(resp?.data);
		}
	};
	useEffect(() => {
		getFunc();
	}, []);

	return (
		<>
			
			<h3 className=' text-[22px] my-3 dark:text-white  text-center font-bold text-black  '>
				All comments
			</h3>

			{data?.length ? (
				<div className='grid sm:grid-cols-2 grid-cols-1 gap-2'>
					{data?.slice(0,Count).map((item: any) => (
						<div
							key={item?.id}
							className='flex items-start mb-4 cursor-pointer hover:bg-slate-300 dark:hover:bg-[#272B43]  p-2 rounded-md'
						>
				 
							<div className='flex-1'>
								<div className='flex items-center gap-2 dark:text-mainColor text-[#171923]'>
									<FaBook className="  " />
									{item?.book?.book_title}
								</div>
                <div className='flex items-center gap-2 dark:text-mainColor text-[#171923]'>
									<FaUserTie className="  "  />
                  {item?.user?.full_name}
								</div>
						
								<p className='text-gray-600 dark:text-white font-bold my-1'>{item?.message}</p>
								<p className='text-gray-600  text-[12px] '>
									{item?.createdAt?.slice(11, 19)}{', '}
									{item?.createdAt?.slice(0, 10)}{' '}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (<div className='grid sm:grid-cols-2 grid-cols-1 gap-2'>

				<CommnetSkeleton />
      </div>
			)}
{
  data?.length > 6 && Count < data?.length ?(<button
    className='bg-teal-500 hover:bg-teal-700 mx-auto block my-3 text-white font-bold py-2 px-5 rounded'
    onClick={() => setCount(Count + 4)}
  >
    More
  </button>):""
}

		</>
	);
}
