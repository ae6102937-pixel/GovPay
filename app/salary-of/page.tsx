import Link from 'next/link';
import { Users, ArrowRight, Shield, Award, Landmark, BookOpen } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { POPULAR_POSTS } from '@/lib/pay-data';
import { calculate8thCPCSalary } from '@/lib/cpc-calculator';

export const metadata = {
  title: 'Salary of Central Govt Posts (7th & 8th CPC) - GovPay TrueFunds',
  description:
    'Detailed in-hand salary, grade pay, allowances, and 8th Pay Commission projections for Constable GD, SSC CGL Inspector, Railway ALP, Teachers, and Defence Ranks.',
};

export default function SalaryOfIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Salary by Post</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
          Salary by Central Government Designation
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Detailed entry basic pay, Grade Pay equivalent, allowances, and 8th Pay Commission forecast for India&apos;s most searched government posts.
        </p>
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POPULAR_POSTS.map((post) => {
          const calc = calculate8thCPCSalary({
            level: post.level,
            basic7th: post.entryBasic7th,
            fitmentFactor: 2.57,
            cityClass: 'X',
          });

          return (
            <div
              key={post.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Level {post.level} &bull; GP {post.gradePay}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Group {post.group}</span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{post.department}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Entry Basic (7th):</span>
                    <span className="font-semibold text-slate-900">₹{post.entryBasic7th.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Current In-Hand (Metro):</span>
                    <span className="font-bold text-slate-900">₹{calc.inHand7th.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between text-blue-700 font-bold pt-1 border-t border-slate-200">
                    <span>8th CPC Projected In-Hand:</span>
                    <span>₹{calc.inHand8th.toLocaleString('en-IN')}/mo</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={`/salary-of/${post.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl text-xs transition-colors"
                >
                  <span>View Full Post Pay Scale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
