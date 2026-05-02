import { useRef, useState } from "react";

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    audio.play();
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const toggle = (src: string) => {
    if (!audioRef.current) {
      play(src);
      return;
    }

    if (audioRef.current.src.includes(src) && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      play(src);
    }
  };

  return { toggle, isPlaying };
};