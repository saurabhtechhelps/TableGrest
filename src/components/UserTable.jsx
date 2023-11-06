import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerFormDetails from "./CustomerFormDetails";
import { IoCloseOutline } from "react-icons/io5";

const UserTable = ({ data }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [QNAData, setQNAData] = useState([]);
  const handleDetailsClick = (value) => {
    setQNAData(value.QNA);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="overflow-x-auto m-2 md:m-5">
      <table className="w-full border border-[#EC2752]">
        <thead className="bg-[#EC2752] text-white">
          <tr>
            <th className="p-2 md:p-3 text-sm md:text-base">User Email</th>
            <th className="p-2 md:p-3 text-sm md:text-base">Customer Mobile</th>
            <th className="p-2 md:p-3 text-sm md:text-base">Customer Name</th>
            <th className="p-2 md:p-3 text-sm md:text-base">Product</th>
            <th className="p-2 md:p-3 text-sm md:text-base">Price</th>
            <th className="p-2 md:p-3 text-sm md:text-base">Prospect Id</th>
            <th className="p-2 md:p-3 text-sm md:text-base">More Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : ""}>
              <td className="p-2 md:p-3 text-sm md:text-base text-center">
                {val?.userId?.email}
              </td>
              <td className="p-2 md:p-3 text-sm md:text-base text-center">
                {val?.userId?.phoneNumber}
              </td>
              <td className="p-2 md:p-3 text-sm md:text-base text-center">
                {val?.userId?.name}
              </td>
              <td className="p-2 md:p-3 text-sm md:text-base text-center">
                {val?.modelId?.name}
              </td>
              <td className="p-2 md:p-3 text-sm md:text-base text-center">
                {val.price}
              </td>
              <td className="p-2 md:p-3 text-sm md:text-base text-center">
                {val?.userId?._id}
              </td>
              <td className="p-2 md:p-3 text-sm md:text-base text-center">
                <p
                  onClick={() => handleDetailsClick(val)}
                  className=" cursor-pointer"
                >
                  Details
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  z-50 ">
          <div className="modal-container bg-white w-96 mx-auto rounded  shadow-lg p-4 relative">
            <div className="modal-content ">
              <CustomerFormDetails
                QNAData={QNAData}
                closeModal={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
