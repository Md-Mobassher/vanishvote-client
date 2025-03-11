import Loading from "@/app/loading";
import PollCard from "@/components/ui/PollCard";

const PollDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const poll = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/polls/${id}`);
  const { data } = await poll.json();
  console.log(poll);
  return (
    <div className="container mx-auto px-4 py-10">
      <div className=" grid-cols-1 md:gap-10  gap-5">
        {data ? <PollCard key={data?._id} {...data} /> : <Loading />}
      </div>
    </div>
  );
};

export default PollDetails;
