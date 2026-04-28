"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GradientButton, GradientText } from "@/components/shared/GlassComponents";
import { useTheme } from "@/lib/ThemeContext";

const graphNodes = [
  { id: "ec2", label: "EC2", x: 180, y: 60, type: "compute" },
  { id: "rds", label: "RDS", x: 60, y: 160, type: "database" },
  { id: "s3", label: "S3", x: 300, y: 120, type: "storage" },
  { id: "k8s", label: "K8s", x: 140, y: 260, type: "compute" },
  { id: "vpc", label: "VPC", x: 60, y: 40, type: "network" },
  { id: "dns", label: "DNS", x: 280, y: 240, type: "network" },
  { id: "lb", label: "ELB", x: 340, y: 40, type: "network" },
  { id: "iam", label: "IAM", x: 20, y: 280, type: "security" },
];

const graphEdges: [string, string][] = [
  ["vpc", "ec2"], ["ec2", "rds"], ["ec2", "s3"], ["lb", "ec2"],
  ["k8s", "ec2"], ["k8s", "rds"], ["dns", "lb"], ["iam", "k8s"],
];

const nodePalettes: Record<string, { fill: string; stroke: string; text: string; glow: string }> = {
  compute: { fill: "rgba(6, 182, 212, 0.12)", stroke: "rgba(6, 182, 212, 0.4)", text: "#22D3EE", glow: "rgba(6, 182, 212, 0.15)" },
  database: { fill: "rgba(139, 92, 246, 0.12)", stroke: "rgba(139, 92, 246, 0.4)", text: "#A78BFA", glow: "rgba(139, 92, 246, 0.15)" },
  storage: { fill: "rgba(245, 158, 11, 0.12)", stroke: "rgba(245, 158, 11, 0.4)", text: "#FBBF24", glow: "rgba(245, 158, 11, 0.15)" },
  network: { fill: "rgba(16, 185, 129, 0.12)", stroke: "rgba(16, 185, 129, 0.4)", text: "#34D399", glow: "rgba(16, 185, 129, 0.15)" },
  security: { fill: "rgba(239, 68, 68, 0.12)", stroke: "rgba(239, 68, 68, 0.4)", text: "#F87171", glow: "rgba(239, 68, 68, 0.15)" },
};

export function HeroGraph() {
  const { theme } = useTheme();
  const isNexus = theme === "nexus";
  const edgeColor = isNexus ? "rgba(6, 182, 212, 0.25)" : "rgba(99, 102, 241, 0.3)";
  const centerGlow = isNexus ? "#06B6D4" : "#6366F1";

  return (
    <div className="relative w-full h-[350px] md:h-[420px]">
      <svg viewBox="0 0 380 320" className="w-full h-full" aria-hidden="true">
        {/* Background glow */}
        <ellipse cx={180} cy={160} rx={160} ry={140} fill={centerGlow} opacity={isNexus ? 0.06 : 0.04} />
        <defs>
          {Object.entries(nodePalettes).map(([type, colors]) => (
            <radialGradient key={type} id={`node-glow-${type}`}>
              <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.3" />
              <stop offset="100%" stopColor={colors.stroke} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>
        {/* Edges */}
        {graphEdges.map(([from, to], i) => {
          const a = graphNodes.find((n) => n.id === from)!;
          const b = graphNodes.find((n) => n.id === to)!;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={edgeColor}
              strokeWidth={isNexus ? 1.2 : 1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: "easeOut" }}
            />
          );
        })}
        {/* Nodes */}
        {graphNodes.map((node, i) => {
          const palette = nodePalettes[node.type] || nodePalettes.compute;
          return (
            <g key={node.id}>
              {/* Glow ring */}
              <motion.circle cx={node.x} cy={node.y} r={32} fill={`url(#node-glow-${node.type})`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
              <motion.circle cx={node.x} cy={node.y} r={22}
                fill={palette.fill} stroke={palette.stroke} strokeWidth={isNexus ? 1.2 : 1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "backOut" }}
              />
              <motion.text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle"
                fill={palette.text} fontSize={10} fontWeight={600} fontFamily="var(--font-jetbrains)"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}>
                {node.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Hero() {
  const { theme } = useTheme();
  const isNexus = theme === "nexus";
  const tagline = isNexus ? "The Nexus · AI-powered infrastructure intelligence" : "Early access · Design partner program open";

  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] ${isNexus ? 'bg-cyan-600/10' : 'bg-primary-600/10'}`} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className={`inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border ${isNexus ? 'bg-cyan-900/20 text-cyan-400 border-cyan-500/20' : 'bg-primary-600/10 text-primary-400 border-primary-600/20'}`}>
                {tagline}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Your infrastructure has a story.{" "}
              <GradientText>Let us tell it.</GradientText>
            </motion.h1>

            <motion.p
              className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isNexus
                ? "See every resource, every connection, every dependency across your multi-cloud infrastructure. Auto-documented, always current, queryable in natural language."
                : "Automatically discover, map, and document every resource across your clouds, clusters, and networks. Compliance-ready documentation that never goes stale."
              }
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GradientButton href="/contact?kind=demo">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </GradientButton>
              <GradientButton href="/demo" variant="outline">
                See Live Demo
              </GradientButton>
              <GradientButton href="https://demo.knowledgetree.dev/dashboard" variant="outline">
                Open Dashboard
              </GradientButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HeroGraph />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
