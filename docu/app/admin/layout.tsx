export default function AdminLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-col gap-8 px-6 py-8 md:px-16 md:py-10">
            {children}
        </div>
    );
}