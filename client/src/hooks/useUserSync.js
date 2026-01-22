import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation} from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

function useUserSync() {
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const { mutate:syncUserMutation, isPending, isSuccess } = useMutation({mutationFn: syncUser});

    useEffect(() => {
        if(isSignedIn && user && !isPending && !isSuccess) {
            syncUserMutation({
                email: user.primaryEmailAddress?.emailAddress,
        });
        }
    },[]);

    return {};
}

export default useUserSync;