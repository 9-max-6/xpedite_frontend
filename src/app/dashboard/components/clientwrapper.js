'use client';
import DetailedRequest from './request';
import CountDown from './countdown';
import GreetingCard from './greeting';
import Cycles from './Requests/Cycles';
import { useState } from 'react';

export default function ClientWrapper({ clever }) {
  const [filters, setfilters] = useState('');
  const [detailedId, setdetailedId] = useState('');

  const props = {
    filters: filters,
    setfilters: setfilters,
    clever: clever,
    setdetailedId: setdetailedId,
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <GreetingCard clever={clever} />
          <CountDown />
        </div>
        <Cycles props={props} />
      </div>
      <div className="overflow-scroll gap-4 md:gap-8 lg:col-span-2">
        <DetailedRequest
          id={detailedId}
          setdetailedId={setdetailedId}
          supercycle={clever.supercycle.id}
          user={clever.user}
        />
      </div>
    </main>
  );
}
