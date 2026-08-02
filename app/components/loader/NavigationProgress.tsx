import { useNavigation } from "react-router";

const NavigationProgress = () => {
  const navigation = useNavigation();

  if (navigation.state === "idle") {
    return null;
  }

  return <div className="nav-progress-bar" />;
};

export default NavigationProgress;
