import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const WhoItsForScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing
  const titleEnter = interpolate(frame, [0, fps * 0.6], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardAnimation = interpolate(frame, [fps * 0.5, fps * 1.5], [0, 1], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const targetAudiences = [
    {
      title: "Ministries",
      description: "Government departments requiring policy analysis",
      icon: "🏛️",
      color: "hsl(217 91% 60%)",
      delay: 0,
    },
    {
      title: "Regulators", 
      description: "Regulatory bodies overseeing compliance",
      icon: "⚖️",
      color: "hsl(142 76% 36%)",
      delay: 0.3,
    },
    {
      title: "SOEs",
      description: "State-owned enterprises implementing reforms",
      icon: "🏢",
      color: "hsl(280 60% 50%)",
      delay: 0.6,
    },
  ];

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
            Who it's for
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
            Organizations needing faster, higher-confidence decisions on complex policies and reforms
          </p>
        </div>

        {/* Target Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targetAudiences.map((audience, index) => {
            const cardEnter = interpolate(
              frame,
              [fps * (1 + audience.delay), fps * (1.8 + audience.delay)],
              [0, 1],
              {
                easing: Easing.out(Easing.back(1.3)),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            const cardHover = interpolate(
              frame,
              [fps * 2.5, fps * 4.5],
              [1, 1.05],
              {
                easing: Easing.inOut(Easing.ease),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            const iconGlow = interpolate(
              frame,
              [fps * 2, fps * 4],
              [0.5, 1],
              {
                easing: Easing.inOut(Easing.ease),
                extrapolateLeft: "clamp", 
                extrapolateRight: "clamp",
              }
            );

            return (
              <div
                key={index}
                className="relative"
                style={{
                  transform: `scale(${cardEnter * cardHover}) translateY(${(1 - cardEnter) * 50}px)`,
                  opacity: cardEnter,
                }}
              >
                <div
                  className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-glow transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--card)), ${audience.color}15)`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="text-6xl mb-6 flex justify-center"
                    style={{
                      filter: `drop-shadow(0 0 ${iconGlow * 20}px ${audience.color}60)`,
                    }}
                  >
                    {audience.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-display text-display text-foreground mb-4">
                    {audience.title}
                  </h3>

                  {/* Description */}
                  <p className="text-professional text-muted-foreground leading-relaxed">
                    {audience.description}
                  </p>

                  {/* Bottom Accent */}
                  <div
                    className="mt-6 h-1 w-16 mx-auto rounded-full"
                    style={{ backgroundColor: audience.color }}
                  />
                </div>

                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-xl -z-10 opacity-20"
                  style={{
                    background: `radial-gradient(circle at center, ${audience.color}40 0%, transparent 70%)`,
                    transform: `scale(${1.2 + iconGlow * 0.1})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => {
          const delay = i * 15;
          const moveY = interpolate(
            frame,
            [delay, fps * 5 + delay],
            [100, -20],
            { easing: Easing.linear, extrapolateLeft: "clamp" }
          );

          const opacity = interpolate(
            frame,
            [delay, delay + 30, fps * 4 + delay, fps * 5 + delay],
            [0, 0.1, 0.1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${5 + (i * 8)}%`,
                top: `${60 + Math.sin(i * 0.5) * 30}%`,
                transform: `translateY(${moveY}px)`,
                opacity,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};