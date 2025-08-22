type Props = {
  children: React.ReactNode;
  title: string;
  isBorderHighlighting: boolean;
};

export default function InfoCardWrapper({
  children,
  title,
  isBorderHighlighting,
}: Props) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 mx-auto mt-8 w-full relative outline outline-4 transition-[outline-color] duration-500 ${
        isBorderHighlighting ? ' outline-green-600' : 'outline-transparent'
      }`}
    >
      <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}
