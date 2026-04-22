import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  highlight?: string;
  actions?: React.ReactNode;
};

const Heading = ({ title, description, highlight, actions }: HeadingProps) => {
  return (
    <>
      <div className="flex justify-between flex-col lg:flex-row gap-y-4 items-center px-8">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-gray-500 text-xl">
            {description}{" "}
            {highlight && (
              <span className="font-semibold">
                {highlight.charAt(0).toUpperCase() + highlight.slice(1)}
              </span>
            )}
          </p>
        </div>
        <div>{actions}</div>
      </div>
      <Separator className="mt-4" />
    </>
  );
};

export default Heading;
