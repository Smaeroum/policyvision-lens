import { Player } from "@remotion/player";
import { PolicyLensVideo } from "../remotion/PolicyLensVideo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Download, Info } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-lg font-bold text-primary-foreground">PL</span>
            </div>
            <div>
              <h1 className="text-xl font-display text-display text-foreground">PolicyLens</h1>
              <p className="text-sm text-muted-foreground">AI-Assisted Policy Intelligence</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Info className="w-4 h-4" />
            Learn More
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-display text-display bg-gradient-primary bg-clip-text text-transparent leading-tight mb-4">
              PolicyLens
            </h1>
            <p className="text-2xl text-professional text-muted-foreground mb-4">
              AI-Assisted Policy Intelligence Video
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the future of evidence-based policy making through our comprehensive video presentation
            </p>
          </div>
        </section>

        {/* Video Player Section */}
        <section className="mb-16">
          <Card className="p-8 shadow-card bg-card border-border max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-display text-display text-foreground mb-2">
                Watch the PolicyLens Overview
              </h2>
              <p className="text-professional text-muted-foreground">
                A complete walkthrough of our AI-assisted policy intelligence system
              </p>
            </div>

            {/* Remotion Player */}
            <div className="relative rounded-xl overflow-hidden shadow-elegant mb-6">
              <Player
                component={PolicyLensVideo}
                durationInFrames={1200}
                compositionWidth={1920}
                compositionHeight={1080}
                fps={30}
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                }}
                controls
                loop
                showVolumeControls
                clickToPlay
              />
            </div>

            {/* Video Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="gap-2 bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-elegant"
              >
                <Play className="w-4 h-4" />
                {isPlaying ? "Pause" : "Play"} Video
              </Button>
              
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Video
              </Button>
            </div>
          </Card>
        </section>

        {/* Features Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "AI-Powered", description: "Advanced AI agent with expert peer review", icon: "🤖" },
            { title: "Fast Turnaround", description: "≤ 5 days peer review completion", icon: "⚡" },
            { title: "Expert Network", description: "Spark X an Oliver Wyman affiliated company", icon: "👥" },
            { title: "Comprehensive", description: "Full policy cycle from agenda to evaluation", icon: "🔄" },
          ].map((feature, index) => (
            <Card key={index} className="p-6 text-center shadow-card hover:shadow-glow transition-all duration-300 bg-gradient-accent border-border">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-display text-foreground mb-2">{feature.title}</h3>
              <p className="text-professional text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="p-12 shadow-glow bg-gradient-primary text-primary-foreground max-w-4xl mx-auto">
            <h2 className="text-4xl font-display mb-4">Ready to Transform Policy Intelligence?</h2>
            <p className="text-xl mb-8 opacity-90">
              Experience faster, higher-confidence decisions on complex policies and reforms
            </p>
            <div className="flex justify-center">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started
              </Button>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-professional text-muted-foreground">
            Powered by Spark X an Oliver Wyman affiliated company
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
