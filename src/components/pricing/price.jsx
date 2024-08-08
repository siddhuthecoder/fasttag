import React from "react";
import "./price.css";
import { GrCube } from "react-icons/gr";
import { FaCubes } from "react-icons/fa";
import { MdCurrencyBitcoin } from "react-icons/md";




const Price = () => {
  return (
    <section className="plans__container mt-[80px] ">
      <div className="plans">

        <div className="planItem__container">
          {/* Free plan starts */}
          <div className="planItem planItem--free">
            <div className="card">
            <div class="card__header">
                <div class="card__icon symbol symbol--rounded"></div>
                <h2>Basic</h2>
              </div>
              <div className="card__desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              </div>
            </div>

            <div className="price">
              $0<span>/ month</span>
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
          {/* Free plan ends */}

          {/* Standard plan starts */}
          <div className="planItem planItem--entp bg-[#5E81F4] " style={{
            backgroundColor:"#5E81F4"
          }}>
             <div class="card__header">
                <div class="card__icon"></div>
                <h2 className="text-white font-semibold text-2xl">Standartad</h2>
             
              </div>
            <div className="card">
              <div className="card__desc">
                Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              </div>
            </div>

            <div className="price">Let's Talk</div>

            <ul className="featureList">
              <li>Upto 1000 Fastag API hits</li>
              <li>Upto 1000 Sarathi API hits</li>
              <li>Upto 1000 Vahan API hits</li>
              <li>API for ERP and SAP</li>
            </ul>

            <button className="button button--white">Get Started</button>
          </div>
          {/* Standard plan ends */}

          {/* Premium plan starts */}
          <div className="planItem planItem--pro">
            <div className="card">
            <div class="card__header">
                <div class="card__icon symbol"></div>
                <h2>Premeium</h2>
                
              </div>
              <div className="card__desc">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris
              </div>
            </div>

            <div className="price">
              $18<span>/ month</span>
            </div>

            <ul className="featureList">
              <li>Unlimited Fastag API hits</li>
              <li>Unlimited Sarathi API hits</li>
              <li>Unlimited Vahan API hits</li>
              <li>API for ERP and SAP</li>
            </ul>

            <button className="button button--pink">Get Started</button>
          </div>
          {/* Premium plan ends */}
        </div>
      </div>
    </section>
  );
};

export default Price;
