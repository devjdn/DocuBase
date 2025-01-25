import Sidebar from "@/components/sidebar/sidebar";

export default function DocumentationLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="w-full block md:grid md:grid-cols-[256px_1fr] grow">
            <Sidebar/>
            {children}
        </div>
    );
}