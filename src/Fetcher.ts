import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './stores/store';
import { getUsers } from './features/users/userThunks';
import { ContextAuth } from './contexts/AuthContext';
import { getFriendShips } from './features/friendship/friendshipThunks';
import { getMessages } from './features/messages/messageThunks';


function Fetcher() {
    const dispatch = useDispatch<AppDispatch>();
    const { accountLogin } = useContext(ContextAuth);
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getFriendShips());        
        dispatch(getMessages());
    }, [dispatch, accountLogin?.email]);
    return null;
}

export default Fetcher;