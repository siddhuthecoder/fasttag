import React, { useState, useEffect } from "react";
import "./price.css";
import axios from "axios";

const Price = () => {
  const [monthlyPrices, setMonthlyPrices] = useState([]);
  const [yearlyPrices, setYearlyPrices] = useState([]);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fastagtracking.com/customulip/plans");
        const data = await response.json();

        const monthly = data.filter((plan) => plan.type === "monthly");
        const yearly = data.filter((plan) => plan.type === "yearly");

        setMonthlyPrices(monthly);
        setYearlyPrices(yearly);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleChange = (event) => {
    setIsYearly(event.target.checked);
  };

  const prices = isYearly ? yearlyPrices : monthlyPrices;

  const calculateDiscount = (actualPrice, offerPrice) => {
    const discount = ((actualPrice - offerPrice) / actualPrice) * 100;
    return Math.round(discount);
  };

  const handleGetStarted = async (planName) => {
    const planType = isYearly ? "Yearly" : "Monthly";
    alert(`Plan: ${planName}, Type: ${planType}`);
  //  alert( process.env.REACT_APP_RAZORPAY_KEY_ID)
  //  console.log(process.env);

    if (window.confirm("Are you sure you want to buy this item?")) {
      try {
        const token = "your_token"; // Replace with your authentication token
        const product = prices.find((plan) => plan.name === planName); // Get the selected plan
        console.log(product);
        
        const {
          data: { order },
        } = await axios.post(
          `http://localhost:5001/orders/payment`,
          { planId: product._id },
          {
            headers: {
             
            },
          }
        );

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: product.name,
          description: product.description,
          order_id: order.id,
          handler: async function (response) {
            try {
              const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/orders`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  order_id: order.id,
                  totalPrice: order.amount,
                  razorpay_signature: response.razorpay_signature,
                  products: product
                },
              );

              alert(res.data.message || "Order Received!");
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
      <div className="toggle-container">
        <label
          className={`toggler ${isYearly ? "toggler--is-active" : ""}`}
          htmlFor="switcher"
        >
          Yearly
        </label>
        <div className="toggle">
          <input
            type="checkbox"
            id="switcher"
            className="check"
            checked={isYearly}
            onChange={handleToggleChange}
          />
          <b className="b switch"></b>
        </div>
        <label
          className={`toggler ${!isYearly ? "toggler--is-active" : ""}`}
          htmlFor="switcher"
        >
          Monthly
        </label>
      </div>

      <div className="plans">
        <div className="planItem__container">
          {prices.map((plan) => {
            const discountPercentage = calculateDiscount(plan.price, plan.offerprice);
            return (
              <div
                key={plan._id}
                className={`planItem planItem--${plan.name === "Premium" ? "entp" : ""}`}
              >
                <div className="card">
                  <div className="card__header">
                    <div
                      className={`card__icon ${
                        plan.name === "Basic"
                          ? "symbol symbol--rounded"
                          : plan.name === "Standard"
                          ? "symbol"
                          : ""
                      }`}
                    ></div>
                    <h2>{plan.name}</h2>
                    {discountPercentage > 0 && (
                      <div className="discount-badge">{discountPercentage}% OFF</div>
                    )}
                  </div>
                  <div className="card__desc">
                    Actual Price <span className="actual-price">₹{plan.price}</span>
                  </div>
                </div>
                <div className="price">
                  ₹{plan.offerprice}
                  <span className="spann">/ {isYearly ? "year" : "month"}</span>
                </div>
                <ul className="featureList">
                  <li>Upto {plan.apiHitLimit} FASTAG API hits</li>
                  <li>Upto {plan.apiHitLimit} VAHAN API hits</li>
                  <li>Upto {plan.apiHitLimit} SARATHI API hits</li>
                  <li className={plan.name === "Basic" ? "disabled" : ""}>
                    API for ERP and SAP
                  </li>
                </ul>
                <button
                  className="button button--blue"
                  onClick={() => handleGetStarted(plan.name)}
                >
                  <span className="text-white">Get Started</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Price;
