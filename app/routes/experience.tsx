import type { Route } from "./+types/experience";
import Markdown from "react-markdown";
import { getExperience } from "../data/experience.server";
import { buildMeta } from "../lib/meta";

export async function loader() {
  const experience = await getExperience();
  return { experience };
}

export function meta({ data: loaderData }: Route.MetaArgs) {
  if (!loaderData?.experience) {
    return buildMeta({ title: "A Experiência" });
  }

  const { description, imgLink } = loaderData.experience;
  return buildMeta({
    title: "A Experiência",
    description,
    imgSrc: imgLink,
  });
}

export default function ExperienceRoute({
  loaderData,
}: Route.ComponentProps) {
  const { experience } = loaderData;

  if (!experience) {
    return null;
  }

  const { title, description, imgLink } = experience;

  return (
    <div>
      <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-lg mb-24">
        <div className="font-titles text-6xl">{title}</div>
        <div className="md:w-3/5 exp">
          <Markdown>{description}</Markdown>
        </div>
        <img
          src={imgLink}
          className="md:w-3/5 content-box-small md:mb-4"
          loading="lazy"
        />
      </div>
    </div>
  );
}
