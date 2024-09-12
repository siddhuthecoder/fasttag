import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentStatus = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get("transactionId");
  const errorParam = queryParams.get("error");

  useEffect(() => {
    if (errorParam) {
      setError("An error occurred during payment validation.");
      setLoading(false);
    } else if (transactionId) {
      axios
        .get(
          `https://fastagtracking.com/customulip/payment/details?transactionId=${transactionId}`
        )
        .then((response) => {
          const paymentData = response.data?.data;
          if (paymentData) {
            setPaymentData(paymentData);
            setLoading(false);
          } else {
            setError("Payment details not found.");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching payment details:", err);
          setError("Failed to fetch payment details.");
          setLoading(false);
        });
    }
  }, [transactionId, errorParam]);

  const handleClose = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 p-4 rounded-md shadow-md text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Payment Status</h1>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <div className="mt-4">
          {paymentData ? (
            <div>
              <div className="border-b border-gray-200 pb-4">
                <p className="text-gray-600">
                  <strong>Merchant ID:</strong> {paymentData.merchantId}
                </p>
                <p className="text-gray-600">
                  <strong>Merchant Transaction ID:</strong>{" "}
                  {paymentData.merchantTransactionId}
                </p>
                <p className="text-gray-600">
                  <strong>Amount Paid:</strong> ₹{paymentData.amount}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong> {paymentData.status}
                </p>
                <p className="text-gray-600">
                  <strong>Transaction ID:</strong> {paymentData.transactionId}
                </p>
              </div>

              {paymentData.status === "COMPLETED" ? (
                <div className="bg-green-100 text-green-600 p-4 rounded-md mt-4">
                  <h2 className="text-lg font-bold">Payment Successful!</h2>
                  <p>Your payment was successfully processed.</p>
                </div>
              ) : (
                <div className="bg-red-100 text-red-600 p-4 rounded-md mt-4">
                  <h2 className="text-lg font-bold">Payment Failed</h2>
                  <p>
                    There was an issue with your payment. Please try again or
                    contact support.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Transaction not found
            </div>
          )}
        </div>
        <div className="mt-4">
          <button
            onClick={handleClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Close & Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
