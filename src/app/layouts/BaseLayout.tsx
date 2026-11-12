import { Outlet } from "react-router";
import { useEffect } from "react";
import { Toaster } from "@/shared/ui/sonner";
import { initializeAuth } from "@/entities/session";
import { AdminSetupDialog} from "@/features/admin-setup";
import { useSystemSetup} from "@/entities/system";

export function BaseLayout() {
    const { needsSetup, setNeedsSetup } = useSystemSetup();

    useEffect(() => {
        void initializeAuth();
    }, []);

    return (
        <>
            <AdminSetupDialog
                isOpen={needsSetup}
                onComplete={() => setNeedsSetup(false)}
            />
            <Outlet />
            <Toaster richColors position="bottom-right" />
        </>
    );
}