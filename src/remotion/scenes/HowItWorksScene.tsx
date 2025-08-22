import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const HowItWorksScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const steps = [
    { label: "Department submits review", icon: "📤", color: "hsl(217 91% 60%)" },
    { label: "PolicyLens processes & drafts", icon: "🤖", color: "hsl(142 76% 36%)" },
    { label: "Global Experts peer review", icon: "👥", color: "hsl(280 60% 50%)" },
    { label: "OW revises/finalizes", icon: "✅", color: "hsl(45 93% 47%)" },
    { label: "Department", icon: "🏛️", color: "hsl(217 91% 60%)" },
  ];

  const titleEnter = interpolate(frame, [0, fps * 0.6], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slaEnter = interpolate(frame, [fps * 4, fps * 5], [0, 1], {
    easing: Easing.out(Easing.back(1.5)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-subtle flex items-center justify-center px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <div
          className="mb-12"
          style={{
            transform: `translateY(${(1 - titleEnter) * 40}px)`,
            opacity: titleEnter,
          }}
        >
          <h2 className="text-5xl font-display text-display text-foreground mb-4">
            How it works
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <p className="text-xl text-muted-foreground">Review flow & SLA</p>
        </div>

        {/* Process Flow */}
        <div className="relative mb-16">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-primary transform -translate-y-1/2 hidden md:block" />
          
          {/* Steps */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4 relative z-10">
            {steps.map((step, index) => {
              const stepDelay = index * 0.3;
              const stepEnter = interpolate(
                frame,
                [fps * (1 + stepDelay), fps * (1.8 + stepDelay)],
                [0, 1],
                {
                  easing: Easing.out(Easing.back(1.3)),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              );

              const iconPulse = interpolate(
                frame,
                [fps * (2 + stepDelay), fps * (3.5 + stepDelay)],
                [1, 1.2],
                {
                  easing: Easing.inOut(Easing.ease),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              );

              const isLastStep = index === steps.length - 1;

              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                  style={{
                    transform: `scale(${stepEnter}) translateY(${(1 - stepEnter) * 50}px)`,
                    opacity: stepEnter,
                  }}
                >
                  {/* Step Circle */}
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-glow"
                    style={{
                      backgroundColor: step.color,
                      transform: `scale(${iconPulse})`,
                      boxShadow: `0 0 20px ${step.color}40`,
                    }}
                  >
                    <span className="text-2xl text-white">{step.icon}</span>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Label */}
                  <p className="text-sm text-professional text-foreground font-medium text-center max-w-32 leading-tight">
                    {step.label}
                  </p>

                  {/* Arrow (except last step) */}
                  {!isLastStep && (
                    <div className="hidden md:block absolute -right-8 top-8 text-2xl text-muted-foreground">
                      →
                    </div>
                  )}
                  
                  {/* Mobile Arrow */}
                  {!isLastStep && (
                    <div className="md:hidden mt-4 text-2xl text-muted-foreground rotate-90">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SLA Highlight */}
        <div
          className="bg-card border border-primary/20 rounded-2xl p-8 shadow-card max-w-2xl mx-auto"
          style={{
            transform: `scale(${slaEnter}) translateY(${(1 - slaEnter) * 30}px)`,
            opacity: slaEnter,
            background: "linear-gradient(135deg, hsl(var(--card)), hsl(217 91% 60% / 0.05))",
          }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl mr-4">⚡</div>
            <h3 className="text-2xl font-display text-display text-foreground">
              Lightning Fast Turnaround
            </h3>
          </div>
          
          <p className="text-xl text-professional text-muted-foreground mb-4">
            Peer review + OW revision completed in
          </p>
          
          <div className="text-5xl font-display text-display bg-gradient-primary bg-clip-text text-transparent mb-2">
            ≤ 5 days
          </div>
          
          <div className="h-1 w-24 bg-gradient-primary mx-auto rounded-full" />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {Array.from({ length: 5 }).map((_, i) => {
          const progress = interpolate(
            frame,
            [fps * i, fps * (6 + i)],
            [0, 100],
            { easing: Easing.linear, extrapolateLeft: "clamp" }
          );

          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: `${progress}%`,
                top: `${30 + i * 10}%`,
                transform: `translateX(-50%)`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};