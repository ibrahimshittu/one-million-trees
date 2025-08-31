"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { donationTiers } from "@/data/mockTrees";
import {
  Check,
  TreePine,
  Award,
  Users,
  Sparkles,
  Heart,
  Leaf,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DonationSection() {
  const [selectedTier, setSelectedTier] = useState("grove");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonation = (tierId: string) => {
    console.log("Processing donation for tier:", tierId);
    setSelectedTier(tierId);
  };

  const getTierIcon = (trees: number) => {
    if (trees === 1) return <Leaf className="w-6 h-6" />;
    if (trees === 5) return <TreePine className="w-6 h-6" />;
    if (trees === 15) return <Users className="w-6 h-6" />;
    return <Award className="w-6 h-6" />;
  };

  const getTierColor = (tierId: string) => {
    const colors = {
      seedling: "from-emerald-400 to-green-600",
      grove: "from-green-500 to-green-700",
      forest: "from-green-600 to-emerald-800",
      ecosystem: "from-gradient-to-r from-yellow-600 to-green-700",
    };
    return colors[tierId as keyof typeof colors] || colors.seedling;
  };

  return (
    <section
      id="donate"
      className="py-24 bg-gradient-to-b from-white via-green-50/30 to-white"
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
            Every donation directly funds tree planting across Nigeria. Choose a
            package that matches your commitment to environmental restoration
            and community development.
          </p>
        </motion.div>

        <Tabs defaultValue="packages" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-14 p-1 bg-gray-100">
            <TabsTrigger value="packages" className="text-base font-medium">
              Donation Packages
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-base font-medium">
              Custom Amount
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {donationTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card
                    className={`relative h-full transition-all duration-300 hover:shadow-2xl border-0 shadow-lg
                      ${
                        tier.popular
                          ? "ring-2 ring-green-500 shadow-green-100 scale-105 z-10"
                          : "hover:-translate-y-2"
                      }
                      ${selectedTier === tier.id ? "ring-2 ring-green-400" : ""}
                    `}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                        <Badge className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-1.5 text-sm font-semibold shadow-lg">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-6 pt-8">
                      <div
                        className={`mx-auto mb-6 w-20 h-20 bg-gradient-to-br ${getTierColor(
                          tier.id
                        )} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                      >
                        {getTierIcon(tier.trees)}
                      </div>
                      <CardTitle className="text-2xl font-bold mb-2">
                        {tier.name}
                      </CardTitle>
                      <CardDescription className="text-base text-gray-600">
                        Plant {tier.trees} tree{tier.trees > 1 ? "s" : ""} in
                        Nigeria
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow px-6">
                      <div className="text-center mb-8">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-sm text-gray-500">₦</span>
                          <span className="text-4xl font-bold text-gray-900">
                            {(tier.price / 1000).toFixed(0)}
                          </span>
                          <span className="text-sm text-gray-500">,000</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          One-time donation
                        </p>
                      </div>

                      <Separator className="mb-6" />

                      <div className="space-y-3">
                        {tier.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <Check className="w-5 h-5 text-green-500" />
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="px-6 pb-6">
                      <Button
                        onClick={() => handleDonation(tier.id)}
                        className={`w-full h-12 text-base font-semibold transition-all
                          ${
                            tier.popular
                              ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg"
                              : selectedTier === tier.id
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-white hover:bg-gray-50 text-green-700 border-2 border-green-600"
                          }`}
                      >
                        {selectedTier === tier.id
                          ? "Selected"
                          : "Select Package"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-6 text-lg font-semibold shadow-xl"
                disabled={!selectedTier}
              >
                Proceed to Payment
              </Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="custom" className="mt-12">
            <Card className="max-w-2xl mx-auto shadow-xl border-0">
              <CardHeader className="text-center pb-8 pt-8 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Heart className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Custom Donation Amount
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Every ₦5,000 plants one tree. Choose any amount you&apos;re
                  comfortable with.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Enter Amount (₦)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                        ₦
                      </span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="0"
                        className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        min="5000"
                        step="1000"
                      />
                    </div>
                  </div>

                  {customAmount && parseInt(customAmount) >= 5000 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Your Impact
                          </p>
                          <p className="text-2xl font-bold text-green-700">
                            {Math.floor(parseInt(customAmount) / 5000)} Trees
                          </p>
                        </div>
                        <TreePine className="w-12 h-12 text-green-600" />
                      </div>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">CO₂ Offset</p>
                          <p className="font-semibold text-gray-900">
                            ~{Math.floor(parseInt(customAmount) / 5000) * 22}{" "}
                            kg/year
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Oxygen Production</p>
                          <p className="font-semibold text-gray-900">
                            ~{Math.floor(parseInt(customAmount) / 5000) * 118}{" "}
                            kg/year
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-2">
                    <p className="text-sm text-gray-600 mb-4">Quick amounts:</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[10000, 25000, 50000, 100000].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => setCustomAmount(amount.toString())}
                          className="hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-all"
                        >
                          ₦{amount / 1000}k
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-8 pb-8">
                <Button
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-lg font-semibold shadow-lg transition-all"
                  disabled={!customAmount || parseInt(customAmount) < 5000}
                >
                  Donate ₦
                  {customAmount ? parseInt(customAmount).toLocaleString() : "0"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
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
          <div className="flex justify-center items-center gap-8 opacity-50">
            <span className="text-gray-600 font-medium">Paystack</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-gray-600 font-medium">Flutterwave</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-gray-600 font-medium">Interswitch</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            All donations are tax-deductible and come with a digital certificate
          </p>
        </motion.div>
      </div>
    </section>
  );
}
