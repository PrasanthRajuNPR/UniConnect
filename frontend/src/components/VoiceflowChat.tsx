import { useEffect } from "react";

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load?: (config: {
          verify: { projectID: string };
          url: string;
          versionID: string;
          voice?: { url: string };
        }) => void;
      };
    };
  }
}

const VoiceflowChat: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.async = true;

    script.onload = () => {
      window.voiceflow?.chat?.load?.({
        verify: { projectID: "67b884e89ee2b82c469829f6" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        voice: {
          url: "https://runtime-api.voiceflow.com",
        },
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No UI needed, just script injection
};

export default VoiceflowChat;
