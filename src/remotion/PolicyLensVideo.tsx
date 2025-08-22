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