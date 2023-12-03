import Skeleton from "@/components/ui/skeleton";
import Img from "../../../public/images/logo2.png";
import { Link } from "lucide-react";
import Image from "next/image";

export function SkeletonDemo() {
  return (
    <div>
      <Skeleton className=" min-h-[250px]  lg:w-[300px] h-full w-full" />
      <Skeleton className=" mt-2 h-5 mb-3    lg:w-[21%]  w-full" />
      <Skeleton className=" mt-2 h-3 lg:w-[31%]  w-full" />
      <Skeleton className=" mt-2 h-3 lg:w-[31%]  w-full" />
      <div className="flex mt-3 gap-5 items-center">
        <Skeleton className="w-14 h-14 rounded-full" />
        <div>
          <Skeleton className=" mt-2 h-4 w-[80px]" />
          <Skeleton className=" mt-2 h-3 w-[220px]" />
          <Skeleton className=" mt-2 h-3 w-[220px]" />
        </div>
      </div>
    </div>
  );
}

export function VideoSkeleton() {
  return (
    <div className="w-[100%] ">
      <Skeleton className=" min-h-[150px]  min-w-[250px] lg:w-[100%] h-full w-full" />
        <div className=" my-5 ">
          <Skeleton className=" mt-2 h-4 w-[80px]" />
          <Skeleton className=" mt-2 h-3 w-[220px]" />
          <Skeleton className=" mt-2 h-3 w-[220px]" />
        </div>
    </div>
  );
}
