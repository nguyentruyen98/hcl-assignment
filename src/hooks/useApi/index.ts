import axios from 'axios';
import {AnyObject} from 'contants/type';
import {IApiProps, IUseApiProps} from 'hooks/useApi/index.d';

import {useEffect, useState} from 'react';

export const Api = async ({url, method = 'get', params, data}: IApiProps) => {
  try {
    const response = await axios({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      url,
      method,
      params,
      data,
    });
    return response && response.data;
  } catch (error) {
    // handle error here
    const dataResponse = 'Something went wrong. Please try again.';
    throw dataResponse;
  }
};

const useApi = ({
  url,
  method = 'get',
  params = {},
  loadInitialState = false,
}: IUseApiProps) => {
  const [data, setData] = useState<AnyObject | AnyObject[] | any>();
  const [currentUrl, setCurrentUrl] = useState(url);
  const [currentMethod, setCurrentMethod] = useState(method);
  const [currentParams, setCurrentParams] = useState(params);
  const [currentInitialState, setCurrectInitialState] =
    useState(loadInitialState);
  const [apiLoading, setApiLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  //   const dispatch = useApplicationDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // dispatch(setLoading(true));
        setApiLoading(true);
        const response = await Api({
          url,
          method: currentMethod,
          params: currentParams,
        });
        setData(response);
      } catch (error: any) {
        // handle error here
        const msg = error?.response.data.message ?? Error;
        setErrorMsg(msg);
      } finally {
        // dispatch(setLoading(false));
        // setApiLoading(false);
      }
    };
    if (currentInitialState) {
      fetchData();
    } else {
      setApiLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl, currentMethod, currentParams, currentInitialState, errorMsg]);
  return {
    data,
    apiLoading,
    setCurrentUrl,
    setCurrectInitialState,
    setCurrentMethod,
    setCurrentParams,
  };
};

export default useApi;
