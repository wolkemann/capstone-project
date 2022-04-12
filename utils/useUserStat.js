/* ==========================

Importing Libraries

============================*/
import useSWR from "swr";
import { useEffect, useState } from "react";

/**
 * useUserStat fetches from the API the data required and returns them as a number
 *
 * @param {String} authorId
 * @param {String} apiRoot
 * @returns
 */

export default function useUserStat(authorId, apiRoot) {
  const { data: stat } = useSWR(`/api/${apiRoot}/?authorid=${authorId}`);
  const [data, setData] = useState(stat);

  useEffect(() => {
    setData(stat);
  }, [stat]);

  if (data) {
    return data.length;
  } else {
    return 0;
  }
}
