import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const CustomerFormDetails = ({ QNAData, closeModal }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const flatQNA = [];
    QNAData.forEach((category) => {
      for (const group in category) {
        flatQNA.push(...category[group]);
      }
    });

    setData(flatQNA);
  }, [QNAData]);

  return (
    <div className="fixed top-0 left-0 px-2 w-full h-full flex items-center justify-center z-50 bg-black   bg-opacity-50">
      <div className="p-4 rounded-lg bg-[#F5F4F9] shadow-md w-full md:max-w-lg  overflow-y-auto max-h-96 md:max-h-[90%]  relative">
        <IoCloseOutline
          onClick={closeModal}
          className="cursor-pointer sticky top-0 left-[700px] text-gray-500 hover:text-gray-700"
          size={24}
        />
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="my-4">
          <form>
            {data &&
              data.map((question, index) => (
                <div className="flex flex-col gap-4 mb-4" key={index}>
                  <div className="flex gap-1">
                    <p className="text-xl">{index + 1}.</p>
                    <p className="text-xl">{question.quetion}</p>
                  </div>
                  <div className="max-w-[200px] flex gap-20 ml-3">
                    <label className="text-[#EC2752] font-medium">
                      <input
                        type="radio"
                        value="yes"
                        checked={question.key === "yes"}
                        readOnly
                      />{" "}
                      Yes
                    </label>
                    <label className="text-[#EC2752] font-medium">
                      <input
                        type="radio"
                        value="no"
                        checked={question.key === "no"}
                        readOnly
                      />{" "}
                      No
                    </label>
                  </div>
                  <div className="border-b-2 opacity-10 border-[#9C9C9C] max-w-[500px]"></div>
                </div>
              ))}
          </form>
        </div>

        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-[#EC2752] text-white rounded hover:bg-[#D7203D] focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomerFormDetails;
