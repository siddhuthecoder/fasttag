import React, { useState, useEffect } from "react";
import "./price.css";
import axios from "axios";
import img from '../../assets/logo.jpg';
import { useSelector } from 'react-redux';

const Price = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanTypes, setSelectedPlanTypes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fastagtracking.com/customulip/plans"
        );
        const data = await response.json();
        setPlans(data);

        const initialSelectedPlanTypes = {};
        data.forEach((plan) => {
          if (!initialSelectedPlanTypes[plan.name]) {
            initialSelectedPlanTypes[plan.name] = "monthly";
          }
        });
        setSelectedPlanTypes(initialSelectedPlanTypes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePlanTypeChange = (planName, planType) => {
    setSelectedPlanTypes((prevState) => ({
      ...prevState,
      [planName]: planType,
    }));
  };

  const calculateDiscount = (actualPrice, offerPrice) => {
    const discount = ((actualPrice - offerPrice) / actualPrice) * 100;
    return Math.round(discount);
  };

  const handleGetStarted = (planName) => {
    if (!isAuthenticated) {
      alert("Please create your account first or Login with Your account.");
      return;
    }

    const selectedType = selectedPlanTypes[planName];
    const plan = plans.find(
      (plan) => plan.name === planName && plan.type === selectedType
    );

    if (plan) {
      setSelectedPlan({ ...plan, planType: selectedType });
      setIsModalOpen(true);
    } else {
      alert("Plan not found. Please try again.");
    }
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    const companyId = localStorage.getItem("userID");

    try {
      const orderData = {
        amount: selectedPlan.offerprice * 100,
        currency: "INR",
        receipt: `receipt_${selectedPlan._id}`,
        partial_payment: false,
        first_payment_min_amount: 0,
        notes: {
          company_id: companyId,
          payment_for: "subscription",
          quantity: 1,
          gst: 18,
          total_amount: selectedPlan.offerprice * 1.18,
        },
      };

      const response = await axios.post(
        "https://fastagtracking.com/customulip/razorpayorder",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const order = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: 'Fastagtracking',
        image: 'https://fastagtracking.com/static/media/logo2.c6341f740d920f8131f9.png',
        description: selectedPlan.name,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verificationData = {
              order_id: order.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyResponse = await axios.post(
              "https://fastagtracking.com/verifyPayment",
              verificationData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (verifyResponse.data.success) {
              alert("Payment Verified Successfully!");
              setIsModalOpen(false);
            } else {
              alert(verifyResponse.data.message || "Payment verification failed.");
            }
          } catch (error) {
            alert(
              error.response?.data?.message ||
                error.message ||
                "Payment verification failed. Please try again."
            );
          }
        },
        prefill: {
          name: "", 
          email: "", 
          contact: "", 
        },
        theme: {
          color: "#5E81F4",
        },
      };

      if (window.Razorpay) {
        const razor = new window.Razorpay(options);
        razor.on("payment.failed", function (response) {
          alert(`Payment failed: ${response.error.description}`);
        });
        razor.open();
      } else {
        console.error("Razorpay SDK not loaded.");
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="plans__container mt-[80px]">
      <div className="plans">
        <div className="planItem__container">
          {Object.keys(selectedPlanTypes).map((planName) => {
            const plan = plans.find(
              (p) =>
                p.name === planName &&
                p.type === selectedPlanTypes[planName]
            );

            const discountPercentage = plan
              ? calculateDiscount(plan.price, plan.offerprice)
              : 0;

            return (
              <div
                key={plan ? plan._id : planName}
                className={`planItem planItem--${
                  plan && plan.name === "Premium" ? "entp" : ""
                }`}
              >
                <div className="card">
                  <div className="card__header">
                    <h2>{planName}</h2>
                    {plan && discountPercentage > 0 && (
                      <div className="discount-badge">
                        {discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                  <div className="plan-buttons">
                    <button
                      className={`plan-button ${
                        selectedPlanTypes[planName] === "monthly"
                          ? "plan-button--active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePlanTypeChange(planName, "monthly")
                      }
                    >
                      Monthly
                    </button>
                    <button
                      className={`plan-button ${
                        selectedPlanTypes[planName] === "quaterly"
                          ? "plan-button--active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePlanTypeChange(planName, "quaterly")
                      }
                    >
                      Quarterly
                    </button>
                    <button
                      className={`plan-button ${
                        selectedPlanTypes[planName] === "yearly"
                          ? "plan-button--active"
                          : ""
                      }`}
                      onClick={() =>
                        handlePlanTypeChange(planName, "yearly")
                      }
                    >
                      Yearly
                    </button>
                  </div>
                  <div className="card__desc">
                    {plan ? (
                      <>
                        Actual Price{" "}
                        <span className="actual-price">₹{plan.price}</span>
                      </>
                    ) : (
                      "Not Available"
                    )}
                  </div>
                </div>
                {plan && (
                  <>
                    <div className="price">
                      ₹{plan.offerprice}
                      <span className="spann">
                        / {selectedPlanTypes[planName]}
                      </span>
                    </div>
                    <ul className="featureList">
                      <li>Upto {plan.apiHitLimit} FASTAG Search</li>
                      <li>Upto {plan.apiHitLimit} VAHAN Search</li>
                      <li>Upto {plan.apiHitLimit} SARATHI Search</li>
                      <li
                        className={plan.name === "Basic" ? "disabled" : ""}
                      >
                        API for ERP and SAP
                      </li>
                    </ul>
                    <button
                      className="button button--blue"
                      onClick={() => handleGetStarted(planName)}
                    >
                      <span className="text-white">Get Now</span>
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={() => setIsModalOpen(false)}>
        &times;
      </button>
      <h2>Confirm Your Plan</h2>
      <p><strong>Plan Name:</strong> {selectedPlan.name}</p>
      <p><strong>Plan Type:</strong> {selectedPlan.planType}</p>
      <p><strong>Actual Price:</strong> ₹{selectedPlan.price}</p>
      <p><strong>Offer Price:</strong> ₹{selectedPlan.offerprice}</p>
      <button className="button button--blue" onClick={handlePayment}>
        Pay Now
      </button>
      
    </div>
  </div>
)}

    </section>
  );
};

export default Price;
