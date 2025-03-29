export default function SidebarHeader({children}: {children?: React.ReactNode}) {
    return(
        <header className="flex flex-col gap-2 p-3 border-b border-border">
            {children}
        </header>
    );
}