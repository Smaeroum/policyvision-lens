import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const ClosingScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing
  const logoEnter = interpolate(frame, [0, fps * 0.8], [0, 1], {
    easing: Easing.out(Easing.back(1.5)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textEnter = interpolate(frame, [fps * 0.5, fps * 1.3], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const callToActionEnter = interpolate(frame, [fps * 1.5, fps * 2.3], [0, 1], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalGlow = interpolate(frame, [fps * 2, fps * 4], [0.5, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sparkleAnimation = interpolate(frame, [0, fps * 4], [0, 360], {
    easing: Easing.linear,
  });

  return (
    <AbsoluteFill className="bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Background Glow Effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, hsl(217 91% 60% / ${finalGlow * 0.15}) 0%, transparent 70%)`,
        }}
      />

      {/* Main Content */}
      <div className="text-center z-10 px-8 max-w-4xl">
        {/* Logo */}
        <div
          className="mb-8 flex justify-center"
          style={{
            transform: `scale(${logoEnter}) rotate(${sparkleAnimation * 0.1}deg)`,
            opacity: logoEnter,
          }}
        >
          <div className="relative">
            <div
              className="w-32 h-32 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow"
              style={{
                filter: `drop-shadow(0 0 ${finalGlow * 40}px hsl(217 91% 60% / 0.8))`,
              }}
            >
              <div className="text-4xl font-bold text-primary-foreground">PL</div>
            </div>
            
            {/* Sparkles around logo */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * 360 + sparkleAnimation;
              const radius = 80;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-accent rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(${x}px, ${y}px) scale(${finalGlow})`,
                    opacity: finalGlow * 0.8,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Main Text */}
        <div
          className="mb-8"
          style={{
            transform: `translateY(${(1 - textEnter) * 30}px)`,
            opacity: textEnter,
          }}
        >
          <h1 className="text-6xl md:text-7xl font-display text-display bg-gradient-primary bg-clip-text text-transparent leading-tight mb-4">
            PolicyLens
          </h1>
          <p className="text-2xl text-muted-foreground font-light mb-2">
            AI-Assisted Policy Intelligence
          </p>
          <p className="text-lg text-muted-foreground opacity-80">
            Powered by Spark X an Oliver Wyman affiliated company
          </p>
        </div>

        {/* Call to Action */}
        <div
          className="space-y-4"
          style={{
            transform: `scale(${callToActionEnter}) translateY(${(1 - callToActionEnter) * 20}px)`,
            opacity: callToActionEnter,
          }}
        >
          <div
            className="bg-card border border-primary/30 rounded-2xl p-6 shadow-glow max-w-2xl mx-auto"
            style={{
              background: "linear-gradient(135deg, hsl(var(--card)), hsl(217 91% 60% / 0.05))",
              boxShadow: `0 0 ${finalGlow * 30}px hsl(217 91% 60% / 0.4)`,
            }}
          >
            <p className="text-xl text-professional text-foreground mb-4 leading-relaxed">
              Ready to transform your policy intelligence?
            </p>
            <div className="flex items-center justify-center space-x-4 text-muted-foreground">
              <span className="text-primary font-semibold">✓ 5-day turnaround</span>
              <span>•</span>
              <span className="text-primary font-semibold">✓ Expert reviewed</span>
              <span>•</span>
              <span className="text-primary font-semibold">✓ AI-powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      {Array.from({ length: 20 }).map((_, i) => {
        const delay = i * 5;
        const floatY = interpolate(
          frame,
          [delay, fps * 4 + delay],
          [100, -20],
          { easing: Easing.linear, extrapolateLeft: "clamp" }
        );

        const opacity = interpolate(
          frame,
          [delay, delay + 30, fps * 3 + delay, fps * 4 + delay],
          [0, 0.3, 0.3, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${10 + (i * 4)}%`,
              top: `${60 + Math.sin(i * 0.8) * 30}%`,
              transform: `translateY(${floatY}px)`,
              opacity: opacity * finalGlow,
            }}
          />
        );
      })}

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
    </AbsoluteFill>
  );
};