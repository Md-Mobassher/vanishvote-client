import PollCard from "@/components/ui/PollCard";
import { Poll } from "@/types";

const HomePage = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/polls`);
  const polls = await data.json();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10  gap-5">
        {polls &&
          polls?.data
            ?.slice(0, 6)
            .map((poll: Poll) => <PollCard key={poll?._id} {...poll} />)}
      </div>
    </div>
  );
};

export default HomePage;
