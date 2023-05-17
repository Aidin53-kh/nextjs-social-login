import { Session } from "next-auth";
import { useSession } from "next-auth/react";

type UpdateSession = (data?: any) => Promise<Session | null>;

type SessionContextValue<R extends boolean = false> = R extends true
    ?
          | { update: UpdateSession; currentUser: Session["user"]; status: "authenticated" }
          | { update: UpdateSession; currentUser: null; status: "loading" }
    :
          | { update: UpdateSession; currentUser: Session["user"]; status: "authenticated" }
          | {
                update: UpdateSession;
                currentUser: null;
                status: "unauthenticated" | "loading";
            };

export const useUser = () => {
    const { data, status, update } = useSession();

    return { currentUser: data?.user, status, update } as SessionContextValue;
};
