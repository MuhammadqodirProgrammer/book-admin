import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import FamousCourses from "@/components/FamousCourses/FamousCourses";
import NewCourses from "@/components/NewCourses/NewCourses";
import { useRouter } from "next/navigation"; // Import from 'next/router' instead of 'next/navigation'

export default function Layout({ children }: any) {
  const router = useRouter();

  // Check if localStorage is available
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  if (!token) {
    // router.replace("/login");
  } else {
    // router.replace("/");
  }

  if (token) {
    return (
      <div>
        <div>
          <Header />
        </div>
        <Navbar />
        <div className="inner_container mt-[12vh] min-h-[78vh] ">{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="  ">{children}</div>
      </div>
    );
  }
}
