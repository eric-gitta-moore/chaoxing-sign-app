import classNames from "classnames";

export default function Card({ children, className }: { children: React.ReactElement[]; className: string }) {
  return (
    <div className={classNames("max-w-xl", className)}>
      <div className="bg-white shadow-md rounded-b-xl dark:bg-black">{children}</div>
    </div>
  );
}
