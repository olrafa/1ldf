import type { Route } from "./+types/episodeList";
import EpisodeCard from "../components/list/EpisodeCard";
import { LIST_DESCRIPTION } from "../components/list/strings";
import { getGuests } from "../data/episodes.server";
import { buildMeta } from "../lib/meta";

export async function loader() {
  const guests = await getGuests();
  return { guests };
}

export function meta() {
  return buildMeta({ title: "Episódios", description: LIST_DESCRIPTION });
}

export default function EpisodeListRoute({
  loaderData,
}: Route.ComponentProps) {
  const guestData = loaderData.guests.map(({ attributes }) => attributes);

  return (
    <div>
      <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-24">
        <div className="font-titles text-6xl">Episódios</div>
        <div className="md:w-3/5">{LIST_DESCRIPTION}</div>
        {guestData.map((guest) => (
          <EpisodeCard guest={guest} key={guest.epNumber} />
        ))}
      </div>
    </div>
  );
}
