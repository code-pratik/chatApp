import React from "react";

function IncomingCallNotification({ answerCall, rejectCall }) {
  const redirectToVideoScreen = () => {
    console.log("Redirecting to video screen...");
    answerCall();
  };

  const goBack = () => {
    console.log("Going back...");
    rejectCall();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative overflow-hidden">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Incoming Video Call</h2>
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
              <img
                src="https://placekitten.com/100/100" // Add the caller's profile image source
                alt="Caller"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300"
              onClick={redirectToVideoScreen}
            >
              Answer
            </button>
            <button
              className="px-6 py-3 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300"
              onClick={goBack}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomingCallNotification;
