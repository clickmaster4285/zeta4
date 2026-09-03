"use client";

import { useEffect, useState } from "react";
import styles from "./HeroTypewriter.module.css";

interface HeroTypewriterProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const DEFAULT_PHRASES = [
  "Powering Sovereign Digital Infrastructure",
  "Sovereign Carrier Foundation",
  "Invisible Infrastructure, Visible Progress",
  "Terrestrial Routes to Machine Intelligence",
];

export default function HeroTypewriter({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 3200,
}: HeroTypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && displayedText === currentPhrase) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const speed = isDeleting
      ? deletingSpeed + Math.random() * 15
      : typingSpeed + Math.random() * 25;

    const timer = setTimeout(() => {
      setDisplayedText((prev) => {
        if (isDeleting) {
          return currentPhrase.substring(0, prev.length - 1);
        } else {
          return currentPhrase.substring(0, prev.length + 1);
        }
      });
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className={styles.typewriterContainer} aria-live="polite">
      <div className={styles.liveBadge}>
        <span className={styles.pulseDot} aria-hidden="true" />
        <span className={styles.badgeText}>LIVE CONSOLE</span>
      </div>

      <h1 className={styles.typewriterHeading}>
        <span className={styles.typedText}>{displayedText}</span>
        <span className={styles.cursor} aria-hidden="true" />
      </h1>
    </div>
  );
}
