import { MaterialIcons } from '@expo/vector-icons';

const Icons = {};

const Home = () => <MaterialIcons name='home' size={30} />;
const Events = () => <MaterialIcons name='local-activity' size={30} />;
const Leaderboard  = () => <MaterialIcons name='emoji-events' size={30} />;
const Profile = () => <MaterialIcons name='person' size={30} />;

// Compose
Icons.Home = Home;
Icons.Events = Events;
Icons.Leaderboard = Leaderboard;
Icons.Profile = Profile;

export default Icons;
