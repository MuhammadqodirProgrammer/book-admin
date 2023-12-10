"use client";
import Link from "next/link";
import Image from "next/image";
import BgImage from "public/images/js.webp";
import profileImg from "public/images/profile.jpg";
import { FaBirthdayCake } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { apiRoot, baseUrlImg } from "../api/api";

export default function Page() {
  const [data, setData] = useState<any>([]);
 
  const getFunc = async ()=>{

    const resp = await apiRoot.get("author")


    if(resp?.status ===200){
      setData(resp?.data)
      console.log(resp?.data ,"data");
      
    }
    

  }
  useEffect(() => {
   getFunc()
   console.log(data);
   
  }, []);
 

  return (<>
 <div className="grid lg:grid-cols-3  md:grid-cols-1 grid-cols-1 gap-3">

 {
  data?.length ? (
    data.map((item:any)=><Link
    key={item?.id}
    href={`/author/${item?.id}`}
    className="flex flex-col relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4 max-w-md  max-lg:max-w-full max-lg:m-auto"
  >
   
    <Image
      className="h-[280px]  w-full object-cover rounded-lg transition ease-in-out hover:opacity-75"
      src={`${baseUrlImg}/${item?.author_image}`}
      alt="Picture of the author"
      width={1000}
      height={1000}
    />
    <h6 className="pt-[10px] text-[22px] font-bold text-black dark:text-white">
      {item?.full_name}
    </h6>
    <div className="flex gap-[6px] py-[15px]">
      <span className="flex gap-[5px] items-center text-[15px] text-black dark:text-famousCourcesDescsColor">
      <FaBirthdayCake size={20}/>
      {item?.birthday?.slice(0,10)}   {item?.state_birth}
      </span>
     
     
    </div>
    <span className="flex gap-[5px] mb-3 items-center text-[15px] text-black dark:text-famousCourcesDescsColor">
       <FaBook size={20}/>
       {item?.books_count}
      </span>
    <hr className="h-1 w-full bg-CoursesHr" />
    <div className="flex justify-between items-center pt-5">
      <div className="flex gap-[10px] items-center text-black dark:text-white">
       
        <p>Created:</p>
        {item?.createdAt?.slice(0,10)}
      </div>
      <div className="flex gap-[10px] items-center text-black dark:text-white">
        <FaArrowRight size={20}  className="  " />
      </div>
    </div>
  </Link>)
  ):"loading..."
 }
 </div>
  </>
  );
}
