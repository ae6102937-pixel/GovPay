import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary by Post & Designation (7th & 8th Pay Commission) | GovPay TrueFunds',
  description:
    'Explore salary profiles, pay levels, allowances, duties, and promotional hierarchy for Central Armed Police (CAPF), SSC CGL, Railways, Teachers, and Civil Services.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/salary-of',
  },
  openGraph: {
    title: 'Central Government Salary by Post & Designation | GovPay TrueFunds',
    description:
      'Detailed role-by-role salary and career progression directory across CAPF, Railways, Ministries, Defence, and Civil Services.',
    url: 'https://govpay.truefunds.co.in/salary-of',
  },
};

export default function SalaryOfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
