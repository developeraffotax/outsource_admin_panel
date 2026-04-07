import type { CSSProperties, ReactNode } from "react";
import Navbar from "./navbar.component";

type AdminShellLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const AdminShellLayout = ({
  title,
  subtitle,
  children,
}: AdminShellLayoutProps) => {
  const words = title.split(" ");

  return (
    <div className="cms-admin-page">
      <Navbar title={title} />

      <main className="cms-admin-main">
        <section
          className="cms-stage-hero"
          aria-label={`${title} editing studio`}
        >
          <p className="cms-stage-kicker">Content Studio</p>
          <h1 className="cms-stage-headline">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                style={{ "--cms-word-index": index } as CSSProperties}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="cms-stage-copy">{subtitle}</p>
          <div
            className="cms-stage-halo cms-stage-halo-one"
            aria-hidden="true"
          />
          <div
            className="cms-stage-halo cms-stage-halo-two"
            aria-hidden="true"
          />
        </section>

        {children}
      </main>
    </div>
  );
};

export default AdminShellLayout;
