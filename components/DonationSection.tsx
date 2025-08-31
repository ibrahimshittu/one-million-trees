"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, TreePine } from "lucide-react";
import { motion } from "framer-motion";

export default function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const presetAmounts = [5000, 10000, 25000, 50000];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomInput = (value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    if (value) {
      setSelectedAmount(parseInt(value));
    }
  };

  const handleDonation = () => {
    const amount = isCustom ? parseInt(customAmount) : selectedAmount;
    console.log("Processing donation for amount:", amount);
  };

  return (
    <section
      id="donate"
      className="py-32 bg-gradient-to-b from-white via-green-50/50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Support Our Mission
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Plant Trees, Transform Lives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every donation directly funds tree planting across Nigeria. Choose
            an amount that matches your commitment to environmental restoration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                SELECT DONATION AMOUNT
              </h3>
              <p className="text-gray-600 text-center text-xs">
                Every ₦5,000 plants one tree
              </p>
            </div>

            <div className="space-y-3">
              {/* Preset Amount Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {presetAmounts.slice(0, 2).map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-3 rounded-lg border-2 text-base font-bold transition-all duration-300 ${
                      selectedAmount === amount && !isCustom
                        ? "border-green-500 bg-green-50 text-green-700 shadow-md scale-105"
                        : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm text-gray-700"
                    }`}
                  >
                    ₦{(amount / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAmountSelect(presetAmounts[2])}
                  className={`p-3 rounded-lg border-2 text-base font-bold transition-all duration-300 ${
                    selectedAmount === presetAmounts[2] && !isCustom
                      ? "border-green-500 bg-green-50 text-green-700 shadow-md scale-105"
                      : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm text-gray-700"
                  }`}
                >
                  ₦{(presetAmounts[2] / 1000).toFixed(0)}k
                </button>
                <button
                  onClick={() => handleAmountSelect(presetAmounts[3])}
                  className={`p-3 rounded-lg border-2 text-base font-bold transition-all duration-300 ${
                    selectedAmount === presetAmounts[3] && !isCustom
                      ? "border-green-500 bg-green-50 text-green-700 shadow-md scale-105"
                      : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm text-gray-700"
                  }`}
                >
                  ₦{(presetAmounts[3] / 1000).toFixed(0)}k
                </button>
              </div>

              {/* Other Amount Button */}
              <button
                onClick={() => {
                  setIsCustom(true);
                  setCustomAmount("25000");
                  setSelectedAmount(25000);
                }}
                className={`w-full p-3 rounded-lg border-2 text-base font-semibold transition-all duration-300 ${
                  isCustom
                    ? "border-green-500 bg-green-50 text-green-700 shadow-md"
                    : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm text-gray-700"
                }`}
              >
                Other
              </button>

              {/* Custom Amount Input */}
              <div className="relative">
                <div className="flex rounded-lg border-2 border-gray-300 bg-white overflow-hidden shadow-sm">
                  <div className="flex items-center justify-center px-3 bg-gray-50 border-r-2 border-gray-300">
                    <span className="text-base font-bold text-gray-600">₦</span>
                  </div>
                  <input
                    type="number"
                    value={isCustom ? customAmount : selectedAmount}
                    onChange={(e) => handleCustomInput(e.target.value)}
                    onFocus={() => setIsCustom(true)}
                    className="flex-1 px-3 py-3 text-base font-bold text-gray-700 bg-transparent border-none outline-none"
                    placeholder="5000"
                    min="5000"
                    step="5000"
                  />
                  <div className="flex items-center justify-center px-3 bg-gray-50 border-l-2 border-gray-300">
                    <span className="text-xs font-semibold text-gray-600">
                      NGN
                    </span>
                  </div>
                </div>
              </div>

              {/* Impact Display */}
              {selectedAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Your Impact</p>
                      <p className="text-base font-bold text-green-700">
                        {Math.floor(selectedAmount / 5000)} Tree
                        {Math.floor(selectedAmount / 5000) !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <TreePine className="w-6 h-6 text-green-600" />
                  </div>
                </motion.div>
              )}

              {/* Donate Button */}
              <Button
                onClick={handleDonation}
                className="w-full h-10 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-base font-bold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                disabled={!selectedAmount || selectedAmount <= 0}
              >
                <TreePine className="w-4 h-4 mr-2" />
                DONATE
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure Payment Processing
          </div>
          <p className="text-sm text-gray-500">
            All donations are secure and come with a digital certificate
          </p>
        </motion.div>
      </div>
    </section>
  );
}
