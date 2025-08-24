'use client';

import Results from '@components/results/Results';
import DetailedView from '@components/detailedView/DetailedView';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';

export default function MainContent() {
  const [selectedGameIdParam] = useCustomSearchParams('gameid');
  return (
    <div className="flex flex-1 gap-4 pb-16">
      <div className="flex-1">
        <Results />
      </div>

      {selectedGameIdParam && <DetailedView />}
    </div>
  );
}
