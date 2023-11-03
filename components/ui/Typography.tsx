import { cn } from "@/lib/utils";

function H1({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl",
        className
      )}
    >
      {children}
    </p>
  );
}

function H2({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        " font-extrabold text-[max(48px,min(2vw,76px))] leading-none -tracking-wider gradient-text inline-block text-transparent bg-clip-text  ",
        className
      )}
    >
      {children}
    </p>
  );
}

function H3({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}

function H4({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </p>
  );
}

function Paragraph({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={cn("leading-7 ", className)}>{children}</p>;
}

function Lead({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}

export { H1, H2, H3, H4, Paragraph, Lead };
