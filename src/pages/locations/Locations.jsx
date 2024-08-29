import { useState } from "react";
import { useGetLocationDetailsQuery } from "../../services/adminApi";
import AddLocation from "./AddLocation";
import CardLocation from "./CardLocation";
import ReactPaginate from "react-paginate";
import Loader from "../../components/loader/Loader";

const Locations = () => {
    const [addModal, setAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Number of items per page

    const handleOpenAddModal = () => {
        setAddModal(!addModal);
    };

    const { data, error, isLoading, isSuccess, refetch } = useGetLocationDetailsQuery();

    if (isLoading) return <div><Loader/></div>;
    if (error) return <div>Error: {error.message}</div>;

    const updateBrands = () => {
        refetch();
    };

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentPageData = data?.data?.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(data?.data?.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div>
            {isSuccess && (
                <>
                    {addModal && (
                        <div className="w-full h-screen flex items-center justify-center top-0 left-0 inset-0 fixed z-10 bg-[#0000004D]">
                            <AddLocation setAddModal={setAddModal} updateBrands={updateBrands} />
                        </div>
                    )}
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 bg-blue-400 text-white text-left">Name</th>
                                <th className="py-3 px-4 bg-blue-400 text-white text-left">Text</th>
                                <th className="py-3 px-4 bg-blue-400 text-white text-left">Images</th>
                                <th className="py-3 px-4 bg-blue-400 text-white text-left">Action</th>
                                <th className="py-3 px-4 bg-blue-400 text-white text-left">
                                    <button
                                        onClick={handleOpenAddModal}
                                        className="bg-blue-700 py-1 px-3 rounded-lg"
                                    >
                                        Add Location
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData?.map((item, index) => (
                                <CardLocation key={item.id} item={item} index={index} updateBrands={updateBrands} />
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-center pb-4">
                        <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"flex items-center space-x-2"}
                            pageClassName={"bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer"}
                            activeClassName={"bg-blue-700"}
                            previousClassName={"bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer"}
                            nextClassName={"bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer"}
                            breakLabel={"..."}
                            breakClassName={"text-gray-500"}
                            disabledClassName={"opacity-50 cursor-not-allowed"}
                            pageLinkClassName={""}
                            previousLinkClassName={""}
                            nextLinkClassName={""}
                            breakLinkClassName={""}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Locations;
