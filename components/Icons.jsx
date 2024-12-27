import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

export const ProfileIcon = (props) => (
  <Feather name="user" size={20} color="black" />
);

export const AddIcon = (props) => (
  <Feather name="plus-circle" size={28} color="black" />
);

export const FavoriteIcon = (props) => (
  <Feather name="heart" size={28} color="black" />
);

export const HomeIcon = (props) => (
  <Feather name="home" size={28} color="black" />
);

export const LocationIcon = (props) => (
  <SimpleLineIcons name="location-pin" size={24} color="black" />
);

export const ShopIcon = (props) => (
  <Fontisto name="shopping-bag" size={28} color="black" />
);
