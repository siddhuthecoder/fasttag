import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import mod1 from '../../assets/mod1.png';
import mod2 from '../../assets/mod2.png';
import { MdAddCard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Map from '../openstreetMap/Map';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { signInSuccess } from '../../store/authSlice';

const VehicleCard = ({ vehicleNumber, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/fastag/${vehicleNumber}`);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    navigate(`/vahan/${vehicleNumber}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();  // Stop the click event from bubbling up
    onEdit(vehicleNumber);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();  // Stop the click event from bubbling up
    onDelete(vehicleNumber);
  };

  return (
    <div
      className="w-full bg-white rounded-md mt-3 justify-between flex-wrap flex items-center cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex w-full justify-between md:justify-start md:w-auto items-center gap-1">
        <div className="flex flex-col ps-2 my-2">
          <div className="font-semibold text-lg">Vehicle Number</div>
          <div className="text-zinc-400">{vehicleNumber}</div>
        </div>
        <div className="flex items-center">
          <button onClick={handleDeleteClick}>
            <RiDeleteBinLine className="text-2xl ms-3 text-red-500 mx-3 cursor-pointer" />
          </button>
          <button onClick={handleEditClick}>
            <FiEdit className="text-2xl ms-3 text-blue-500 mx-3 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="flex items-center m-2 gap-3">
        <div className="w-[70px] cursor-pointer h-[30px] flex justify-center items-center rounded-full border border-black bg-[#EDEDED]">
          <img src={mod1} className="w scale-[0.8]" alt="" />
        </div>
        <div
          className="w-[70px] h-[30px] cursor-pointer flex justify-center mx-2 items-center rounded-full border border-black bg-[#EDEDED]"
          onClick={handleImageClick}
        >
          <img src={mod2} className="scale-[0.8]" alt="" />
        </div>
      </div>
    </div>
  );
};

const MyVehicle = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newVehicleNumber, setNewVehicleNumber] = useState('');
  const [editVehicleNumber, setEditVehicleNumber] = useState('');
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const location = useLocation();
  const pathName = location.pathname;
  const [vehicles, setVehicles] = useState(user.vehicleNumbers || []);

  const updateVehiclesOnServer = async (updatedVehicles) => {
    try {
      const company_id = localStorage.getItem('userID');
      const response = await axios.put(`https://fastagtracking.com/customulip/company/${company_id}`, {
        vehicleNumbers: updatedVehicles,
      });
      console.log('Vehicle array updated:', response.data);
      dispatch(signInSuccess(response.data));
      window.location.reload();
    } catch (error) {
      console.error('Error updating vehicle array:', error);
    }
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (vehicleNumber) => {
    setVehicleToEdit(vehicleNumber);
    setEditVehicleNumber(vehicleNumber);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const openDeleteModal = (vehicleNumber) => {
    setVehicleToDelete(vehicleNumber);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleAddSubmit = () => {
    const updatedVehicles = [...vehicles, newVehicleNumber];
    updateVehiclesOnServer(updatedVehicles);
    closeAddModal();
  };

  const handleEditSubmit = () => {
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle === vehicleToEdit ? editVehicleNumber : vehicle
    );
    setVehicles(updatedVehicles);
    updateVehiclesOnServer(updatedVehicles);
    closeEditModal();
  };

  const handleDeleteConfirm = () => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle !== vehicleToDelete);
    updateVehiclesOnServer(updatedVehicles);
    closeDeleteModal();
  };

  const tabs = [
    {
      name: "Fastag",
      link: "/fastag",
    },
    {
      name: "Vahan",
      link: "/vahan",
    },
    {
      name: "Sarathi",
      link: "/sarathi",
    },
    {
      name: "My Vehicles",
      link: "/MyVehicles",
    },
  ];

  return (
    <>
      <div className="w-full grid grid-cols-1 mt-[80px] md:grid-cols-12 gap-5 md:gap-2">
        <div className="md:w-[90%] ms-2 w-[100%] mx-auto max-h-[620px] md:col-span-4 flex flex-col">
          <div className="flex items-center flex-wrap mt-2 gap-2 md:hidden">
            {tabs.map((data, index) => (
              <Link
                to={data.link}
                key={index}
                className={`px-3 py-1 cursor-pointer ${
                  pathName === data.link ? "bg-[#E1E1FB]" : ""
                } text-nowrap border border-black duration-150 rounded-full hover:bg-[#E1E1FB]`}
              >
                {data.name}
              </Link>
            ))}
          </div>
          <div className="w-full flex flex-col">
            <div className="w-full grid grid-cols-12 gap-1">
              <div className="flex w-full col-span-9 md:col-span-8 mx-auto items-center mt-3 relative">
                <input
                  type="text"
                  className="w-full px-3 h-[52px] rounded-md border"
                  placeholder="Enter Vehicle Number"
                />
                <div className="absolute right-0 w-[50px] z-[2] h-[50px] bg-[#5E81F4] rounded-tr-md rounded-br-md flex justify-center items-center">
                  <IoSearchOutline className="text-white text-2xl" />
                </div>
              </div>
              <div className="col-span-3 md:col-span-4 flex justify-center mt-3 items-center">
                <button
                  className="w-full flex justify-center items-center rounded-md h-[50px] text-white text-lg font-semibold bg-[#5E81F4]"
                  onClick={openAddModal}
                >
                  <span className="hidden md:block">Add Vehicle</span>
                  <MdAddCard />
                </button>
              </div>
            </div>
            <div className="w-full flex-col h-[550px] mt-3 overflow-y-auto">
              {vehicles.map((vehicleNumber, index) => (
                <VehicleCard
                  key={index}
                  vehicleNumber={vehicleNumber}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-[90%] w-[100%] hidden md:flex ms-1 mx-auto min-h-[620px] z-[-0] md:col-span-8 justify-center items-center">
          <Map tollData={[]} />
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="bg-white p-6 rounded-md w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md mb-4"
            value={newVehicleNumber}
            onChange={(e) => setNewVehicleNumber(e.target.value)}
            placeholder="Enter Vehicle Number"
          />
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              onClick={closeAddModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleAddSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Vehicle Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="bg-white p-6 rounded-md w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Edit Vehicle</h2>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md mb-4"
            value={editVehicleNumber}
            onChange={(e) => setEditVehicleNumber(e.target.value)}
            placeholder="Enter Vehicle Number"
          />
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              onClick={closeEditModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleEditSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="bg-white p-6 rounded-md w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Delete Vehicle</h2>
          <p>Are you sure you want to delete this vehicle?</p>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={handleDeleteConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyVehicle;
