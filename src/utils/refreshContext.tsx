import { createContext } from 'react';

const RefreshLoadingContext = createContext({
    isLoading: false,
    setLoading: (loading: boolean) => {},
});
  
export default RefreshLoadingContext;