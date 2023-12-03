"use client";
import React, { useRef } from "react";
import { GrClose } from "react-icons/gr";
import "../Modal/modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ErrorModal: React.FC<ModalProps> = ({ modal, setModal }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const router: any = useRouter();

  const logInFunc = (evt: any) => {
    if (typeof window !== 'undefined') {
      evt.preventDefault();
      router.push("/auth");
      localStorage.removeItem("token");
      setModal(false);
    }
  };
  

  return (
    <div ref={overlayRef} className={`overlay   ${modal ? "open" : ""}`}>
      <div className={` w-[40%] modal_wrapper bg-white dark:bg-topColor `}>
        <div className={` modal_header`}>
          <h3 className="font-semibold text-center md:text-[26px] text-[20px] text-black dark:text-white">
            Tokeningiz eskirgan, yoki sz admin emasiz
          </h3>
        </div>
        <div className={`modal-content`}>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={logInFunc}
          >
            Go To Login
          </button>
        </div>
      </div>
    </div>
  );
};
