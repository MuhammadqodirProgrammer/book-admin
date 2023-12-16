import Skeleton from "@/components/ui/skeleton";
import Img from "../../../public/images/logo2.png";
import { Link } from "lucide-react";
import Image from "next/image";

export function SkeletonDemo() {
  return (
    <div className="w-[300px]">
      <Skeleton className=" min-h-[250px]  lg:w-[300px] h-full w-full" />
      <Skeleton className=" mt-2 h-5 mb-3   w-[21%] " />
      <Skeleton className=" mt-2 h-3 lg:w-[71%]  w-full" />
      <Skeleton className=" mt-2 h-3 lg:w-[71%]  w-full" />
          <Skeleton className="  h-3 mt-3 w-full" />
    
    </div>
  );
}

export function SingleSkeleton() {
  return (
    <div className="flex  max-sm:flex-wrap gap-3 relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4  w-[100%] max-lg:m-auto ">
      <Skeleton className="h-[400px] max-sm:h-[280px]  max-sm:w-[100%]  w-[50%] object-cover rounded-lg transition ease-in-out hover:opacity-75 " />

        <div className=" my-5 max-sm:w-[100%]  w-[50%]  ">
          <Skeleton className=" mt-2 h-4 w-[25%]" />
          <Skeleton className=" mt-4 h-6 w-[75%]" />
          <Skeleton className=" mt-4 h-6 w-[75%]" />
        </div>
    </div>
  );
}

export function CommnetSkeleton() {
  return (
    <div className="  relative dark:bg-famousCourcesBg bg-slate-300  text-black  dark:text-white shadow-[0_1px_3px_0_rgba(0, 0, 0, 0.1),_0_1px_2px_0_rgba(0, 0, 0, 0.06)] rounded-md  p-4  w-[100%] max-lg:m-auto ">
        <div className=" my-5 w-[100%]   ">
          <Skeleton className=" mt-2 h-4 w-[25%]" />
          <Skeleton className=" mt-4 h-6 w-[75%]" />
          <Skeleton className=" mt-4 h-6 w-[75%]" />
        </div>
    </div>
  );
}
