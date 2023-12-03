import ReactPaginate from "react-paginate";
import Image from "../../../node_modules/next/image";
import imgname from "../../../public/images/profile.jpg"
import {GrPrevious ,GrNext} from "react-icons/gr"

export const Pagination = ({ totalPage ,setActivePage, activePage}:any) => {
  return (
    <>
      <ReactPaginate
        pageCount={totalPage}
        previousLabel=<GrPrevious size={24}  className=" text-gray-400 " />
        nextLabel=<GrNext size={24}  className=" text-gray-400 " />
        forcePage={activePage === 1? 0 : activePage - 1}
        className="pagination justify-content-center my-5 gap-3"
        pageLinkClassName=" page-link w-[40px] h-[40px] rounded-full border-[1px] border-[teal]  flex items-center justify-center "
        pageClassName="page-item  w-[40px] h-[40px] rounded-full "
        previousLinkClassName=" text-gray-500    "
        nextLinkClassName=" text-gray-500  "
        activeClassName="active  text-red-500  bg-[teal] "
        onPageChange={ (data) =>{
            setActivePage(data.selected + 1)

        }}
      />
    </>
  );
};

