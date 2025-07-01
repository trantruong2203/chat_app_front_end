import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './stores/store';
import { getUsers } from './features/users/userThunks';


function Fetcher() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    return null;
}

export default Fetcher;