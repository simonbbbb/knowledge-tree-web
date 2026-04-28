"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/ThemeContext";

export function NexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== "nexus") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodeCount = 60;
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number; phase: number }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 1 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    let time = 0;

    function animate() {
      if (!canvas || !ctx) return;
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      time += 0.005;

      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Pulse effect
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + n.phase);
        const r = n.radius * (0.8 + 0.4 * pulse);

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${0.03 * pulse})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${0.3 + 0.3 * pulse})`;
        ctx.fill();
      });

      // Edges
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const opacity = 0.06 * (1 - dist / 220);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, [theme]);

  if (theme !== "nexus") return null;

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
  );
}
