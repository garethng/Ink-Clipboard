import {ClipboardDataType} from '../types/clipboarddatatype';
import { createContext } from 'react';

const RefreshLoadingContext = createContext({
    isLoading: false,
    setLoading: (loading: boolean) => { },
    data:[] as ClipboardDataType[] | null,
    setData: (data: ClipboardDataType[]) => { }

});
  
export default RefreshLoadingContext;