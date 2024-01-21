
import React from 'react'
import {Navigate} from "react-router-dom"
const Home = () => {

  return (
    <div className="bg-gray-900 dark:bg-black h-screen text-white font-sans">
      <header className="flex justify-between items-center py-4 px-8 bg-gray-800 dark:bg-gray-900">
        <h1 className="text-3xl font-bold">ChatApp</h1>
        <nav>
          {/* Add navigation links or buttons here */}
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center h-[85%]">
        <section className="text-center py-16">
          <h2 className="text-5xl font-semibold mb-6">Connect with Friends, Anytime, Anywhere</h2>
          <p className="text-lg mb-8">Experience seamless communication with ChatApp.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Get Started
            <Navigate to="/chatApp"/>
          </button>
        </section>

        <section className="flex justify-center items-center flex-col py-16">
          {/* <img src={ChatIcon} alt="Chat Icon" className="w-32 h-32 mb-6" /> */}
          <h3 className="text-3xl font-semibold mb-4">Messaging Redefined</h3>
          <p className="text-lg text-center mb-8">
            ChatApp provides a smooth messaging experience with advanced features.
          </p>
        </section>

        <section className="flex justify-center items-center flex-col py-16">
          {/* Add another section with relevant information */}
        </section>
      </main>

      <footer className="text-center py-4 bg-gray-800 dark:bg-gray-900">
        <p className="text-sm">&copy; 2023 ChatApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home