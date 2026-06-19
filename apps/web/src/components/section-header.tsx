import { ArrowUpRightIcon } from "./icons";

type SectionHeaderProps = {
  tag: string;
  heading: React.ReactNode;
  light?: boolean;
};

export const SectionHeader = ({ tag, heading, light = false }: SectionHeaderProps) => (
  <div
    className={`flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between ${
      light ? "text-white" : "text-[#242527]"
    }`}
  >
    <span
      className={`inline-flex items-center gap-1.5 font-medium text-sm ${
        light ? "text-white/70" : "text-neutral-500"
      }`}
    >
      <ArrowUpRightIcon className="size-4 text-[#EE1C4D]" />
      {tag}
    </span>
    <h2 className="max-w-xl text-pretty text-right font-bold text-3xl leading-tight tracking-tight sm:text-4xl">
      {heading}
    </h2>
  </div>
);
