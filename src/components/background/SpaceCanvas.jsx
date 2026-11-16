import { useEffect, useRef } from "react";

export default function UnifiedSpaceCanvas() {
  const canvasRef = useRef(null);

  const mx = useRef(0);
  const my = useRef(0);
  const curX = useRef(0);
  const curY = useRef(0);
  const wRef = useRef(0);
  const hRef = useRef(0);
  const rafId = useRef(null);

  const planetAssets = {
    Mars: "/assets/planets/mars.png",
    Earth: "/assets/planets/earth.png",
    Jupiter: "/assets/planets/jupiter.png",
    Saturn: "/assets/planets/saturn.png",
    Uranus: "/assets/planets/uranus.png",
    Neptune: "/assets/planets/neptune.png",
  };

  const basePlanetSizes = {
    Mars: 30,
    Earth: 34,
    Jupiter: 68,
    Saturn: 62,
    Uranus: 45,
    Neptune: 44,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let cancelled = false;
    let stars = [];
    let planets = [];
    let shootingStars = [];
    const loadedImages = {};

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const starColors = ["#ffffff", "#ffe9c4", "#d4fbff", "#ffd5d5", "#fff4bd"];
    const shootingStarColors = ["#00f2ff", "#ff00ea", "#ffffff", "#ffd700"];

    /* ------------ responsive helpers ------------ */

    // Evaluated live so rotating / resizing a device updates behaviour
    const isMobile = () =>
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      wRef.current < 768;

    // Planets scale smoothly with the viewport width (0.6x phone -> 1x desktop)
    const planetScale = () =>
      Math.min(1, Math.max(0.6, wRef.current / 1280));

    // Star density follows screen area instead of a fixed count
    const starCountFor = (w, h) =>
      Math.round(Math.min(900, Math.max(150, (w * h) / 2200)));

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      wRef.current = w;
      hRef.current = h;

      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const randomPos = (r) => ({
      x: Math.random() * Math.max(1, wRef.current - r * 4) + r * 2,
      y: Math.random() * Math.max(1, hRef.current - r * 4) + r * 2,
    });

    const loadImages = () =>
      Promise.all(
        Object.entries(planetAssets).map(
          ([name, src]) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                loadedImages[name] = img;
                resolve();
              };
              // A missing image must not block the whole canvas
              img.onerror = resolve;
              img.src = src;
            }),
        ),
      );

    const createShootingStar = () => {
      const scale = Math.min(1, wRef.current / 1280);
      return {
        x: Math.random() * wRef.current,
        y: Math.random() * (hRef.current * 0.5),
        len: (Math.random() * 100 + 80) * Math.max(0.6, scale),
        size: Math.random() * 2 + 1,
        speed: Math.random() * 14 + 10,
        color:
          shootingStarColors[
            Math.floor(Math.random() * shootingStarColors.length)
          ],
        opacity: 1,
      };
    };

    const planetGlow = (name) =>
      ({
        Earth: "#2b82c9",
        Mars: "#ff4d4d",
        Jupiter: "#e3bb76",
        Saturn: "#f4e4bc",
        Uranus: "#b2ffff",
      })[name] || "#4b70dd";

    /* ------------ init (runs once) ------------ */

    const init = async () => {
      resizeCanvas();
      await loadImages();
      if (cancelled) return;

      const w = wRef.current;
      const h = hRef.current;

      stars = Array.from({ length: starCountFor(w, h) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speed: Math.random() * 0.03 + 0.01,
        parallax: Math.random() * 1.5 + 0.4,
        opacity: Math.random(),
        twinkle: Math.random() * 0.01 + 0.003,
      }));

      const scale = planetScale();

      planets = Object.keys(planetAssets).map((name) => {
        const r = basePlanetSizes[name] * scale;
        const pos = randomPos(r);

        return {
          name,
          size: basePlanetSizes[name],
          r,
          baseX: pos.x,
          baseY: pos.y,
          pMult: isMobile() ? 0.08 : Math.random() * 0.25 + 0.1,
          glow: planetGlow(name),
          floatSpeed: Math.random() * 0.002 + 0.001,
          floatPhase: Math.random() * Math.PI * 2,
        };
      });
    };

    /* ------------ resize: keep the scene, just rescale it ------------ */

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const prevW = wRef.current || window.innerWidth;
        const prevH = hRef.current || window.innerHeight;

        resizeCanvas();

        const sx = wRef.current / prevW;
        const sy = hRef.current / prevH;
        const scale = planetScale();

        stars.forEach((s) => {
          s.x *= sx;
          s.y *= sy;
        });
        planets.forEach((p) => {
          p.baseX *= sx;
          p.baseY *= sy;
          p.r = p.size * scale;
        });
      }, 150);
    };

    /* ------------ draw ------------ */

    const draw = () => {
      if (cancelled) return;
      ctx.clearRect(0, 0, wRef.current, hRef.current);

      curX.current += (mx.current - curX.current) * 0.05;
      curY.current += (my.current - curY.current) * 0.05;

      stars.forEach((s) => {
        s.y -= s.speed;
        if (s.y < 0) s.y = hRef.current;

        s.opacity += s.twinkle;
        if (s.opacity > 1 || s.opacity < 0.2) s.twinkle *= -1;

        ctx.beginPath();
        ctx.arc(
          s.x + curX.current * s.parallax,
          s.y + curY.current * s.parallax,
          s.r,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle =
          s.color +
          Math.floor(Math.min(1, Math.max(0, s.opacity)) * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });

      planets.forEach((p) => {
        const img = loadedImages[p.name];
        if (!img) return;

        p.floatPhase += p.floatSpeed;

        const px =
          p.baseX + Math.sin(p.floatPhase) * 10 + curX.current * p.pMult;
        const py =
          p.baseY + Math.cos(p.floatPhase) * 10 + curY.current * p.pMult;

        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = p.glow;
        ctx.drawImage(img, px - p.r, py - p.r, p.r * 2, p.r * 2);
        ctx.restore();
      });

      if (!isMobile() && Math.random() < 0.02)
        shootingStars.push(createShootingStar());

      // Iterate backwards so splicing never skips an entry
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.speed;
        s.y += s.speed * 0.5;
        s.opacity -= 0.02;
        if (s.opacity <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const g = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.len,
          s.y - s.len * 0.5,
        );
        g.addColorStop(0, s.color);
        g.addColorStop(1, "transparent");

        ctx.strokeStyle = g;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y - s.len * 0.5);
        ctx.stroke();
      }

      rafId.current = requestAnimationFrame(draw);
    };

    init().then(() => {
      if (!cancelled) draw();
    });

    /* ------------ input ------------ */

    const handlePointerMove = (x, y) => {
      mx.current = (x / wRef.current - 0.5) * 80;
      my.current = (y / hRef.current - 0.5) * 80;
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
}
