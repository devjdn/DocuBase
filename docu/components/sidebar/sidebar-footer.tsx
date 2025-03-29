export default function SidebarFooter({children}: {children: React.ReactNode}) {
    return(
        <footer className="flex flex-col gap-2 border-t border-border p-3">
            {children}
        </footer>
    )
}