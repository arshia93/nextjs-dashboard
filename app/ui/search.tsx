'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  // accesses the parameters of current url '{page: '1', query: 'pending'}' from /dashboard/invoices?page=1&query=pending
  const searchParams = useSearchParams();
  // read the current URL's pathname '/dashboard/invoices
  const pathname = usePathname();
  //
  const { replace } = useRouter();

  function handleSearch(term: string) {
    console.log(`Searching... ${term}`);
    // get the current search parameters
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    // set the parameters based on user's input
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // update the URL based on entry: pathname is the current path ie '/dashboard/invoices' and params.toString() turns entry ie "lee" into /dashboard/invoices?query=lee
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        // ensures the url and search input match when sharing url by default
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
