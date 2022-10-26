// import { SelectOption } from "components/Form";
import { UnknownObj } from "lib/types";
import { useMemo } from "react";
import { useQuery } from "react-query";

export type SelectOption = {
  label: string;
  value: unknown;
};

export type UseSelectQueryReturn = {
  options: SelectOption[];
};

export type UseSelectQueryOptions<T> = {
  endpoint?: string;
  params?: UnknownObj;
  labelValueKeys: any;
  enabled?: boolean;
};

function useSelectQuery<T extends UnknownObj>({
  endpoint,
  params,
  labelValueKeys,
  enabled,
}: UseSelectQueryOptions<T>) {
  const { data, ...queryResult } = useQuery<{ data: T[] }>([endpoint, params], {
    enabled,
  });

  const options = useMemo<SelectOption[]>(() => {
    if (!data) return [];
    return (data.data || []).map((el) => ({
      label: el[labelValueKeys[0]] as string,
      value: el[labelValueKeys[1]],
    }));
  }, [data, labelValueKeys]);

  const disabledOptions = useMemo(() => {
    if (!data) return [];
    return (data.data || [])
      .map((el) => el.deleted_at && el.id)
      .filter(Boolean);
  }, [data]);

  return { options, disabledOptions, ...queryResult };
}

export { useSelectQuery };
