import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import Image from 'next/image';
import loadDynamic from 'next/dynamic';
import { TestimonialComponent } from '@gitroom/frontend/components/auth/testimonial.component';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  const olittAppUrl = process.env.NEXT_PUBLIC_OLITT_APP_URL || '/';
  

  return (
    <div className="bg-[#0E0E0E] flex justify-center items-center flex-1 p-[12px] gap-[12px] min-h-screen w-screen text-white">
      {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
      <ReturnUrlComponent />
          <div className="flex justify-center items-center flex-col gap-4 text-start">
            <h1 className="text-[32px] font-[600]">Continue in Olitt</h1>
            <p className="text-[14px] text-[#cfcfcf] leading-6">
              Please return to Olitt to start your login again.
            </p>
            <div>
              <a
                href={olittAppUrl}
                className="inline-flex items-center justify-center px-4 py-3 rounded-[10px] bg-white text-black font-[600] hover:opacity-90 transition-opacity"
              >
                Back to Olitt
              </a>
            </div>
          </div>
    </div>
  );
}
