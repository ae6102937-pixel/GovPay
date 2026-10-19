import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retirement Gratuity & Leave Encashment Calculator | GovPay TrueFunds',
  description:
    'Calculate retirement/death gratuity up to Rs 25 Lakh ceiling under enhanced DA rules, and 300 days Earned Leave (EL) + HPL cash encashment.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/gratuity-leave',
  },
  openGraph: {
    title: 'Retirement Gratuity & Leave Encashment Calculator | GovPay TrueFunds',
    description:
      'Check statutory gratuity calculation (1/4th month emoluments per half-year) with the revised Rs 25L limit and 300 days leave encashment.',
    url: 'https://govpay.truefunds.co.in/gratuity-leave',
  },
};

export default function GratuityLeaveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
