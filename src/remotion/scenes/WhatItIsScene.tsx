import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const WhatItIsScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing
  const titleEnter = interpolate(frame, [0, fps * 0.6], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contentEnter = interpolate(frame, [fps * 0.3, fps * 1], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconAnimation = interpolate(frame, [fps * 1, fps * 3], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    { icon: "🤖", text: "AI Agent", delay: 0 },
    { icon: "👥", text: "Expert Peer Review", delay: 0.3 },
    { icon: "⚡", text: "Accelerated Policy Cycle", delay: 0.6 },
    { icon: "📊", text: "Decision Ready", delay: 0.9 },
  ];

  return (
    <AbsoluteFill className="bg-gradient-subtle flex items-center justify-center px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <div
          className="mb-12"
          style={{
            transform: `translateY(${(1 - titleEnter) * 40}px)`,
            opacity: titleEnter,
          }}
        >
          <h2 className="text-5xl font-display text-display text-foreground mb-4">
            What it is
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        {/* Main Description */}
        <div
          className="mb-12"
          style={{
            transform: `translateY(${(1 - contentEnter) * 30}px)`,
            opacity: contentEnter,
          }}
        >
          <p className="text-2xl md:text-3xl text-professional text-foreground leading-relaxed mb-8">
            An AI agent + expert peer-review system that{" "}
            <span className="text-primary font-semibold">accelerates the full policy cycle</span>
            —from agenda setting to evaluation.
          </p>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const featureEnter = interpolate(
              frame,
              [fps * (1.5 + feature.delay), fps * (2.2 + feature.delay)],
              [0, 1],
              {
                easing: Easing.out(Easing.back(1.5)),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            const iconFloat = interpolate(
              frame,
              [0, fps * 6],
              [0, Math.sin(index) * 10],
              { easing: Easing.inOut(Easing.ease) }
            );

            return (
              <div
                key={index}
                className="text-center"
                style={{
                  transform: `scale(${featureEnter}) translateY(${iconFloat}px)`,
                  opacity: featureEnter,
                }}
              >
                <div className="mb-4 text-5xl">{feature.icon}</div>
                <p className="text-lg text-professional text-muted-foreground font-medium">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Accent */}
        <div
          className="mt-12"
          style={{
            transform: `scaleX(${iconAnimation})`,
            opacity: iconAnimation,
          }}
        >
          <div className="h-px bg-gradient-primary w-full max-w-md mx-auto rounded-full" />
        </div>
      </div>

      {/* Background Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {Array.from({ length: 8 }).map((_, i) => {
          const rotation = interpolate(frame, [0, fps * 6], [0, 360], {
            easing: Easing.linear,
          });
          
          return (
            <div
              key={i}
              className="absolute w-32 h-32 border-2 border-primary rounded-lg"
              style={{
                left: `${10 + (i % 3) * 30}%`,
                top: `${20 + Math.floor(i / 3) * 25}%`,
                transform: `rotate(${rotation + i * 45}deg)`,
                opacity: 0.3,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};