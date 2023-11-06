import React, { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import axios from "axios";
import Filter from "../components/Filter";
import downArrow from "../assets/down.png";
import { useSelector } from "react-redux";

const CustomerTable = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataDup, setTableDataDup] = useState([]);
  const [salesTableData, setSalesTableData] = useState([]);
  const [prospectTableData, setProspectTableData] = useState([]);
  // const userProfile = useSelector((state) => state.user.profile);
  const [currentProspectPage, setCurrentProspectPage] = useState(0);
  const [prospectPageSize, setProspectPageSize] = useState(10);
  const [maxProspectPages, setMaxProspectPages] = useState(0);
  const [currentSalesPage, setCurrentSalesPage] = useState(0);
  const [salesPageSize, setSalesPageSize] = useState(10);
  const [maxSalesPages, setMaxSalesPages] = useState(0);
  const [currentTable, setCurrentTable] = useState("prospect");

  const handleChange = (e) => {
    if (e.target.value === "sales") {
      setCurrentTable("sales");
      setTableData(salesTableData);
      setTableDataDup(salesTableData);
    } else {
      setCurrentTable("prospect");
      setTableData(prospectTableData);
      setTableDataDup(prospectTableData);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://phone-server-pundir72.vercel.app/api/prospects/findAll?page=${currentProspectPage}&limit=${prospectPageSize}`
      )
      .then((response) => {
        setMaxProspectPages(Math.ceil(response.data.totalCounts / 10));
        setProspectTableData(response.data.data);
        setTableData(response.data.data);
        setTableDataDup(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [currentProspectPage, prospectPageSize]);

  useEffect(() => {
    axios
      .get(
        `https://phone-server-pundir72.vercel.app/api/prospects/findAllSelled?page=${currentSalesPage}&limit=${salesPageSize}`
      )
      .then((response) => {
        setSalesTableData(response.data.data);
        setMaxSalesPages(Math.ceil(response.data.totalCounts / 10));
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [currentSalesPage, salesPageSize]);

  return (
    <div>
      <div className="flex items-center w-screen p-4 h-20 HEADER bg-white">
        <img
          src={downArrow}
          alt="arrow"
          className="h-5 md:h-8 w-12.5 transform rotate-90"
        />
        <div className="flex justify-between w-full">
          <span className="w-4/5 text-xl md:text-3xl ml-4">
            Sales/Prospect Data
          </span>
          {/* <p className="md:text-3xl text-xl mr-4">{userProfile?.name}</p> */}
        </div>
      </div>
      <div className="flex justify-start p-4">
        <select
          onChange={handleChange}
          className="p-3 rounded-lg text-[#EC2752] font-semibold text-xl focus:outline-none"
          value={currentTable}
        >
          <option className="font-semibold text-xl" value="prospect">
            Prospect
          </option>
          <option className="font-semibold text-xl" value="sales">
            Sales
          </option>
        </select>
      </div>
      <div>
        <Filter data={tableData} setTableDataDup={setTableDataDup} />
      </div>
      <UserTable data={tableDataDup} />

      {currentTable === "prospect" ? (
        <div className="flex justify-center my-4">
          <button
            onClick={() => setCurrentProspectPage(currentProspectPage - 1)}
            disabled={currentProspectPage === 0}
            className={`mx-2 px-4 py-2 rounded-lg ${
              currentProspectPage === 0
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#EC2752] text-white cursor-pointer"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentProspectPage(currentProspectPage + 1)}
            disabled={currentProspectPage === maxProspectPages - 1}
            className={`mx-2 px-4 py-2 rounded-lg ${
              currentProspectPage === maxProspectPages - 1
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#EC2752] text-white cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex justify-center my-4">
          <button
            onClick={() => setCurrentSalesPage(currentSalesPage - 1)}
            disabled={currentSalesPage === 0}
            className={`mx-2 px-4 py-2 rounded-lg ${
              currentSalesPage === 0
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#EC2752] text-white cursor-pointer"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentSalesPage(currentSalesPage + 1)}
            disabled={currentSalesPage === maxSalesPages - 1}
            className={`mx-2 px-4 py-2 rounded-lg ${
              currentSalesPage === maxSalesPages - 1
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#EC2752] text-white cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
