import React, { useState, useEffect } from "react";
import "./price.css";
import axios from "axios";
import img from "../../assets/logo.jpg";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Price = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanTypes, setSelectedPlanTypes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for data fetch
  const isAuthenticated = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://fastagtracking.com/customulip/plans"
        );
        const data = response.data;
        setPlans(data);

        const initialSelectedPlanTypes = {};
        data.forEach((plan) => {
          if (!initialSelectedPlanTypes[plan.name]) {
            initialSelectedPlanTypes[plan.name] = "monthly";
          }
        });
        setSelectedPlanTypes(initialSelectedPlanTypes);
      } catch (error) {
        toast.error("Error fetching plans data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
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
      toast.warn("Please create your account first or log in.");
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
      toast.error("Plan not found. Please try again.");
    }
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    const companyId = localStorage.getItem("userID");
    const userPhone = isAuthenticated?.phone; // Assuming you have phone stored in user profile
    if (!userPhone || userPhone.length !== 10) {
      toast.error("Invalid phone number in your profile. Please update it.");
      return;
    }

    try {
      const amount = selectedPlan.offerprice; // Convert to paisa
      const paymentUrl = `https://fastagtracking.com/customulip/pay?company_id=${companyId}&amount=${amount}&phone=${userPhone}`;

      console.log(`Requesting payment with URL: ${paymentUrl}`);

      const res = await axios.get(paymentUrl);

      if (res.data.status === "success" && res.data.data.success) {
        const { merchantTransactionId, instrumentResponse } =
          res.data.data.data;
        const redirectUrl = instrumentResponse.redirectInfo.url;

        console.log("Payment Initiation Response:", res.data);

        // Redirect to payment gateway
        window.location.href = redirectUrl;

        // After successful payment, user will be redirected, and you can use `merchantTransactionId`
      } else {
        console.error(
          "Error in payment initiation or redirect URL not found:",
          res.data
        );
        toast.error("Payment initiation failed. Please try again.");
      }
    } catch (err) {
      console.error(
        "Error during payment:",
        err.response ? err.response.data : err
      );
      toast.error("An error occurred during payment. Please try again.");
    }
  };

  return (
    <section className="plans__container mt-[80px]">
      <ToastContainer />
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div className="plans">
          <div className="planItem__container">
            {Object.keys(selectedPlanTypes).map((planName) => {
              const plan = plans.find(
                (p) =>
                  p.name === planName && p.type === selectedPlanTypes[planName]
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
                        onClick={() => handlePlanTypeChange(planName, "yearly")}
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
                        <li className={plan.name === "Basic" ? "disabled" : ""}>
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
      )}
      {isModalOpen && selectedPlan && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2>Confirm Your Plan</h2>
            <p>
              <strong>Plan Name:</strong> {selectedPlan.name}
            </p>
            <p>
              <strong>Plan Type:</strong> {selectedPlan.planType}
            </p>
            <p>
              <strong>Actual Price:</strong> ₹{selectedPlan.price}
            </p>
            <p>
              <strong>Offer Price:</strong> ₹{selectedPlan.offerprice}
            </p>
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
