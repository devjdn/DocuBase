import HeaderWrapper from "@/components/header/header-wrapper";
import Hero from "@/components/ui/hero";

export default async function Home() {
  return (
    <>
      <HeaderWrapper/>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
      </main>
    </>
  );
}
