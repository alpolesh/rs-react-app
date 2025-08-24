import { useSearchParams, useRouter } from 'next/navigation';

function useCustomSearchParams(paramKey: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get(paramKey) || '';

  const setParamToExistedParams = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramKey, value);
    router.push(`?${newParams.toString()}`);
  };

  return [searchParam, setParamToExistedParams] as const;
}

export default useCustomSearchParams;
