import type { ComponentProps } from "react";

// Grey image placeholder. Real photography will be dropped in later — keeping a
// neutral fill with a subtle diagonal hatch so empty slots read as intentional.
type PlaceholderProps = ComponentProps<"div"> & {
  label?: string;
};

export const Placeholder = ({
  className = "",
  label,
  ...props
}: PlaceholderProps) => (
  <div
    aria-hidden
    className={`relative overflow-hidden bg-neutral-200 ${className}`}
    style={{
      backgroundImage:
        "repeating-linear-gradient(45deg, rgba(0,0,0,0.035) 0 12px, transparent 12px 24px)",
    }}
    {...props}
  >
    {label && (
      <span className="absolute inset-0 flex items-center justify-center text-neutral-400 text-xs tracking-wide uppercase">
        {label}
      </span>
    )}
  </div>
);
