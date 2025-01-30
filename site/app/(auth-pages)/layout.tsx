export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 grow items-center h-fit justify-center pb-20 px-4">{children}</div>
  );
}
