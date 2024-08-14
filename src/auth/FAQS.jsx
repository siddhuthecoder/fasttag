import React, { useState, useRef } from 'react';
import './styles.css'; // Ensure to import your CSS here

const FAQAccordion = () => {
  const accordionsData = [
    {
      question: '1. What is Fastag Vehicle Tracking and How Does It Work?',
      answer: 'Fastag Vehicle Tracking is a cutting-edge system designed to track transport vehicles in India as they pass through toll plazas equipped with Fastag technology. Each time a transport vehicle crosses a toll plaza, data is recorded and saved, allowing you to track vehicle locations for the last 3 days. This system is specifically tailored for transport vehicle tracking and does not support personal vehicles.'
    },
    {
      question: '2. How Can I Track My Transport Vehicle\'s Toll Plaza Crossings?',
      answer: 'To track your transport vehicle\'s location, simply enter the vehicle number in our Fastag tracking system. You\'ll receive accurate information about the toll plazas your vehicle has crossed in the last 3 days. This vehicle number tracking service is available exclusively for transport vehicles.'
    },
    {
      question: '3. What Information Can I Access with the Vahan Portal?',
      answer: 'The Vahan Portal allows you to access comprehensive vehicle information related to transport vehicles, including registration details, owner information, insurance status, and other legal documents. Just enter your transport vehicle number to check vehicle documents quickly and easily.'
    },
    {
      question: '4. How Do I Verify Transport Vehicle Documents Using the Vahan Portal?',
      answer: 'To check vehicle documents for your transport vehicle, enter the vehicle number into the Vahan Portal on our platform. This will display all the necessary vehicle-related information you need for compliance and verification purposes.'
    },
    {
      question: '5. Can I Verify a Driver\'s License?',
      answer: 'Yes, our platform allows you to verify a driver’s license using the SARATHI Portal. By entering the driver\'s license number and date of birth, you can access detailed information about the license holder. This driver license verification service is essential for managing your transport fleet.'
    },
    {
      question: '6. What is the SARATHI Portal and How Does It Help with Driver Verification?',
      answer: 'The SARATHI Portal is a government-run service that provides detailed information about driving licenses. By entering the driver’s license number and date of birth, you can verify the authenticity of the license, check its validity, and view the license holder’s details. This is particularly useful for fleet managers overseeing transport vehicles.'
    },
    {
      question: '7. Is the Tracking Data in Real-Time?',
      answer: 'Our Fastag vehicle tracking system updates data as transport vehicles pass through toll plazas. While the data provides near-real-time updates, it’s most effective for tracking the last 3 days of toll plaza crossings. This system is optimized for accurate and reliable transport vehicle tracking.'
    },
    {
      question: '8. How Accurate is the Location Data from Fastag Tracking?',
      answer: 'The location data provided by our Fastag tracking system is highly accurate as it captures information each time a transport vehicle crosses a toll plaza. This ensures reliable tracking of your transport fleet across India’s toll network.'
    },
    {
      question: '9. Can I Track Multiple Transport Vehicles?',
      answer: 'Yes, you can track any transport vehicle as long as it is equipped with a Fastag. Simply enter the vehicle number into our system to get the latest toll crossing data. Please note that our services are exclusively for transport vehicle tracking.'
    },
    {
      question: '10. How Do I Access the Vahan and SARATHI Portals for Free Tracking?',
      answer: 'You can access both the Vahan and SARATHI Portals through our platform by entering the required details—vehicle number for Vahan vehicle information, and driving license number and date of birth for SARATHI driving license check. This free tracking service is designed to make fleet management easier and more efficient.'
    },
    {
      question: '11. Is My Data Secure When Using These Services?',
      answer: 'Absolutely. We prioritize the security and privacy of your data. All the information accessed through the Vahan and SARATHI portals, as well as our Fastag tracking system, is handled securely in compliance with government regulations. Our services are tailored for transport vehicles, ensuring that all data remains protected.'
    },
    {
      question: '12. What Should I Do If I Encounter Issues with Tracking or Accessing Information?',
      answer: 'If you experience any issues with our vehicle tracking or information access services, our customer support team is available to assist you. We are dedicated to resolving any issues promptly to ensure smooth operation of your transport fleet.'
    },
    {
      question: '13. Is This Service Available for Personal Vehicles?',
      answer: 'No, our Fastag vehicle tracking and related services are specifically designed for tracking and managing transport vehicles. Personal vehicles are not supported by this platform.'
    },
    {
      question: '14. Can I Track a Vehicle\'s Toll Plaza Crossings Beyond the Last 3 Days?',
      answer: 'Currently, our service allows you to access Fastag toll history for the last 3 days. We are exploring options to expand this tracking window in the future, depending on user demand and technological advancements.'
    },
    {
      question: '15.  Do I Need to Install Any Software to Use These Services?',
      answer: 'No, there is no need to install any software. Our services are fully accessible through any web browser on an internet-connected device. This allows you to manage vehicle tracking and access important vehicle information for transport vehicles effortlessly.'
    }
  ];


  return (
    <div className="container">
      <div className="accordion__wrapper">
        <h1 className="accordion__title">Frequently Asked Questions</h1>
        {accordionsData.map((accordion, index) => (
          <Accordion key={index} accordion={accordion} />
        ))}
      </div>
    </div>
  );
};

const Accordion = ({ accordion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion__header" onClick={toggleAccordion}>
        <h2 className="accordion__question">{accordion.question}</h2>
        <span className="accordion__icon">
          <i className={isOpen ? 'ri-subtract-fill' : 'ri-add-line'}></i>
        </span>
      </div>
      <div
        className="accordion__content"
        ref={contentRef}
        style={{
          height: isOpen ? contentRef.current.scrollHeight + 'px' : '0px'
        }}
      >
        <p className="accordion__answer">{accordion.answer}</p>
      </div>
    </div>
  );
};

export default FAQAccordion;
