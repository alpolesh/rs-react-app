import Spinner from '@components/spinner/Spinner';

interface DetailedCardProps {
  children: React.ReactNode;
  isGameFetching: boolean;
}

function DetailedCard({ children, isGameFetching }: DetailedCardProps) {
  return (
    <>
      {isGameFetching && <Spinner />}
      <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-6 mx-auto mt-8 space-y-6 w-full h-fit relative">
        {children}
      </div>
    </>
  );
}

export default DetailedCard;
