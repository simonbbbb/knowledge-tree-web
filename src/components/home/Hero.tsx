"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GradientButton, GradientText } from "@/components/shared/GlassComponents";

const graphNodes = [
  { id: "ec2", label: "EC2", x: 180, y: 60 },
  { id: "rds", label: "RDS", x: 60, y: 160 },
  { id: "s3", label: "S3", x: 300, y: 120 },
  { id: "k8s", label: "K8s", x: 140, y: 260 },
  { id: "vpc", label: "VPC", x: 60, y: 40 },
  { id: "dns", label: "DNS", x: 280, y: 240 },
  { id: "lb", label: "ELB", x: 340, y: 40 },
  { id: "iam", label: "IAM", x: 20, y: 280 },
];

const graphEdges = [
  ["vpc", "ec2"],
  ["ec2", "rds"],
  ["ec2", "s3"],
  ["lb", "ec2"],
  ["k8s", "ec2"],
  ["k8s", "rds"],
  ["dns", "lb"],
  ["iam", "k8s"],
];

export function HeroGraph() {
  return (
    <div className="relative w-full h-[350px] md:h-[420px]">
      <svg viewBox="0 0 380 320" className="w-full h-full" aria-hidden="true">
        {/* Edges */}
        {graphEdges.map(([from, to], i) => {
          const a = graphNodes.find((n) => n.id === from)!;
          const b = graphNodes.find((n) => n.id === to)!;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: "easeOut" }}
            />
          );
        })}
        {/* Nodes */}
        {graphNodes.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={22}
              fill="rgba(79, 70, 229, 0.15)"
              stroke="rgba(99, 102, 241, 0.5)"
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "backOut" }}
            />
            <motion.text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#A5B4FC"
              fontSize={10}
              fontWeight={600}
              fontFamily="var(--font-jetbrains)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-dark to-bg-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-600/10 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary-600/10 text-primary-400 border border-primary-600/20">
                Early access · Design partner program open
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
              Automatically discover, map, and document every resource across
              your clouds, clusters, and networks. Compliance-ready documentation
              that never goes stale.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GradientButton href="/demo">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </GradientButton>
              <GradientButton href="/pricing" variant="outline">
                View Pricing
              </GradientButton>
            </motion.div>
          </div>

          {/* Graph visualization */}
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
