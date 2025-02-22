import TeamCard from "~/components/general/about/teamCard";
import { CONSTANT } from "~/constants";

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col gap-y-8 bg-transparent pb-10 pt-32">
      <div className="px-4">
        <h1
          className={`text-center font-life-craft text-5xl text-white lg:text-6xl`}
        >
          Incridea&apos;s Technical Team
        </h1>
        <p className="mt-5 text-center text-2xl font-bold text-white lg:text-3xl">
          Meet the developers
        </p>
      </div>
      <div className="mx-auto flex max-w-[80rem] flex-wrap justify-center gap-10 px-2">
        {Object.entries(CONSTANT.TEAM_MEMBERS).map(([name, details], idx) => (
          <TeamCard
            key={idx}
            name={name}
            role={details.role}
            image={details.image}
            linkedin={details.linkedin}
            instagram={details.instagram}
            github={details.github}
            quote={details.quote}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
