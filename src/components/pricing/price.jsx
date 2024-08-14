import React, { useState, useEffect } from "react";
import "./price.css";
import axios from "axios";

const Price = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanTypes, setSelectedPlanTypes] = useState({});

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

  const handleGetStarted = async (planName) => {
    const selectedType = selectedPlanTypes[planName];
    // alert(`Plan: ${planName}, Type: ${selectedType}`);
    const companyId=localStorage.getItem('userID')

    if (window.confirm("Are you sure you want to buy this item?")) {
      try {
        const product = plans.find(
          (plan) => plan.name === planName && plan.type === selectedType
        );

        if (!product) {
          alert("Plan not found. Please try again.");
          return;
        }

        const orderData = {
          amount: product.offerprice * 100, // Razorpay accepts amount in paisa
          currency: "INR",
          receipt: `receipt_${product._id}`,
          partial_payment: false,
          first_payment_min_amount: 0,
          notes: {
            company_id: companyId,
            payment_for: "subscription",
            quantity: 1,
            gst: 18,
            total_amount: product.offerprice * 1.18,
          },
        };

        const response = await axios.post(
          'https://fastagtracking.com/customulip/razorpayorder',
          orderData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
         
        const order=response.data;
        alert(order)
        
       
       
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: product.name,
          description: product.description,
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
                'https://fastagtracking.com/verifyPayment',
                verificationData,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              alert(verifyResponse.data.message || "Payment Verified Successfully!");
            } catch (error) {
              alert(
                error.response?.data?.message ||
                  error.message ||
                  "Payment verification failed. Please try again."
              );
            }
          },
          prefill: {
            name: "", // Fill if you have user name
            email: "", // Fill if you have user email
            contact: "", // Fill if you have user contact
          },
          theme: {
            color: "#5E81F4",
          },
        };

        if (window.Razorpay) {
          const razor = new window.Razorpay(options);

          razor.on("payment.failed", function (response) {
            console.log("Payment failed response:", response);
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
                    <div
                      className={`card__icon ${
                        plan && plan.name === "Basic"
                          ? "symbol symbol--rounded"
                          : plan && plan.name === "Standard"
                          ? "symbol"
                          : ""
                      }`}
                    ></div>
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
    </section>
  );
};

export default Price;
