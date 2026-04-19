import Link from "next/link";
import { GradientText } from "@/components/shared/GlassComponents";

export default function NotFound() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-8xl font-bold mb-4">
          <GradientText>404</GradientText>
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Page not found
        </h1>
        <p className="text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-accent-purple text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
