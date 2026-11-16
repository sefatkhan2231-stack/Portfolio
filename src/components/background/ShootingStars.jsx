import { useEffect, useRef } from "react";

export default function ShootingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrameId;
    let stars = [];
    let w = 0;
    let h = 0;

    // Setting canvas.width resets the context state, so everything that
    // depends on it is re-applied here on every resize.
    const setCanvasSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.globalCompositeOperation = "lighter";
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Shorter, less frequent streaks on small screens
    const createStar = () => {
      const scale = Math.max(0.6, Math.min(1, w / 1280));
      return {
        x: Math.random() * w,
        y: Math.random() * (h / 2), // Start in upper half
        length: (Math.random() * 80 + 20) * scale,
        speed: (Math.random() * 10 + 5) * scale,
        opacity: 1,
        // Angles it slightly downward and to the right
        vx: Math.random() * 4 + 4,
        vy: Math.random() * 2 + 2,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      const spawnChance = w < 768 ? 0.01 : 0.02;
      if (Math.random() < spawnChance) {
        stars.push(createStar());
      }

      // Iterate backwards so removing a star never skips the next one
      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.x += star.speed;
        star.y += (star.speed * star.vy) / star.vx;
        star.opacity -= 0.01; // Fade out over time

        if (star.opacity <= 0 || star.x > w || star.y > h) {
          stars.splice(i, 1);
          continue;
        }

        const tailX = star.x - star.length;
        const tailY = star.y - (star.length * star.vy) / star.vx;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(124, 246, 255, ${star.opacity})`);
        gradient.addColorStop(1, "rgba(124, 246, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
