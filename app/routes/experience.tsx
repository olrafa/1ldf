import type { Route } from "./+types/experience";
import { data, isRouteErrorResponse } from "react-router";
import Markdown from "react-markdown";
import { getExperience } from "../data/experience.server";
import { buildMeta } from "../lib/meta";
import NotFound from "../components/notFound/NotFound";

export async function loader() {
  const experience = await getExperience();
  if (!experience) {
    throw data(null, { status: 404 });
  }

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
    type: "article",
  });
}

export default function ExperienceRoute({
  loaderData,
}: Route.ComponentProps) {
  const { experience } = loaderData;
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
          className="md:w-3/5 rounded content-box-small md:mb-4"
          alt={title}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  throw error;
}
