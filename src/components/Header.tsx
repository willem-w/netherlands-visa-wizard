import { Card } from "@/components/ui/card";

const Header = () => {
  return (
    <header className="gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
            <div className="w-8 h-5 bg-secondary rounded-sm"></div>
            <div className="w-5 h-8 bg-white rounded-sm"></div>
            <div className="w-8 h-5 bg-secondary rounded-sm"></div>
            <span className="text-sm font-medium">Official Guidance Tool</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Dutch Visa Eligibility
            <span className="block text-secondary">Checker</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Get personalized guidance on Dutch immigration pathways. 
            Find the right visa category for your situation in minutes.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              Free Assessment
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              Official IND Guidelines
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              Updated 2024
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;