export default function StatCard({heading, value, icon}: {heading: string, value: string | number, icon?: React.ReactNode}){
    return (
        <div className="bg-secondary flex flex-col gap-2 p-6 rounded-2xl">
            <header className="flex flex-col gap-2">
                {icon}
                <p className="text-muted-foreground text-sm">{heading}</p>
            </header>
            <span className="text-xl md:text-3xl font-medium">{value}</span>
        </div>
    );
}