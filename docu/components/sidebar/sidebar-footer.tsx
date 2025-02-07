export default function SidebarFooter({children}: {children: React.ReactNode}) {
    return(
        <footer className="flex flex-col gap-1">
            {children}
        </footer>
    )
}