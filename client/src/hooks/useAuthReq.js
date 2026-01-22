import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/axios.js";

let inInterceptorRegistered = false;
function useAuthReq() {
    const { isSignedIn, getToken, isLoaded } = useAuth();

    useEffect(() => {
        if (inInterceptorRegistered) return;
        inInterceptorRegistered = true;
        const interceptor = api.interceptors.request.use(async (config) => {
            if (isSignedIn) {
                const token = await getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        });

        return () => {
            api.interceptors.request.eject(interceptor);
            inInterceptorRegistered = false;
        }
    }, [isSignedIn, getToken]);

    return { isSignedIn, isClerkLoaded: isLoaded };
}
export default useAuthReq;