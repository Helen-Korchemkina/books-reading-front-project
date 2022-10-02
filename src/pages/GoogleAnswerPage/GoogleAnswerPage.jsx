import { useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";

const GoogleAnswerPage = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        window.localStorage.setItem('token', JSON.stringify(token));
    }, [searchParams]);

    return( <Navigate to="/" replace="true" />)
};

export default GoogleAnswerPage;