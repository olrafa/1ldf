import { ReactElement } from "react";
import { Helmet } from "react-helmet-async";

type PageHelmetProps = {
  title?: string;
  description?: string;
  imgSrc?: string;
  author?: string;
};

const siteTitle = "1 Livro, 1 Disco, 1 Filme";

const PageHelmet = ({
  title,
  description,
  imgSrc,
  author,
}: PageHelmetProps): ReactElement => (
  <Helmet>
    <meta
      property="og:title"
      content={title ? `${title} | ${siteTitle}` : siteTitle}
    />
    <meta
      property="og:description"
      content={
        description ||
        "Um papo sobre o livro, disco e filme que marcaram a vida dos nossos convidados."
      }
    />
    <meta property="og:type" content="website" />
    <meta
      name="image"
      property="og:image"
      content={imgSrc || "https://1ldf.vercel.app/assets/profile-F1fwxUuW.jpg"}
    />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    {author && <meta property="article:author" content={author} />}
    <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
  </Helmet>
);

export default PageHelmet;
