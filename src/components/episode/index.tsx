import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

const Episode = (): ReactElement => {
  const { pathname } = useLocation();
  const episode = pathname.split("/")[2];

  console.log(typeof episode);

  return <div>PVC é pika</div>;
};

export default Episode;
