export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8 items-center justify-items-center w-full">
      {children}
    </div>
  );
}
