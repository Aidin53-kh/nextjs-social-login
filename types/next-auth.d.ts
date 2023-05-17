import { SessionContextValue } from "next-auth/react";

declare module "next-auth" {
    interface Session {
        user: {
            email: string;
            name: string;
            image?: string | null;
        };
    }
}

declare module "next-auth/react" {
    type SessionContextValue<R extends boolean = false> = R extends true
        ?
              | { update: UpdateSession; currentUser: Session["user"]; status: "authenticated"; fg: string }
              | { update: UpdateSession; currentUser: null; status: "loading"; fg: string }
        :
              | { update: UpdateSession; currentUser: Session["user"]; status: "authenticated"; fg: string }
              | {
                    update: UpdateSession;
                    currentUser: null;
                    status: "unauthenticated" | "loading";
                    fg: string;
                };
}
