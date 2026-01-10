'use client';

import { useVariables } from '@gitroom/react/helpers/variable.context';

export const Logo = () => {
  const { olittAppUrl } = useVariables();

  if (!olittAppUrl) return null;

  return (
    <a
      href={olittAppUrl}
      className="mt-[8px] inline-flex items-center justify-center gap-[8px] text-[13px] font-[600] text-newTextColor bg-newBgColorInner border border-blockSeparator rounded-[10px] py-[10px] px-[12px] hover:bg-newBgLineColor transition-colors"
    >
      <span aria-hidden="true">&larr;</span>
      Back to Olitt
    </a>
  );
};
