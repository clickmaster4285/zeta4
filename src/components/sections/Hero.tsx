import Image from "next/image";
import { HERO } from "@/lib/content";
import HeroTitleTypewriter from "@/components/HeroTitleTypewriter";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label={HERO.typingText}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        isolation: "isolate",

        // ==============================
        // MAIN BLACK + RED BACKGROUND
        // ==============================
        background: `
          radial-gradient(
            circle at 78% 40%,
            rgba(255, 20, 20, 0.15) 0%,
            rgba(180, 0, 0, 0.09) 18%,
            rgba(70, 0, 0, 0.04) 35%,
            transparent 58%
          ),
          radial-gradient(
            circle at 100% 0%,
            rgba(255, 0, 0, 0.18) 0%,
            rgba(120, 0, 0, 0.08) 25%,
            transparent 52%
          ),
          radial-gradient(
            circle at 45% 90%,
            rgba(130, 0, 0, 0.08) 0%,
            transparent 40%
          ),
          #020202
        `,
      }}
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
          ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-20%",
          zIndex: -10,
          pointerEvents: "none",

          background: `
            radial-gradient(
              ellipse at 78% 38%,
              rgba(255, 0, 0, 0.13) 0%,
              rgba(180, 0, 0, 0.07) 20%,
              rgba(80, 0, 0, 0.03) 42%,
              transparent 65%
            )
          `,

          filter: "blur(45px)",
        }}
      />

      {/* =====================================================
          TOP RIGHT RED LIGHT
          ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "650px",
          height: "650px",
          top: "-330px",
          right: "-180px",
          zIndex: -9,
          pointerEvents: "none",

          background: `
            radial-gradient(
              circle,
              rgba(255, 25, 25, 0.25) 0%,
              rgba(190, 0, 0, 0.12) 25%,
              rgba(100, 0, 0, 0.04) 48%,
              transparent 70%
            )
          `,

          filter: "blur(35px)",
        }}
      />

      {/* =====================================================
          GLOBE AREA RED GLOW
          ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "850px",
          height: "850px",
          top: "0",
          right: "-120px",
          zIndex: -8,
          pointerEvents: "none",

          background: `
            radial-gradient(
              circle,
              rgba(255, 0, 0, 0.10) 0%,
              rgba(170, 0, 0, 0.06) 25%,
              transparent 65%
            )
          `,

          filter: "blur(60px)",
        }}
      />

      {/* =====================================================
          DIGITAL DOT FIELD
          ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "520px",
          height: "420px",
          left: "32%",
          top: "20%",
          zIndex: -7,
          pointerEvents: "none",

          backgroundImage: `
            radial-gradient(
              rgba(255, 20, 20, 0.28) 1px,
              transparent 1px
            )
          `,

          backgroundSize: "12px 12px",

          maskImage: `
            radial-gradient(
              ellipse,
              black 0%,
              transparent 70%
            )
          `,

          WebkitMaskImage: `
            radial-gradient(
              ellipse,
              black 0%,
              transparent 70%
            )
          `,

          opacity: 0.13,
        }}
      />

      {/* =====================================================
          FUTURISTIC GRID FLOOR
          ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10%",
          right: "-10%",
          bottom: "-22%",
          height: "58%",
          zIndex: -6,
          pointerEvents: "none",

          background: `
            linear-gradient(
              rgba(255, 20, 20, 0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 20, 20, 0.07) 1px,
              transparent 1px
            )
          `,

          backgroundSize: "70px 70px",

          transform: `
            perspective(700px)
            rotateX(65deg)
            scale(1.5)
          `,

          transformOrigin: "center bottom",

          opacity: 0.35,

          maskImage: `
            linear-gradient(
              to top,
              black 0%,
              rgba(0,0,0,0.8) 30%,
              transparent 90%
            )
          `,

          WebkitMaskImage: `
            linear-gradient(
              to top,
              black 0%,
              rgba(0,0,0,0.8) 30%,
              transparent 90%
            )
          `,
        }}
      />

      {/* =====================================================
          RED NETWORK / DATA FLOW
          ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10%",
          bottom: "3%",
          width: "120%",
          height: "35%",
          zIndex: -5,
          pointerEvents: "none",

          transform: "rotate(-7deg)",

          background: `
            repeating-linear-gradient(
              -8deg,
              transparent 0px,
              transparent 28px,
              rgba(255, 0, 0, 0.09) 29px,
              transparent 30px
            )
          `,

          opacity: 0.8,

          maskImage: `
            linear-gradient(
              to top,
              black,
              transparent
            )
          `,

          WebkitMaskImage: `
            linear-gradient(
              to top,
              black,
              transparent
            )
          `,
        }}
      />

      {/* =====================================================
          RED HORIZONTAL LIGHT
          ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "5%",
          top: "65%",
          width: "300px",
          height: "1px",
          zIndex: -4,
          pointerEvents: "none",

          background: `
            linear-gradient(
              90deg,
              transparent,
              #ff1616,
              transparent
            )
          `,

          boxShadow: `
            0 0 8px rgba(255, 0, 0, 0.8),
            0 0 25px rgba(255, 0, 0, 0.35)
          `,

          opacity: 0.8,
        }}
      />

      {/* =====================================================
          RED LIGHT POINTS
          ===================================================== */}

      {[
        { left: "15%", top: "78%" },
        { left: "27%", top: "86%" },
        { left: "39%", top: "80%" },
        { left: "52%", top: "88%" },
        { left: "64%", top: "75%" },
        { left: "78%", top: "82%" },
        { left: "90%", top: "67%" },
      ].map((point, index) => (
        <div
          key={index}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: point.left,
            top: point.top,

            width: "3px",
            height: "3px",

            borderRadius: "50%",

            background: "#ff2222",

            boxShadow: `
              0 0 5px #ff2222,
              0 0 15px rgba(255, 0, 0, 0.8),
              0 0 30px rgba(255, 0, 0, 0.3)
            `,

            opacity: 0.7,

            zIndex: -3,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* =====================================================
          BLACK VIGNETTE
          ===================================================== */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          pointerEvents: "none",

          background: `
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.65) 0%,
              rgba(0, 0, 0, 0.25) 35%,
              transparent 65%
            ),
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.45) 0%,
              transparent 25%,
              transparent 75%,
              rgba(0, 0, 0, 0.65) 100%
            )
          `,
        }}
      />

      {/* =====================================================
          EXISTING HERO CONTENT
          ===================================================== */}

      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="wide">
          <div
            style={{
              position: "relative",
              zIndex: 3,
            }}
          >

            <HeroTitleTypewriter />

            {/* Existing globe/image can remain in your current layout */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "8rem",
                width: "50%",
                height: "70vh",
              }}
            >
              <Image
                src="/images/homepage/heroimagess.png"
                alt="Globe visualising Zeta's global reach across 150+ markets with 15+ years of experience"
                fill
                priority
                sizes="(min-width: 2200px) 44vw, (min-width: 1600px) 42vw, (min-width: 1024px) 40vw, 80vw"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}