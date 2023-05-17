"use client";

import { useUser } from "~/hooks";

import Container from "~/components/Container";
import SimpleErrorView from "~/components/SimpleErrorView";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { status } = useUser();

    if (status === "loading") {
        return <SimpleErrorView title="Authenticating..." />;
    }

    if (status === "unauthenticated") {
        return <SimpleErrorView title="401 | Unauthenticated" />;
    }

    return (
        <Container className="mt-4 px-5">
            <div className="flex gap-12">
                <DashboardSidebar />

                <main className="grow">{children}</main>
            </div>
        </Container>
    );
}
