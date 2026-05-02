const SkeletonCard = () => {
  return (
    <article
      className="overflow-hidden rounded-[20px] border border-[#b05c2e]/[0.12] bg-[#fffdf9]"
      aria-hidden="true"
    >
      <div className="h-[200px] animate-pulse bg-[#ead8c4]" />

      <div className="space-y-4 p-5">
        <div className="h-3 w-28 animate-pulse rounded-full bg-[#ead8c4]" />
        <div className="h-7 w-3/4 animate-pulse rounded-full bg-[#ead8c4]" />

        <div className="flex gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-[#ead8c4]" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-[#ead8c4]" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-[#ead8c4]" />
        </div>

        <div className="flex gap-2 pt-3">
          <div className="h-10 flex-1 animate-pulse rounded-[10px] bg-[#ead8c4]" />
          <div className="h-10 w-10 animate-pulse rounded-[10px] bg-[#ead8c4]" />
        </div>
      </div>
    </article>
  );
};

export default SkeletonCard;