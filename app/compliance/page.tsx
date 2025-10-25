import {
  Award,
  CheckCircle,
  FileText,
  Lock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getComplianceItems, getSecurityFeatures } from "@/lib/services/compliance";
import { renderIcon } from "@/lib/utils/icon-mapper";

export const metadata = {
  title: "Compliance & Security - FinWage",
  description: "FinWage is fully compliant with all federal and state regulations. SOC 2 certified, AML compliant, and GDPR compliant.",
  keywords: ["compliance", "security", "SOC 2", "AML", "GDPR", "data protection"],
  openGraph: {
    title: "Compliance & Security - FinWage",
    description: "Bank-level security and full regulatory compliance.",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function CompliancePage() {
  const [complianceResult, securityFeatures] = await Promise.all([
    getComplianceItems({ perPage: 20 }),
    getSecurityFeatures({ perPage: 50 }),
  ]);

  const complianceItems = complianceResult.items;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Your Trust is Our Priority</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Compliance & Security
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Enterprise-grade security and full regulatory compliance. Your
              data and money are always protected.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Compliance Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards of regulatory compliance and
              data security to protect both employers and employees
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {complianceItems.length > 0 ? (
              complianceItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 border-0"
                >
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1d44c3] rounded-full text-white mb-6">
                      {renderIcon(item.icon, "w-8 h-8")}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                    <ul className="space-y-3">
                      {Array.isArray(item.details) && item.details.map((detail: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600 text-lg">
                  Compliance information is currently being updated. Please check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Bank-Level Security
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                FinWage employs the same security measures used by major
                financial institutions to protect your sensitive information and
                transactions.
              </p>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Security Certifications
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      name: "SOC 2 Type II",
                      icon: <Award className="w-6 h-6" />,
                    },
                    { name: "ISO 27001", icon: <Award className="w-6 h-6" /> },
                    { name: "PCI DSS", icon: <Award className="w-6 h-6" /> },
                    { name: "GDPR Ready", icon: <Award className="w-6 h-6" /> },
                  ].map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-center gap-3 bg-blue-50 rounded-lg p-4"
                    >
                      <div className="text-[#1d44c3]">{cert.icon}</div>
                      <span className="font-semibold text-gray-900">
                        {cert.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Security Features
              </h3>
              <div className="space-y-4">
                {securityFeatures.length > 0 ? (
                  securityFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature.description}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">
                    Security features information is currently being updated.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-[#1d44c3] to-[#0d2463] rounded-3xl p-8 md:p-16 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Your Data is Safe With Us
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed mb-6">
                  We understand that you're trusting us with sensitive employee
                  and payroll information. That's why we've built security and
                  compliance into every aspect of our platform.
                </p>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Our dedicated security team works 24/7 to monitor systems,
                  respond to threats, and ensure your data remains protected at
                  all times.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-start gap-4">
                    <Lock className="w-8 h-8 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-lg mb-2">For HR Teams</div>
                      <p className="text-blue-100">
                        Complete audit trails, role-based access controls, and
                        compliance reporting tools
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-lg mb-2">
                        For Employees
                      </div>
                      <p className="text-blue-100">
                        Your personal and financial information is encrypted and
                        never shared without consent
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-start gap-4">
                    <FileText className="w-8 h-8 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-lg mb-2">
                        Transparent Policies
                      </div>
                      <p className="text-blue-100">
                        Clear privacy policies and terms of service with no
                        hidden clauses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Notes */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Regulatory Information
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  State Licensing
                </h3>
                <p className="text-gray-600">
                  FinWage is licensed as a money transmitter in all states where
                  required. We maintain active licenses and comply with all
                  state-specific regulations regarding wage access services.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Consumer Protection
                </h3>
                <p className="text-gray-600">
                  We adhere to all consumer financial protection regulations,
                  including truth-in-lending requirements and fair debt
                  collection practices. FinWage does not charge interest or fees
                  to employees.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Data Privacy
                </h3>
                <p className="text-gray-600">
                  Our platform is fully compliant with GDPR, CCPA, and other
                  data privacy regulations. We provide users with complete
                  control over their data, including the right to access,
                  correct, and delete personal information.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Third-Party Audits
                </h3>
                <p className="text-gray-600">
                  FinWage undergoes regular independent security audits and
                  penetration testing. Our SOC 2 Type II certification is
                  renewed annually through comprehensive audits by certified
                  public accounting firms.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Have questions about our compliance or security practices?
              </p>
              <Button
                type="button"
                className="text-[#1d44c3] font-semibold hover:underline"
                variant="link"
              >
                Contact Our Compliance Team →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Security You Can Trust
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who trust FinWage with their payroll
            data and employee information
          </p>
          <Button
            type="button"
            className="bg-[#1d44c3] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0d2463] transition-all shadow-lg"
          >
            Schedule Security Overview
          </Button>
        </div>
      </section>
    </main>
  );
}
