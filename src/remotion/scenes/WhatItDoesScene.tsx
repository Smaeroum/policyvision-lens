import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const WhatItDoesScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const useCases = [
    {
      title: "Horizon scanning & evidence synthesis",
      subtitle: "decision-ready briefs",
      icon: "🔍",
      delay: 0,
    },
    {
      title: "Option appraisal (MCDA) & fiscal scoring",
      subtitle: "transparent trade-offs", 
      icon: "⚖️",
      delay: 0.4,
    },
    {
      title: "Legislative/regulatory co-drafting",
      subtitle: "cleaner texts, fewer defects",
      icon: "📝",
      delay: 0.8,
    },
    {
      title: "Implementation planning & delivery ops",
      subtitle: "milestones, OKRs, early-warning triggers",
      icon: "🎯",
      delay: 1.2,
    },
    {
      title: "Monitoring, evaluation & learning (MEL)",
      subtitle: "real-time course-correction",
      icon: "📊",
      delay: 1.6,
    },
    {
      title: "Red-teaming & safety checks",
      subtitle: "bias, loophole, and equity testing before rollout",
      icon: "🛡️",
      delay: 2.0,
    },
  ];

  const titleEnter = interpolate(frame, [0, fps * 0.6], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-subtle flex items-center justify-center px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div
          className="text-center mb-12"
          style={{
            transform: `translateY(${(1 - titleEnter) * 40}px)`,
            opacity: titleEnter,
          }}
        >
          <h2 className="text-5xl font-display text-display text-foreground mb-4">
            What it does
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <p className="text-xl text-muted-foreground">Core use cases</p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const cardEnter = interpolate(
              frame,
              [fps * (1 + useCase.delay), fps * (1.6 + useCase.delay)],
              [0, 1],
              {
                easing: Easing.out(Easing.back(1.2)),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            const iconFloat = interpolate(
              frame,
              [0, fps * 8],
              [0, Math.sin(index * 0.8) * 5],
              { easing: Easing.inOut(Easing.ease) }
            );

            const cardHover = interpolate(
              frame,
              [fps * 4, fps * 6, fps * 8],
              [1, 1.02, 1],
              { easing: Easing.inOut(Easing.ease) }
            );

            return (
              <div
                key={index}
                className="relative group"
                style={{
                  transform: `scale(${cardEnter * cardHover}) translateY(${(1 - cardEnter) * 60}px)`,
                  opacity: cardEnter,
                }}
              >
                <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 h-full">
                  {/* Icon */}
                  <div
                    className="text-4xl mb-4 flex items-center justify-center w-16 h-16 bg-gradient-accent rounded-xl mx-auto"
                    style={{
                      transform: `translateY(${iconFloat}px)`,
                    }}
                  >
                    {useCase.icon}
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-display text-foreground mb-2 leading-tight">
                      {useCase.title}
                    </h3>
                    <div className="h-px bg-gradient-primary w-12 mx-auto mb-3 rounded-full" />
                    <p className="text-sm text-primary font-medium">
                      → {useCase.subtitle}
                    </p>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom Summary */}
        <div
          className="text-center mt-12"
          style={{
            opacity: interpolate(
              frame,
              [fps * 6, fps * 7],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <p className="text-lg text-professional text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive policy lifecycle management from initial research to final evaluation and optimization
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        {Array.from({ length: 20 }).map((_, i) => {
          const rotation = interpolate(frame, [0, fps * 8], [0, 360], {
            easing: Easing.linear,
          });
          
          return (
            <div
              key={i}
              className="absolute w-24 h-24 border border-primary rounded-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${rotation + i * 18}deg)`,
                animation: `float ${3 + i * 0.1}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};