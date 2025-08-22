import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const TitleScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animation timing
  const logoEnter = interpolate(frame, [0, fps * 0.8], [0, 1], {
    easing: Easing.out(Easing.back(1.7)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleEnter = interpolate(frame, [fps * 0.4, fps * 1.2], [0, 1], {
    easing: Easing.out(Easing.back(1.5)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleEnter = interpolate(frame, [fps * 0.8, fps * 1.6], [0, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowAnimation = interpolate(frame, [fps * 2, fps * 4], [0.4, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex items-center justify-center bg-gradient-subtle relative overflow-hidden">
      {/* Background Glow Effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, hsl(217 91% 60% / ${glowAnimation * 0.3}) 0%, transparent 60%)`,
        }}
      />

      {/* Main Content */}
      <div className="text-center z-10 px-8">
        {/* Logo/Icon */}
        <div
          className="mb-8 flex justify-center"
          style={{
            transform: `scale(${logoEnter}) translateY(${(1 - logoEnter) * 40}px)`,
            opacity: logoEnter,
          }}
        >
          <div className="relative">
            <div
              className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow"
              style={{
                filter: `drop-shadow(0 0 ${glowAnimation * 30}px hsl(217 91% 60% / 0.6))`,
              }}
            >
              <div className="text-3xl font-bold text-primary-foreground">PL</div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div
          className="mb-4"
          style={{
            transform: `translateY(${(1 - titleEnter) * 40}px)`,
            opacity: titleEnter,
          }}
        >
          <h1 className="text-6xl md:text-7xl font-display text-display bg-gradient-primary bg-clip-text text-transparent leading-tight">
            PolicyLens
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            transform: `translateY(${(1 - subtitleEnter) * 30}px)`,
            opacity: subtitleEnter,
          }}
        >
          <p className="text-2xl md:text-3xl text-muted-foreground font-light">
            AI-Assisted Policy Intelligence
          </p>
          <p className="text-lg text-muted-foreground mt-2 opacity-80">
            Powered by Oliver Wyman's Global Network of Policy Experts
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const particleDelay = i * 10;
        const particleOpacity = interpolate(
          frame,
          [fps * 2 + particleDelay, fps * 3 + particleDelay],
          [0, 0.6],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        
        const particleY = interpolate(
          frame,
          [0, fps * 4],
          [100, -20],
          { easing: Easing.linear }
        );

        return (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${50 + Math.sin(i) * 20}%`,
              opacity: particleOpacity,
              transform: `translateY(${particleY}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};