import React, { useState } from "react";
import "./price.css";

const Price = () => {
  const monthlyPrices = [10, 18, 100];
  const yearlyPrices = monthlyPrices.map(price => price * 12);

  const [isYearly, setIsYearly] = useState(false);

  const prices = isYearly ? yearlyPrices : monthlyPrices;

  return (
    <section className="plans__container mt-[80px]">
      {/* Toggle Button */}
      <div className="toggle-container">
        <button 
          className={`toggle-button ${isYearly ? 'active' : ''}`} 
          onClick={() => setIsYearly(!isYearly)}>
          {isYearly ? "Switch to Monthly" : "Switch to Yearly"}
        </button>
      </div>

      <div className="plans">
        <div className="planItem__container">
          {/* Free plan */}
          <div className="planItem planItem--free">
            <div className="card">
              <div className="card__header">
                <div className="card__icon symbol symbol--rounded"></div>
                <h2>Basic</h2>
              </div>
              <div className="card__desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              </div>
            </div>
            <div className="price">
              ₹{prices[0]}<span className="spann">/ {isYearly ? "year" : "month"}</span>
            </div>
            <ul className="featureList">
              <li>Upto 1000 Fastag API hits</li>
              <li>Upto 1000 Sarathi API hits</li>
              <li>Upto 1000 Vahan API hits</li>
              <li className="disabled">API for ERP and SAP</li>
            </ul>
            <button className="button white bg-[#5E81F4]" style={{ color: "white" }}>
              Get Started
            </button>
          </div>

          {/* Standard plan */}
          <div className="planItem planItem--entp bg-[#5E81F4]" style={{ backgroundColor: "#5E81F4" }}>
            <div className="card__header">
              <div className="card__icon"></div>
              <h2 className="text-white font-semibold text-2xl">Standard</h2>
            </div>
            <div className="card">
              <div className="card__desc">
                Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              </div>
            </div>
            <div className="price custom">₹{prices[1]}<span className="spanwhite">/ {isYearly ? "year" : "month"}</span></div>
            <ul className="featureList">
              <li>Upto 1000 Fastag API hits</li>
              <li>Upto 1000 Sarathi API hits</li>
              <li>Upto 1000 Vahan API hits</li>
              <li>API for ERP and SAP</li>
            </ul>
            <button className="button button--white">Get Started</button>
          </div>

          {/* Premium plan */}
          <div className="planItem planItem--pro">
            <div className="card">
              <div className="card__header">
                <div className="card__icon symbol"></div>
                <h2>Premium</h2>
              </div>
              <div className="card__desc">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </div>
            </div>
            <div className="price">
              ₹{prices[2]}<span className="spann">/ {isYearly ? "year" : "month"}</span>
            </div>
            <ul className="featureList">
              <li>Unlimited Fastag API hits</li>
              <li>Unlimited Sarathi API hits</li>
              <li>Unlimited Vahan API hits</li>
              <li>API for ERP and SAP</li>
            </ul>
            <button className="button button--pink">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Price;
