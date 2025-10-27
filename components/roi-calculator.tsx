"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ROICalculator() {
  const [employees, setEmployees] = useState<number>(100);
  const [turnoverRate, setTurnoverRate] = useState<number>(15);
  const [costPerHire, setCostPerHire] = useState<number>(4000);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    setShowResults(true);
  };

  // Calculate metrics
  const employeesLeavingPerYear = Math.round((employees * turnoverRate) / 100);
  const totalReplacementCost = employeesLeavingPerYear * costPerHire;
  const retentionImprovement = Math.round(totalReplacementCost * 0.27); // 27% reduction in turnover
  const productivityGain = Math.round((employees * costPerHire * 0.21) / 100); // 21% productivity increase
  const totalAnnualSavings = retentionImprovement + productivityGain;
  const monthlyImplementationCost = Math.round(employees * 2); // Example: $2 per employee per month
  const annualImplementationCost = monthlyImplementationCost * 12;
  const netAnnualSavings = totalAnnualSavings - annualImplementationCost;
  const roiPercentage = Math.round(
    (netAnnualSavings / annualImplementationCost) * 100,
  );
  const paybackPeriodMonths =
    Math.round((annualImplementationCost / (totalAnnualSavings / 12)) * 10) /
    10;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
        <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
          <div>
            <Label
              htmlFor="num-employees"
              className="block text-sm font-semibold mb-2"
            >
              Number of Employees
            </Label>
            <Input
              id="num-employees"
              type="number"
              min="1"
              max="100000"
              value={employees}
              onChange={(e) =>
                setEmployees(Math.max(1, parseInt(e.target.value) || 0))
              }
              className="w-full"
            />
          </div>
          <div>
            <Label
              htmlFor="turnover-rate"
              className="block text-sm font-semibold mb-2"
            >
              Current Turnover Rate (%)
            </Label>
            <Input
              id="turnover-rate"
              type="number"
              min="0"
              max="100"
              value={turnoverRate}
              onChange={(e) =>
                setTurnoverRate(
                  Math.max(0, Math.min(100, parseInt(e.target.value) || 0)),
                )
              }
              className="w-full"
            />
          </div>
          <div>
            <Label
              htmlFor="cost-per-hire"
              className="block text-sm font-semibold mb-2"
            >
              Avg. Cost Per Hire ($)
            </Label>
            <Input
              id="cost-per-hire"
              type="number"
              min="0"
              max="100000"
              value={costPerHire}
              onChange={(e) =>
                setCostPerHire(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-full"
            />
          </div>
        </div>

        <Button
          onClick={calculateROI}
          className="w-full bg-white text-[#1d44c3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
        >
          Calculate My Savings
        </Button>

        {showResults && (
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  ${totalAnnualSavings.toLocaleString()}
                </div>
                <div className="text-blue-100 text-sm">Annual Savings</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {roiPercentage}%
                </div>
                <div className="text-blue-100 text-sm">ROI</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {paybackPeriodMonths}
                </div>
                <div className="text-blue-100 text-sm">Payback (Months)</div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-blue-100">
              <div className="flex justify-between">
                <span>Employees Leaving Annually:</span>
                <span className="font-semibold">{employeesLeavingPerYear}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Replacement Cost:</span>
                <span className="font-semibold">
                  ${totalReplacementCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Retention Savings (27%):</span>
                <span className="font-semibold text-green-300">
                  +${retentionImprovement.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Productivity Gain (21%):</span>
                <span className="font-semibold text-green-300">
                  +${productivityGain.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/20">
                <span>Annual FinWage Cost:</span>
                <span className="font-semibold">
                  -${annualImplementationCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/20">
                <span>Net Annual Savings:</span>
                <span className="text-green-300">
                  ${netAnnualSavings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {!showResults && (
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm text-blue-100">
              Most companies see positive ROI within the first 3 months
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
