import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentValidation = () => {
  const { paymentId } = useParams();


  useEffect(() => {
    const validatePayment = async () => {
      try {
        const response = await axios.get(
          `https://fastagtracking.com/api/payments/validate/${paymentId}`
        );

        if (response.data.success) {
          // Handle successful payment, maybe redirect to a success page
          alert("Payment is Scuces")
       
        } else {
          // Handle payment failure, maybe redirect to a failure page
          alert("Payment Fialed")
      
        }
      } catch (error) {
        console.error("Error validating payment:", error);
     
      }
    };

    validatePayment();
  }, [paymentId]);

  return <div>Validating Payment...</div>;
};

export default PaymentValidation;
