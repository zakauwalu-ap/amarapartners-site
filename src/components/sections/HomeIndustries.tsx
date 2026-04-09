// Home page — five industry previews linking to sector pages.

import Link from "next/link";
import { industries } from "@/data/navigation";

export function HomeIndustries() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-[8vw] py-[8vh]">
      <div className="mb-10">
        <p className="mb-3 font-body text-body-xs font-semibold uppercase tracking-[0.32em] text-wave-400">
          Industries
        </p>
        <h2 className="max-w-[24ch] font-heading text-display-md leading-[1.08] text-wave-700">
          Sector knowledge that precedes our engagement with you.
        </h2>
        <p className="mt-5 max-w-[52ch] font-body text-body-lg leading-relaxed text-shadow-grey">
          Deep industry understanding shapes how we structure advice and approach each mandate.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="group flex h-full flex-col rounded-card border border-wave-200/40 bg-wave-100/30 p-6 transition-all duration-300 hover:border-brand-gold/30 hover:bg-wave-100/50 hover:shadow-card-hover"
            aria-label={`Read more about ${industry.name}`}
          >
            <h3 className="mb-3 font-heading text-body-xl leading-tight text-wave-700 transition-colors duration-200 group-hover:text-wave-500">
              {industry.name}
            </h3>
            <p className="font-body text-body-sm leading-relaxed text-shadow-grey">
              {industry.description}
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/industries"
        className="mt-8 inline-flex w-fit font-body text-body-sm font-medium text-wave-400 underline-offset-4 transition-colors duration-200 hover:text-wave-500 hover:underline"
      >
        Read more →
      </Link>
    </div>
  );
}
