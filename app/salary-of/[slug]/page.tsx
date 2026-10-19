import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  Building2,
  Award,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  Calculator,
  ChevronRight,
} from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ShareAndPrint from '@/components/ShareAndPrint';
import { POPULAR_POSTS, PostSalaryProfile } from '@/lib/pay-data';
import { calculate8thCPCSalary, CityClass } from '@/lib/cpc-calculator';
import type { Metadata } from 'next';
import { FormatINR, RupeeIcon } from '@/components/Rupee';
import PrintReport from '@/components/PrintReport';

export function generateStaticParams() {
  return POPULAR_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POPULAR_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: 'Post Salary Profile Not Found | GovPay TrueFunds',
      description: 'The requested Central Government post salary profile could not be found.',
    };
  }

  const title = `${post.title} Salary after 8th Pay Commission - Level ${post.level} Pay Breakdown`;
  const description = `Detailed 8th CPC projected salary for ${post.title} under ${post.department}. Level ${post.level} (Grade Pay ${post.gradePay}), estimated in-hand salary, allowances, and allowances across X, Y, Z cities.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://govpay.truefunds.co.in/salary-of/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://govpay.truefunds.co.in/salary-of/${post.slug}`,
      siteName: 'GovPay TrueFunds',
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${post.title} 8th Pay Commission Salary Structure`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POPULAR_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Pre-calculate salaries across city classes
  const calcMetro = calculate8thCPCSalary({
    level: post.level,
    basic7th: post.entryBasic7th,
    fitmentFactor: 2.57,
    cityClass: 'X',
  });

  const calcTier2 = calculate8thCPCSalary({
    level: post.level,
    basic7th: post.entryBasic7th,
    fitmentFactor: 2.57,
    cityClass: 'Y',
  });

  const calcRural = calculate8thCPCSalary({
    level: post.level,
    basic7th: post.entryBasic7th,
    fitmentFactor: 2.57,
    cityClass: 'Z',
  });

  const scenarios = [1.92, 2.15, 2.57, 2.86].map((ff) => ({
    factor: ff,
    calc: calculate8thCPCSalary({
      level: post.level,
      basic7th: post.entryBasic7th,
      fitmentFactor: ff,
      cityClass: 'X',
    }),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/salary-of" className="hover:underline">Salary by Post</Link>
            <span>/</span>
            <span>{post.title}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            {post.title} Salary (7th & 8th Pay Commission)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pay Level {post.level} &bull; Grade Pay {post.gradePay} &bull; Group {post.group} &bull; {post.department}
          </p>
        </div>

        <ShareAndPrint title={`${post.title} Salary Breakdown`} />
      </div>

      <DisclaimerBanner />

      {/* Main Grid: Details + City Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Key Numbers & City Tiers (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top In-Hand Summary Card */}
          <div className="bg-linear-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Entry Pay Overview (Level {post.level})
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full font-bold">
                7th CPC Entry: <FormatINR value={post.entryBasic7th} />
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-[11px] text-slate-300">Class X (Metro) In-Hand</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">
                  <FormatINR value={calcMetro.inHand7th} />
                </div>
                <div className="text-[10px] text-blue-200">
                  8th: <FormatINR value={calcMetro.inHand8th} />
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-[11px] text-slate-300">Class Y (Tier-2) In-Hand</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">
                  <FormatINR value={calcTier2.inHand7th} />
                </div>
                <div className="text-[10px] text-blue-200">
                  8th: <FormatINR value={calcTier2.inHand8th} />
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-[11px] text-slate-300">Class Z (Rural) In-Hand</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">
                  <FormatINR value={calcRural.inHand7th} />
                </div>
                <div className="text-[10px] text-blue-200">
                  8th: <FormatINR value={calcRural.inHand8th} />
                </div>
              </div>
            </div>
          </div>

          {/* 8th CPC Scenario Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h2 className="font-bold text-slate-900 text-base">
                8th Pay Commission Projections for {post.title}
              </h2>
              <p className="text-xs text-slate-500">
                Comparison across conservative (1.92), moderate (2.15), standard (2.57), and union demand (2.86)
              </p>
            </div>

            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Fitment Factor</th>
                  <th className="py-3 px-4 text-right">Projected Basic</th>
                  <th className="py-3 px-4 text-right">Gross Salary (X)</th>
                  <th className="py-3 px-4 text-right text-emerald-800 font-black">In-Hand Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scenarios.map(({ factor, calc }) => (
                  <tr key={factor} className={factor === 2.57 ? 'bg-blue-50/60 font-bold' : ''}>
                    <td className="py-3 px-4">
                      {factor.toFixed(2)}x
                      {factor === 2.57 && (
                        <span className="ml-2 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-800">
                      <FormatINR value={calc.projectedBasic8th} />
                    </td>
                    <td className="py-3 px-4 text-right text-slate-800">
                      <FormatINR value={calc.gross8th} />
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-700 font-bold">
                      <FormatINR value={calc.inHand8th} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Custom Calculator Link */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-blue-900">
                Want to customize allowances or seniority stage?
              </div>
              <div className="text-xs text-blue-700">
                Open full calculator pre-configured for Level {post.level}
              </div>
            </div>
            <Link
              href={`/calculator?level=${post.level}&basic=${post.entryBasic7th}`}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>Open Calculator</span>
            </Link>
          </div>
        </div>

        {/* Right: Job Profile, Career & Allowances (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span>Post Information & Recruitment</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block">Department / Ministry:</span>
                <span className="text-slate-600">{post.department}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Recruitment Exam:</span>
                <span className="text-slate-600">{post.typicalRecruitment}</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Post Classification:</span>
                <span className="text-slate-600">Central Civil Services Group {post.group}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="font-bold text-slate-900 text-xs block">Key Responsibilities & Allowances:</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {post.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Career Hierarchy */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Career Progression Ladder</span>
            </h2>

            <div className="space-y-2">
              {post.careerProgression.map((stage, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                    idx === 0
                      ? 'bg-blue-50 text-blue-900 border border-blue-200'
                      : 'bg-slate-50 text-slate-700 border border-slate-100'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
