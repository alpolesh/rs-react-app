import { useSearchParams } from 'react-router';

function useCustomSearchParams(paramKey: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get(paramKey) || '';

  const setParamToExistedParams = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramKey, value);
    setSearchParams(newParams);
  };

  return [searchParam, setParamToExistedParams] as const;
}

export default useCustomSearchParams;
