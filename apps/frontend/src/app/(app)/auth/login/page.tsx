export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Olitt' : 'Gitroom'} Login`,
  description: '',
};
export default async function Auth() {
  const olittAppUrl = process.env.NEXT_PUBLIC_OLITT_APP_URL || '/';

  return (
    <div className="flex flex-col gap-4 text-start">
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
  );
}
