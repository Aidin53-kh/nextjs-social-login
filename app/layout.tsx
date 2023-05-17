import "~/styles/globals.css";

import { LoginModal, RegisterModal } from "~/components/modals";
import Navbar from "~/components/navbar/Navbar";
import Providers from "~/providers/Providers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body>
                <Providers> 
                    <RegisterModal />
                    <LoginModal />
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
