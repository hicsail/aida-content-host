import { FC } from "react";
import { useParams } from "react-router";

export const TopicModel: FC = () => {
  const { topic } = useParams();

  return (
    <iframe
      style={{
        marginTop: "64px",
        width: "100vw",
        height: "calc(100vh - 72px)",
        border: "none",
      }}
      src={`import.meta.env.VITE_MODEL_URL}/${topic}`}
    />
  );
};
