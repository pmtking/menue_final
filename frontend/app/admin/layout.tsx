// app/admin/layout.tsx


import {AdminAuthProvider} from "@/hooks/AdminAuthContext";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <AdminAuthProvider>
            {children}
        </AdminAuthProvider>
    );
}