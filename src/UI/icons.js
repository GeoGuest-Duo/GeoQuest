import { MaterialIcons } from "@expo/vector-icons";
const Icons = {};
const logIn = () => <MaterialIcons name="add" size={16} />;
const SignUp = () => <MaterialIcons name="close" size={16} />;
const Home = () => <MaterialIcons name="delete" size={16} />;
const Edit = () => <MaterialIcons name="edit" size={16} />;
const Submit = () => <MaterialIcons name="check" size={16} />;
// Composable Icons for the screens(:
Icons.logIn = logIn;
Icons.Close = SignUp;
Icons.Home = Home;
Icons.Edit = Edit;
Icons.Submit = Submit;
export default Icons;
