
type ButtonProps = {
  variant: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type: "button" | "submit";
  className?: string;
  ref?: React.Ref<HTMLButtonElement>
};

const Button = ({
  children,
  variant,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  ref
}: ButtonProps) => {
  function buttonStyle(variant: string) {
    if (variant === "primary") {
      return "bg-primary text-headline not-disabled:hover:bg-primary-hover";
    }
    if (variant === "secondary") {
      return "text-paragraph border border-border not-disabled:hover:bg-surface";
    }
    if (variant === "danger") {
      return "bg-danger text-headline not-disabled:hover:bg-danger-hover";
    }
    if (variant === "ghost") {
      return "text-muted border border-border not-disabled:hover:bg-surface";
    }
  }

  return (
    <button
      ref={ref}
      className={`${className} flex items-center justify-center font-bold gap-1.5 min-w-20 md:min-w-24 px-4 md:px-6 py-2 md:py-3 text-center text-sm disabled:cursor-not-allowed rounded-lg cursor-pointer ${buttonStyle(variant)}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;