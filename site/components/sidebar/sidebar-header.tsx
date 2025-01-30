export default function SidebarHeader({children}: {children?: React.ReactNode}) {
    return(
        <header className="px-5 pt-5 pb-2">
            {children}
        </header>
    );
}