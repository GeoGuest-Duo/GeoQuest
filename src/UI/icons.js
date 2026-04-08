import { MaterialIcons } from "@expo/vector-icons";

const Icons = {};

const Home = () => <MaterialIcons name="home" size={30} />;
const Events = () => <MaterialIcons name="local-activity" size={30} />;
const Leaderboard = () => <MaterialIcons name="emoji-events" size={30} />;
const Profile = () => <MaterialIcons name="person" size={30} />;
const ChevronRight = () => (
  <MaterialIcons name="keyboard-arrow-right" size={30} />
);
const Navigation = () => <MaterialIcons name="navigation" size={25} />;
const Complete = () => <MaterialIcons name="check-circle" size={25} />;

// Compose
Icons.Home = Home;
Icons.Events = Events;
Icons.Leaderboard = Leaderboard;
Icons.Profile = Profile;
Icons.ChevronRight = ChevronRight;
Icons.Navigation = Navigation;
Icons.Complete = Complete;

export default Icons;
