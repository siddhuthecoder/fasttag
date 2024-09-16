import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VehicleDataTable.css'; // Importing the CSS file

const VehicleDataTable = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState('');

    const companyID = localStorage.getItem('userID');

    // Fetch vehicle data from the API
    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await axios.get(
                    `https://fastagtracking.com/customulip/vehicle/status/${companyID}`
                );
                setVehicles(response.data.data); // Set the vehicles array
                setFilteredVehicles(response.data.data); // Initially, show all vehicles
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchVehicleData();
    }, []);

    // Handle search input and filter the vehicle list based on the search term
    const handleSearch = () => {
        if (searchTerm) {
            const filtered = vehicles.filter((vehicle) =>
                vehicle.rc_regn_no.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredVehicles(filtered);
        } else {
            setFilteredVehicles(vehicles); // Reset to all vehicles if no search term
        }
    };

    // Handle adding a new vehicle
    const handleAddVehicle = async () => {
        if (newVehicle) {
            try {
                const response = await axios.post('https://fastagtracking.com/customulip/vehicle-status', {
                    company_id: companyID,
                    vehiclenumber: newVehicle,
                });
                console.log('Vehicle added:', response.data);
                // Optionally, refetch or update vehicle data here
                setNewVehicle(''); // Clear the input field after adding
            } catch (error) {
                console.error('Error adding vehicle:', error);
            }
        }
    };

    return (
        <div className="vehicle-container">
            <h2 className="vehicle-heading">Vehicle Information</h2>

            {/* Search and Add Vehicle Section */}
            <div className="action-section">
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search by Vehicle No."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-btn">Search</button>
                </div>

                <div className="add-vehicle-section">
                    <input
                        type="text"
                        placeholder="Enter New Vehicle No."
                        value={newVehicle}
                        onChange={(e) => setNewVehicle(e.target.value)}
                        className="add-input"
                    />
                    <button onClick={handleAddVehicle} className="add-btn">Add Vehicle</button>
                </div>
            </div>

            {/* Vehicle Table */}
            {filteredVehicles.length > 0 ? (
                <table className="vehicle-table">
                    <thead>
                        <tr>
                            <th>Vehicle No</th>
                            <th>Fit Upto</th>
                            <th>Insurance Upto</th>
                            <th>NP Upto</th>
                            <th>Permit Valid Upto</th>
                            <th>PUCC Upto</th>
                            <th>Tax Upto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td>{vehicle.rc_regn_no}</td>
                                <td>{vehicle.rc_fit_upto}</td>
                                <td>{vehicle.rc_insurance_upto}</td>
                                <td>{vehicle.rc_np_upto}</td>
                                <td>{vehicle.rc_permit_valid_upto}</td>
                                <td>{vehicle.rc_pucc_upto}</td>
                                <td>{vehicle.rc_tax_upto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data-text">No vehicle data available</p>
            )}
        </div>
    );
};

export default VehicleDataTable;
