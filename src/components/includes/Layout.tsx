import { ReactNode } from 'react';
import Head from 'next/head';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export function Layout({ children, title }: LayoutProps) {
    const pageTitle = title ? `${title} - Crud Base` : 'Crud Base';

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Head>
                <title>{pageTitle}</title>
            </Head>

            {/* Sidebar Fixa */}
            <Sidebar />

            {/* Conteúdo Principal com compensação de margem para a Sidebar */}
            <main className="flex-1 w-full lg:pl-64 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
