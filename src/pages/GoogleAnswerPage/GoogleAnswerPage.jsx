import { useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToken } from "redux/auth/authSlice";

const GoogleAnswerPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = searchParams.get('token');
        dispatch(addToken(token));
    }, [dispatch, searchParams]);

    return( <Navigate to="/" replace="true" />)
};

export default GoogleAnswerPage;
