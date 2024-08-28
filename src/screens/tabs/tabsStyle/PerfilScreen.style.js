import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../Components/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightwhite,
  },
  cover: {
    height: 290,
    width: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: -70,
  },
  avatar: {
    height: 160,
    width: 160,
    borderRadius: 80,
    borderColor: COLORS.primary,
    borderWidth: 2,
    marginTop: -70,
  },
  profile: {
    marginTop: 20,
    alignItems: "center",
  },
  name: {
    color: COLORS.primary,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.large,
    marginVertical: 10,
  },
  menuText: {
    color: COLORS.gray,
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
  },
  menuWrapper: {
    marginTop: SIZES.large,
    width: SIZES.width - SIZES.large * 2,
    backgroundColor: COLORS.lightwhite,
    borderRadius: 12,
    padding: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: COLORS.gray,
  },
});

export default styles;
