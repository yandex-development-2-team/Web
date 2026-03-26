interface SectionLayoutProps extends React.PropsWithChildren {
  title: string;
}

export function SectionLayout({ title, children }: SectionLayoutProps) {
  return (
    <section className="bg-card rounded-lg p-5">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
