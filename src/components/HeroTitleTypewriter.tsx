"use client";

import { useEffect, useState } from "react";
import styles from "./HeroTitleTypewriter.module.css";

const LINES = ["POWERING", "SOVEREIGN", "DIGITAL", "INFRASTRUCTURE"];

export default function HeroTitleTypewriter() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>(["", "", "", ""]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    if (currentLineIndex >= LINES.length) {
      setIsFinished(true);
      return;
    }

    const targetLine = LINES[currentLineIndex];

    const timer = setTimeout(() => {
      if (currentCharIndex < targetLine.length) {
        setTypedLines((prev) => {
          const next = [...prev];
          next[currentLineIndex] = targetLine.substring(0, currentCharIndex + 1);
          return next;
        });
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, 60 + Math.random() * 25);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, isFinished]);

  return (
    <div className={styles.heroTitleContainer}>
      <h1 className={styles.heroTitle} aria-label="POWERING SOVEREIGN DIGITAL INFRASTRUCTURE">
        {/* Line 1: POWERING */}
        <div className={styles.titleLine}>
          <span>{typedLines[0]}</span>
          {!isFinished && currentLineIndex === 0 && (
            <span className={styles.cursor} aria-hidden="true" />
          )}
        </div>

        {/* Line 2: SOVEREIGN */}
        <div className={styles.titleLine}>
          <span>{typedLines[1]}</span>
          {!isFinished && currentLineIndex === 1 && (
            <span className={styles.cursor} aria-hidden="true" />
          )}
        </div>

        {/* Line 3: DIGITAL (Red) */}
        <div className={`${styles.titleLine} ${styles.redAccent}`}>
          <span>{typedLines[2]}</span>
          {!isFinished && currentLineIndex === 2 && (
            <span className={styles.cursor} aria-hidden="true" />
          )}
        </div>

        {/* Line 4: INFRASTRUCTURE */}
        <div className={styles.titleLine}>
          <span>{typedLines[3]}</span>
          {!isFinished && currentLineIndex === 3 && (
            <span className={styles.cursor} aria-hidden="true" />
          )}
        </div>
      </h1>
    </div>
  );
}
