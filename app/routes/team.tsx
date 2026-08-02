import type { Route } from "./+types/team";
import TeamMemberCard from "../components/team/TeamMemberCard";
import { getTeamDescription, getTeamMembers } from "../data/team.server";
import { buildMeta } from "../lib/meta";

export async function loader() {
  const [description, teamMembers] = await Promise.all([
    getTeamDescription(),
    getTeamMembers(),
  ]);

  return { description, teamMembers };
}

export function meta({ data: loaderData }: Route.MetaArgs) {
  return buildMeta({
    title: "Equipe",
    description: loaderData?.description ?? undefined,
  });
}

export default function TeamRoute({ loaderData }: Route.ComponentProps) {
  const { description, teamMembers } = loaderData;

  return (
    <div>
      <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-24">
        <div className="font-titles text-6xl">Equipe</div>
        <div className="md:w-3/5">{description}</div>
        {teamMembers.map(({ attributes, id }) => (
          <TeamMemberCard teamMember={attributes} key={id} />
        ))}
      </div>
    </div>
  );
}
