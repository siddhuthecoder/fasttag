import React, { useState, useEffect } from "react";
import "./price.css";

const Price = () => {
  const [monthlyPrices, setMonthlyPrices] = useState([]);
  const [yearlyPrices, setYearlyPrices] = useState([]);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fastagtracking.com/customulip/plans");
        const data = await response.json();
        
        // Separate monthly and yearly plans
        const monthly = data.filter(plan => plan.type === "monthly");
        const yearly = data.filter(plan => plan.type === "yearly");

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

  return (
    <section className="plans__container mt-[80px]">
      {/* Toggle Button */}
      {/* <div className="toggle-container">
        <button 
          className={`toggle-button ${isYearly ? 'active' : ''}`} 
          onClick={() => setIsYearly(!isYearly)}>
          {isYearly ? "Switch to Monthly" : "Switch to Yearly"}
        </button>
      </div> */}

<div className="toggle-container">
        <label className={`toggler ${isYearly ? 'toggler--is-active' : ''}`} htmlFor="switcher">Yearly</label>
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
        <label className={`toggler ${!isYearly ? 'toggler--is-active' : ''}`} htmlFor="switcher">Monthly</label>
      </div>


      <div className="plans">
        <div className="planItem__container">
          {prices.map((plan, index) => (
            <div key={plan._id} className={`planItem planItem--${plan.name.toLowerCase()}`}>
              <div className="card">
                <div className="card__header">
                <div className={`card__icon ${plan.name === "Basic" ? "symbol symbol--rounded" : plan.name === "Standard" ? "symbol" : "symbol"}`}></div>
                  <h2>{plan.name}</h2>
                </div>
                <div className="card__desc">
                 Offer Price {plan.offerprice } 
                </div>
              </div>
              <div className="price">
                ₹{plan.price}<span className="spann">/ {isYearly ? "year" : "month"}</span>
              </div>
              <ul className="featureList">
                <li>Upto {plan.apiHitLimit} FASTAG API hits</li>
                <li>Upto {plan.apiHitLimit} VAHAN API hits</li>
                <li>Upto {plan.apiHitLimit} SARATHI API hits</li>
                <li className={plan.name === "Basic" ? "disabled" : ""}>API for ERP and SAP</li>
              </ul>
              <button className={`button button--blue`}>
               <span className="text-white">Get Started</span> 
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Price;
