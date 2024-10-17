import { cookies } from 'next/headers';
import axios from 'axios';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { redirect } from 'next/navigation';
import Requests from './components/requests';
import DetailedRequest from './components/oneRequest';
import CountDown from './components/countdown';
import GreetingCard from './components/greeting';

export const description =
  'An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.';

export default async function Dashboard({ searchParams }) {
  let user, token, supercycle;
  let supercycleId = searchParams.supercycleId;
  if (!supercycleId) {
    supercycleId = '';
  }

  try {
    const cookieStore = cookies();
    token = cookieStore.get('accessToken')?.value;

    const res = await axios.get(`${process.env.API_URL}api/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    user = res.data;
  } catch (e) {
    console.log('Dashboard hydration:', e.toString());
    redirect('/auth/login');
  }
  // get cycle
  try {
    const res = await axios.get(
      `${process.env.API_URL}api/cycles/super-cycles/${supercycleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    const superArray = res.data;
    console.log('Array', superArray);
    // check if supercycleId id specified in the request
    if (supercycleId === '') {
      supercycle = superArray.pop(0);
    } else {
      supercycle = superArray;
    }
  } catch (e) {
    console.log('Dashboard hydration:', e.toString());
  }

  const clever = {
    user: user,
    supercycle: supercycle,
    token: token,
  };

  return (
    <div className="flex relative flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <div className="z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recent requests</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <GreetingCard clever={clever} />
            <CountDown />
          </div>
          <Requests />
        </div>
        <div className="m overflow-scroll gap-4 md:gap-8 lg:col-span-2">
          <DetailedRequest />
        </div>
      </main>
    </div>
  );
}
