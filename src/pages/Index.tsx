import Header from "@/components/Header";
import VisaEligibilityChecker from "@/components/VisaEligibilityChecker";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <VisaEligibilityChecker />
      </main>
    </div>
  );
};

export default Index;
