import React, { useState, useRef } from 'react';
import './styles.css'; // Ensure to import your CSS here

const FAQAccordion = () => {
  const accordionsData = [
    {
      question: 'What is the purpose of this pen?',
      answer: 'This pen is designed to provide web developers with boilerplate code for a FAQ Accordion.'
    },
    {
      question: 'What is an accordion?',
      answer: 'An accordion is a vertically stacked list of headers that users can click on to reveal more information about a business. With an accordion, when someone visits your web page, they will see a list of headers.'
    },
    {
      question: 'How can I customize the accordion?',
      answer: 'You can customize the accordion by modifying the CSS styles and changing the HTML structure as per your needs. You can also add JavaScript to enhance its functionality.'
    },
    {
      question: 'Is this accordion responsive?',
      answer: 'Yes, this accordion is designed to be responsive and will adjust its layout based on the screen size to ensure a good user experience on both desktop and mobile devices.'
    },
    {
      question: 'Can I use this accordion in my project?',
      answer: 'Absolutely! Feel free to use this accordion in your projects. You can modify and adapt it as needed to fit your requirements.'
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
