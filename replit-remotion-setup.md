# PolicyLens Remotion Video - Replit Setup

## Instructions for Replit

1. Create a new Repl and select "Node.js" as the template
2. Copy the contents below into the appropriate files
3. Run `npm install` in the Shell
4. Run `npm run dev` to start the preview server
5. Run `npm run render` to render the final video

## Package.json
```json
{
  "name": "policylens-video",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "remotion preview",
    "build": "remotion bundle",
    "render": "remotion render PolicyLensVideo out/video.mp4",
    "upgrade": "remotion upgrade"
  },
  "dependencies": {
    "@remotion/cli": "^4.0.340",
    "@remotion/player": "^4.0.340",
    "remotion": "^4.0.340",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "typescript": "^5.2.2"
  }
}
```

## src/Root.tsx
```tsx
import { Composition } from "remotion";
import { PolicyLensVideo } from "./PolicyLensVideo";
import "./styles.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PolicyLensVideo"
        component={PolicyLensVideo}
        durationInFrames={1200} // 40 seconds at 30 FPS
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
```

## src/styles.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Design system for Remotion videos */
@layer base {
  :root {
    /* Professional PolicyLens Color Palette */
    --background: 220 25% 5%;
    --foreground: 210 40% 98%;

    --card: 220 25% 8%;
    --card-foreground: 210 40% 98%;

    --primary: 217 91% 60%;
    --primary-foreground: 220 25% 5%;

    --secondary: 220 15% 15%;
    --secondary-foreground: 210 40% 98%;

    --muted: 220 15% 15%;
    --muted-foreground: 215 20% 65%;

    --accent: 142 76% 36%;
    --accent-foreground: 210 40% 98%;

    --border: 220 15% 20%;
    --ring: 217 91% 60%;

    /* Professional Design Tokens */
    --gradient-primary: linear-gradient(135deg, hsl(217 91% 60%), hsl(142 76% 36%));
    --gradient-subtle: linear-gradient(180deg, hsl(220 25% 8%), hsl(220 25% 5%));
    --gradient-accent: linear-gradient(90deg, hsl(217 91% 60% / 0.1), hsl(142 76% 36% / 0.1));
    
    /* Shadows */
    --shadow-elegant: 0 10px 30px -10px hsl(217 91% 60% / 0.3);
    --shadow-glow: 0 0 40px hsl(217 91% 60% / 0.2);
    --shadow-card: 0 4px 20px hsl(220 25% 5% / 0.8);
    
    /* Typography */
    --font-display: 'Inter', system-ui, sans-serif;
    --font-body: 'Inter', system-ui, sans-serif;
    
    --radius: 0.75rem;
  }

  body {
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: var(--font-body);
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
}

@layer utilities {
  /* Professional Gradient Backgrounds */
  .bg-gradient-primary {
    background: var(--gradient-primary);
  }
  
  .bg-gradient-subtle {
    background: var(--gradient-subtle);
  }
  
  .bg-gradient-accent {
    background: var(--gradient-accent);
  }

  /* Background Colors */
  .bg-background {
    background-color: hsl(var(--background));
  }
  
  .bg-card {
    background-color: hsl(var(--card));
  }
  
  .bg-primary {
    background-color: hsl(var(--primary));
  }
  
  .bg-accent {
    background-color: hsl(var(--accent));
  }

  /* Text Colors */
  .text-foreground {
    color: hsl(var(--foreground));
  }
  
  .text-primary {
    color: hsl(var(--primary));
  }
  
  .text-primary-foreground {
    color: hsl(var(--primary-foreground));
  }
  
  .text-muted-foreground {
    color: hsl(var(--muted-foreground));
  }

  /* Border Colors */
  .border-border {
    border-color: hsl(var(--border));
  }
  
  .border-primary {
    border-color: hsl(var(--primary));
  }
  
  /* Professional Shadows */
  .shadow-elegant {
    box-shadow: var(--shadow-elegant);
  }
  
  .shadow-glow {
    box-shadow: var(--shadow-glow);
  }
  
  .shadow-card {
    box-shadow: var(--shadow-card);
  }
  
  /* Professional Typography */
  .text-display {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  
  .text-professional {
    font-family: var(--font-body);
    line-height: 1.6;
  }

  .font-display {
    font-family: var(--font-display);
  }
}

/* Animation utilities for video */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

## src/PolicyLensVideo.tsx
```tsx
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { WhatItIsScene } from "./scenes/WhatItIsScene";
import { WhoItsForScene } from "./scenes/WhoItsForScene";
import { WhatItDoesScene } from "./scenes/WhatItDoesScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { WhyItWinsScene } from "./scenes/WhyItWinsScene";
import { ClosingScene } from "./scenes/ClosingScene";

export const PolicyLensVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Scene timing (30 FPS)
  const scenes = [
    { name: "title", duration: fps * 4 }, // 4 seconds
    { name: "whatItIs", duration: fps * 6 }, // 6 seconds
    { name: "whoItsFor", duration: fps * 5 }, // 5 seconds
    { name: "whatItDoes", duration: fps * 8 }, // 8 seconds
    { name: "howItWorks", duration: fps * 6 }, // 6 seconds
    { name: "whyItWins", duration: fps * 7 }, // 7 seconds
    { name: "closing", duration: fps * 4 }, // 4 seconds
  ];

  let currentStart = 0;
  const sceneTimings = scenes.map((scene) => {
    const timing = { start: currentStart, duration: scene.duration };
    currentStart += scene.duration;
    return timing;
  });

  // Background animation
  const backgroundOpacity = interpolate(
    frame,
    [0, 30, currentStart - 30, currentStart],
    [0, 1, 1, 0],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill className="bg-background">
      {/* Animated Background */}
      <AbsoluteFill
        style={{
          opacity: backgroundOpacity,
          background: "var(--gradient-subtle)",
        }}
      />

      {/* Title Scene */}
      <Sequence from={sceneTimings[0].start} durationInFrames={sceneTimings[0].duration}>
        <TitleScene />
      </Sequence>

      {/* What It Is Scene */}
      <Sequence from={sceneTimings[1].start} durationInFrames={sceneTimings[1].duration}>
        <WhatItIsScene />
      </Sequence>

      {/* Who It's For Scene */}
      <Sequence from={sceneTimings[2].start} durationInFrames={sceneTimings[2].duration}>
        <WhoItsForScene />
      </Sequence>

      {/* What It Does Scene */}
      <Sequence from={sceneTimings[3].start} durationInFrames={sceneTimings[3].duration}>
        <WhatItDoesScene />
      </Sequence>

      {/* How It Works Scene */}
      <Sequence from={sceneTimings[4].start} durationInFrames={sceneTimings[4].duration}>
        <HowItWorksScene />
      </Sequence>

      {/* Why It Wins Scene */}
      <Sequence from={sceneTimings[5].start} durationInFrames={sceneTimings[5].duration}>
        <WhyItWinsScene />
      </Sequence>

      {/* Closing Scene */}
      <Sequence from={sceneTimings[6].start} durationInFrames={sceneTimings[6].duration}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
```

## src/scenes/TitleScene.tsx
```tsx
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
          <p className="text-lg text-muted-foreground opacity-80">
            Powered by Spark X an Oliver Wyman affiliated company
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
```

## src/scenes/WhatItIsScene.tsx
```tsx
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
```

## src/scenes/WhoItsForScene.tsx
```tsx
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
```

## src/scenes/WhatItDoesScene.tsx
```tsx
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
```

## src/scenes/HowItWorksScene.tsx
```tsx
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
```

## src/scenes/WhyItWinsScene.tsx
```tsx
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
```

## src/scenes/ClosingScene.tsx
```tsx
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
```

## remotion.config.ts
```typescript
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");
Config.setCodec("h264");
```

---

## Instructions

1. **Setup in Replit:**
   - Create a new Node.js Repl
   - Copy each code section into its respective file
   - Create the folder structure: `src/`, `src/scenes/`

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development:**
   ```bash
   npm run dev
   ```

4. **Render Video:**
   ```bash
   npm run render
   ```

The video will be rendered as `out/video.mp4` and runs for 40 seconds at 30 FPS (1920x1080 resolution).