'use client';
import DetailedRequest from './components/oneRequest';
import CountDown from './components/countdown';
import GreetingCard from './components/greeting';
import MyCycle from './components/Requests/Cycles';
export default function ClientWrapper({ clever }) {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <GreetingCard clever={clever} />
          <CountDown />
        </div>
        <MyCycle clever={clever} />
      </div>
      <div className="m overflow-scroll gap-4 md:gap-8 lg:col-span-2">
        <DetailedRequest />
      </div>
    </main>
  );
}
