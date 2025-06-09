const apiDataReducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      return { data: action.payload.data, loading: false, error: null };
    case 'error':
      return { data: null, loading: false, error: action.payload };
    default:
      throw new Error();
  }
};

const useApiData = (url, initialDelay = 1000, maxRetries = 3) => {
  const [state, dispatch] = useReducer(apiDataReducer, { data: null, loading: true, error: null });
  const retryCount = { current: 0 };

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      dispatch({ type: 'fetch', payload: response });
    } catch (error) {
      if (retryCount.current < maxRetries) {
        retryCount.current += 1;
        return;
      }
      dispatch({ type: 'error', payload: error });
    }
  };

  useInterval(fetchData, initialDelay * Math.pow(2, retryCount.current));

  useEffect(() => {
    fetchData();
  }, [url]);

  return state;
};

export default useApiData;

