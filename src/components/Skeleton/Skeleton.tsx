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
