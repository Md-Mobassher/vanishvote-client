import PollCard from "@/components/ui/PollCard";

const PollDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/polls/${id}`);
  const poll = await data.json();
  console.log(poll);
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10  gap-5">
        {poll && <PollCard key={poll?._id} {...poll} />}
      </div>
    </div>
  );
};

export default PollDetails;
