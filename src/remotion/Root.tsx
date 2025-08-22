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