import CardDashboardSkeleton from '../CardDashboardSkeleton';

type Props = {
  cards: any;
  fullDashboard?: boolean;
};

const SkeletonFinalPage = ({ cards }: Props) => {
  return (
    <div className='dashboard mt-small'>
      <div className='dashboard__content'>
        {cards.map(({ slug, pathIsTrue }: { slug: string; pathIsTrue: boolean }) => (
          <CardDashboardSkeleton key={slug} newButton={pathIsTrue} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonFinalPage;
