import useGetMediumPosts from "../../hooks/useGetMediumPosts";

const MediumComponent = () => {
  const { data: medium } = useGetMediumPosts();

  console.log(medium);

  return <div>Medium</div>;
};

export default MediumComponent;
