import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle, XCircle, ExternalLink, FileText, Users, GraduationCap, Briefcase } from "lucide-react";

interface FormData {
  nationality: string;
  employmentStatus: string;
  educationLevel: string;
  familySituation: string;
  purposeOfStay: string;
  duration: string;
}

interface VisaResult {
  name: string;
  eligibility: "likely" | "uncertain" | "not_eligible";
  explanation: string;
  requirements: string[];
  officialLink: string;
}

const VisaEligibilityChecker = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nationality: "",
    employmentStatus: "",
    educationLevel: "",
    familySituation: "",
    purposeOfStay: "",
    duration: ""
  });
  const [results, setResults] = useState<VisaResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 6;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      assessEligibility();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const assessEligibility = () => {
    const visaResults: VisaResult[] = [];

    // Highly Skilled Migrant Visa
    if (formData.purposeOfStay === "work" && 
        (formData.educationLevel === "masters" || formData.educationLevel === "bachelors")) {
      visaResults.push({
        name: "Highly Skilled Migrant Visa",
        eligibility: "likely",
        explanation: "You appear to meet the basic criteria for the Highly Skilled Migrant scheme based on your education and purpose.",
        requirements: [
          "Recognized sponsor employer",
          "Salary threshold: €3,909/month (under 30) or €5,331/month (30+)",
          "Relevant education credentials",
          "Employment contract"
        ],
        officialLink: "https://ind.nl/en/work/working_in_the_Netherlands/Pages/Highly-skilled-migrant.aspx"
      });
    }

    // Student Visa
    if (formData.purposeOfStay === "study") {
      visaResults.push({
        name: "Student Visa (MVV)",
        eligibility: "likely",
        explanation: "You can apply for a student visa if accepted by a Dutch educational institution.",
        requirements: [
          "Admission to recognized Dutch institution",
          "Proof of sufficient funds (€11,000+ per year)",
          "Health insurance",
          "Clean criminal record"
        ],
        officialLink: "https://ind.nl/en/study/Pages/Study-in-the-Netherlands.aspx"
      });
    }

    // Family Reunification
    if (formData.familySituation === "partner_nl" || formData.familySituation === "family_nl") {
      visaResults.push({
        name: "Family Reunification Visa",
        eligibility: "likely",
        explanation: "You may be eligible for family reunification based on your family ties in the Netherlands.",
        requirements: [
          "Family member with Dutch residence",
          "Proof of relationship",
          "Sufficient income of sponsor",
          "Suitable accommodation"
        ],
        officialLink: "https://ind.nl/en/family/Pages/Family-reunification.aspx"
      });
    }

    // Entrepreneur Visa
    if (formData.purposeOfStay === "entrepreneurship") {
      visaResults.push({
        name: "Startup Visa",
        eligibility: formData.educationLevel === "masters" ? "likely" : "uncertain",
        explanation: "You may qualify for the startup visa if you have an innovative business idea.",
        requirements: [
          "Innovative business plan",
          "Facilitator approval",
          "€4,500 in funds",
          "Relevant experience or education"
        ],
        officialLink: "https://ind.nl/en/work/working_in_the_Netherlands/Pages/Startup.aspx"
      });
    }

    // Orientation Year
    if (formData.educationLevel === "masters" && formData.purposeOfStay === "work") {
      visaResults.push({
        name: "Orientation Year for Graduates",
        eligibility: "likely",
        explanation: "Recent graduates can apply for an orientation year to search for work.",
        requirements: [
          "Graduation within 3 years",
          "Degree from top 200 university or Dutch institution",
          "Sufficient funds",
          "Health insurance"
        ],
        officialLink: "https://ind.nl/en/work/working_in_the_Netherlands/Pages/Looking-for-a-job-after-study-orientation-year.aspx"
      });
    }

    // Tourist/Short Stay
    if (formData.duration === "short" && formData.purposeOfStay === "other") {
      visaResults.push({
        name: "Short Stay (Schengen) Visa",
        eligibility: "likely",
        explanation: "For stays up to 90 days within 180 days for tourism or business.",
        requirements: [
          "Valid passport",
          "Travel insurance",
          "Proof of accommodation",
          "Return ticket"
        ],
        officialLink: "https://ind.nl/en/short-stay/Pages/Short-stay.aspx"
      });
    }

    if (visaResults.length === 0) {
      visaResults.push({
        name: "No Clear Match",
        eligibility: "uncertain",
        explanation: "Based on your inputs, we couldn't identify a clear visa pathway. Consider consulting with an immigration lawyer.",
        requirements: [
          "Consult immigration expert",
          "Review all visa categories",
          "Consider alternative pathways"
        ],
        officialLink: "https://ind.nl/en/"
      });
    }

    setResults(visaResults);
    setShowResults(true);
  };

  const getEligibilityIcon = (eligibility: string) => {
    switch (eligibility) {
      case "likely":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "uncertain":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "not_eligible":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-warning" />;
    }
  };

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility) {
      case "likely":
        return "bg-success text-success-foreground";
      case "uncertain":
        return "bg-warning text-warning-foreground";
      case "not_eligible":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-warning text-warning-foreground";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <Users className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">What is your nationality?</h3>
              <p className="text-muted-foreground">This helps determine visa requirements</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select value={formData.nationality} onValueChange={(value) => updateFormData("nationality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eu">EU/EEA Citizen</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="brazil">Brazil</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <Briefcase className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">What is your employment status?</h3>
              <p className="text-muted-foreground">Current work situation</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employment">Employment Status</Label>
              <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData("employmentStatus", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self_employed">Self-employed</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <GraduationCap className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">What is your education level?</h3>
              <p className="text-muted-foreground">Highest qualification completed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education Level</Label>
              <Select value={formData.educationLevel} onValueChange={(value) => updateFormData("educationLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phd">PhD/Doctorate</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="vocational">Vocational Training</SelectItem>
                  <SelectItem value="high_school">High School</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <Users className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">What is your family situation?</h3>
              <p className="text-muted-foreground">Family ties to the Netherlands</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="family">Family Situation</Label>
              <Select value={formData.familySituation} onValueChange={(value) => updateFormData("familySituation", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your family situation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partner_nl">Partner lives in Netherlands</SelectItem>
                  <SelectItem value="family_nl">Family members in Netherlands</SelectItem>
                  <SelectItem value="children_nl">Children in Netherlands</SelectItem>
                  <SelectItem value="none">No family ties</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <FileText className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">What is your purpose of stay?</h3>
              <p className="text-muted-foreground">Main reason for moving to Netherlands</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Stay</Label>
              <Select value={formData.purposeOfStay} onValueChange={(value) => updateFormData("purposeOfStay", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="family">Family reunification</SelectItem>
                  <SelectItem value="entrepreneurship">Start a business</SelectItem>
                  <SelectItem value="other">Other/Tourism</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <FileText className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">How long do you plan to stay?</h3>
              <p className="text-muted-foreground">Intended duration of stay</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => updateFormData("duration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Less than 90 days</SelectItem>
                  <SelectItem value="medium">3 months to 1 year</SelectItem>
                  <SelectItem value="long">More than 1 year</SelectItem>
                  <SelectItem value="permanent">Permanent residence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Your Visa Assessment Results</CardTitle>
            <CardDescription>
              Based on your information, here are potential visa pathways for the Netherlands
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {results.map((result, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getEligibilityIcon(result.eligibility)}
                    <CardTitle className="text-xl">{result.name}</CardTitle>
                  </div>
                  <Badge className={getEligibilityColor(result.eligibility)}>
                    {result.eligibility === "likely" ? "Likely Eligible" : 
                     result.eligibility === "uncertain" ? "Uncertain" : "Not Eligible"}
                  </Badge>
                </div>
                <CardDescription>{result.explanation}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Requirements:</h4>
                  <ul className="space-y-1">
                    {result.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Button variant="outline" asChild>
                    <a href={result.officialLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Official IND Information
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card border-warning">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold text-warning">Important Disclaimer</p>
                <p className="text-sm text-muted-foreground">
                  This assessment provides preliminary guidance only and does not constitute legal advice. 
                  Immigration rules are complex and subject to change. Always verify requirements with the 
                  official IND website or consult with a qualified immigration lawyer before making any decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={() => {
            setShowResults(false);
            setCurrentStep(1);
            setFormData({
              nationality: "",
              employmentStatus: "",
              educationLevel: "",
              familySituation: "",
              purposeOfStay: "",
              duration: ""
            });
          }}>
            Start New Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Dutch Visa Eligibility Checker</CardTitle>
          <CardDescription>
            Get a preliminary assessment of your eligibility for Dutch visas
          </CardDescription>
          
          {/* Progress indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`w-8 h-0.5 ${
                      i + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <Button 
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !formData.nationality) ||
                (currentStep === 2 && !formData.employmentStatus) ||
                (currentStep === 3 && !formData.educationLevel) ||
                (currentStep === 4 && !formData.familySituation) ||
                (currentStep === 5 && !formData.purposeOfStay) ||
                (currentStep === 6 && !formData.duration)
              }
            >
              {currentStep === totalSteps ? "Get Assessment" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisaEligibilityChecker;