import { useState } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi"; // Import copy icon from React Icons

const RadiologyForm = () => {
  console.log("🚀 UI is Updating! Latest Code is Running."); // Debugging Log

  const [findings, setFindings] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [impression, setImpression] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to copy text
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDiagnosis(""); // Reset previous data
    setImpression("");

    try {
      const response = await axios.post("https://ai-radiology-backend.onrender.com", {
        findings,
      });

      if (response.data) {
        setDiagnosis(response.data.differential_diagnosis || "No data received");
        setImpression(response.data.concise_impression || "No data received");
      } else {
        setError("Error: No response from server.");
      }
    } catch (err) {
      setError("Error fetching AI-generated report.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6 relative">
      {/* App Title */}
      <h1 className="text-4xl font-bold text-blue-700">Smart AI for Imaging</h1>
      <p className="text-lg font-semibold text-gray-700 mt-1">AI Radiology Assistant</p>

      {/* Form Section */}
      <div className="w-full max-w-2xl mt-6">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="text-lg font-semibold text-left block mb-1">Findings</label>
            <textarea
              className="w-full p-3 border border-gray-400 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter radiology findings..."
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Generate Report"}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Results Section (Only displayed when data is received) */}
      {(diagnosis || impression) && (
        <div className="grid grid-cols-2 gap-6 mt-8 max-w-3xl">
          {/* Concise Impression Box */}
          <div className="relative w-full">
            <label className="text-lg font-semibold block">Concise Impression</label>
            <textarea
              className="w-full h-24 p-3 border border-gray-400 rounded-md bg-gray-100"
              value={impression}
              readOnly
            />
            <button
              className="absolute top-8 right-2 bg-blue-500 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-600 transition"
              onClick={() => copyToClipboard(impression)}
            >
              <FiCopy className="mr-2" /> Copy
            </button>
          </div>

          {/* Differential Diagnosis Box */}
          <div className="relative w-full">
            <label className="text-lg font-semibold block">Differential Diagnosis</label>
            <textarea
              className="w-full h-24 p-3 border border-gray-400 rounded-md bg-gray-100"
              value={diagnosis}
              readOnly
            />
            <button
              className="absolute top-8 right-2 bg-blue-500 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-600 transition"
              onClick={() => copyToClipboard(diagnosis)}
            >
              <FiCopy className="mr-2" /> Copy
            </button>
          </div>
        </div>
      )}

      {/* Footer with Developer Name */}
      <p className="text-gray-600 text-sm mt-10 italic absolute bottom-4 right-6">
        Developed by Sai Krishna
      </p>
    </div>
  );
};

export default RadiologyForm;
