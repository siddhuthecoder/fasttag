import React from 'react';

const Policy = () => {
  return (
    <div className="p-10 max-w-4xl mx-auto bg-gradient-to-r from-white via-gray-100 to-white shadow-2xl rounded-lg mt-12">
      <h1 className="text-4xl font-extrabold mb-8 text-[#5E81F4] border-b-4 pb-3 border-[#5E81F4] shadow-md">
        Privacy Policy
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#5E81F4] hover:text-[#4a69f3] transition duration-300 ease-in-out">
          Information We Collect
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          We collect personal information such as your name, email address, and payment details when you place an order or sign up for our newsletter.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#5E81F4] hover:text-[#4a69f3] transition duration-300 ease-in-out">
          How We Use Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          We use your information to process your orders, communicate with you, and improve our services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#5E81F4] hover:text-[#4a69f3] transition duration-300 ease-in-out">
          Cookies
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          We use cookies to personalize content, analyze our traffic, and improve your browsing experience.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#5E81F4] hover:text-[#4a69f3] transition duration-300 ease-in-out">
          Data Security
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          We take precautions to protect your information both online and offline.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#5E81F4] hover:text-[#4a69f3] transition duration-300 ease-in-out">
          Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          We reserve the right to update or change our Privacy Policy at any time.
        </p>
      </section>
    </div>
  );
};

export default Policy;
