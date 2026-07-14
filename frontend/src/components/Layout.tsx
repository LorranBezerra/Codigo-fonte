import type { ReactNode } from 'react';
import Sidebar from "../components/Siderbar";
import Header from "./Header";
import "../styles/Layout.css";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">

            <Sidebar />

            <div className="main">

                <Header />

                <main className="content">
                    {children}
                </main>

            </div>

        </div>
    );
}