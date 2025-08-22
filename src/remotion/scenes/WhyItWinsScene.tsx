import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const WhyItWinsScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const benefits = [
    {
      title: "Speed",
      description: "weeks of deskwork compressed into hours; end-to-end turnaround shortened",
      icon: "⚡",
      color: "hsl(45 93% 47%)",
      delay: 0,
    },
    {
      title: "Quality",
      description: "broader evidence coverage + expert peer review",
      icon: "🎯",
      color: "hsl(142 76% 36%)",
      delay: 0.4,
    },
    {
      title: "Transparency",
      description: "auditable logs, explainable outputs, human-in/over-the-loop",
      icon: "🔍",
      color: "hsl(217 91% 60%)",
      delay: 0.8,
    },
    {
      title: "Safety",
      description: "governance and bias controls baked into the workflow",
      icon: "🛡️",
      color: "hsl(280 60% 50%)",
      delay: 1.2,
    },
  ];

  const titleEnter = interpolate(frame, [0, fps * 0.6], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalGlow = interpolate(frame, [fps * 5, fps * 7], [0.5, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-subtle flex items-center justify-center px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <div
          className="mb-16"
          style={{
            transform: `translateY(${(1 - titleEnter) * 40}px)`,
            opacity: titleEnter,
          }}
        >
          <h2 className="text-5xl font-display text-display text-foreground mb-4">
            Why it wins
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const cardEnter = interpolate(
              frame,
              [fps * (1 + benefit.delay), fps * (1.8 + benefit.delay)],
              [0, 1],
              {
                easing: Easing.out(Easing.back(1.2)),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            const cardFloat = interpolate(
              frame,
              [0, fps * 7],
              [0, Math.sin(index * 0.7) * 8],
              { easing: Easing.inOut(Easing.ease) }
            );

            const iconGlow = interpolate(
              frame,
              [fps * (3 + benefit.delay), fps * (5 + benefit.delay)],
              [0.6, 1],
              {
                easing: Easing.inOut(Easing.ease),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            return (
              <div
                key={index}
                className="relative group"
                style={{
                  transform: `scale(${cardEnter}) translateY(${cardFloat + (1 - cardEnter) * 60}px)`,
                  opacity: cardEnter,
                }}
              >
                <div
                  className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-500 h-full"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--card)), ${benefit.color}10)`,
                    borderColor: `${benefit.color}30`,
                  }}
                >
                  {/* Icon with Glow */}
                  <div
                    className="text-6xl mb-6 flex justify-center"
                    style={{
                      filter: `drop-shadow(0 0 ${iconGlow * 25}px ${benefit.color}80)`,
                    }}
                  >
                    {benefit.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-3xl font-display text-display mb-4"
                    style={{ color: benefit.color }}
                  >
                    {benefit.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className="h-1 w-16 mx-auto rounded-full mb-4"
                    style={{ backgroundColor: benefit.color }}
                  />

                  {/* Description */}
                  <p className="text-professional text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Animated Border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-30"
                  style={{
                    background: `conic-gradient(from ${(frame * 2) % 360}deg, ${benefit.color}60 0deg, transparent 120deg, ${benefit.color}60 240deg, transparent 360deg)`,
                    padding: "2px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "exclude",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Final Message */}
        <div
          className="relative"
          style={{
            opacity: interpolate(
              frame,
              [fps * 5.5, fps * 6.5],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <div
            className="bg-gradient-primary rounded-2xl p-8 shadow-glow text-primary-foreground max-w-4xl mx-auto"
            style={{
              boxShadow: `0 0 ${finalGlow * 40}px hsl(217 91% 60% / 0.6)`,
            }}
          >
            <h3 className="text-2xl font-display mb-4">
              Transforming Policy Intelligence
            </h3>
            <p className="text-lg opacity-90">
              The future of evidence-based policy making is here — faster, smarter, safer.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * 360;
          const radius = 300 + Math.sin(frame * 0.02 + i) * 50;
          const x = Math.cos(angle * Math.PI / 180) * radius;
          const y = Math.sin(angle * Math.PI / 180) * radius;
          
          const opacity = interpolate(
            frame,
            [fps * 2, fps * 7],
            [0, 0.1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(${x}px, ${y}px)`,
                opacity,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};