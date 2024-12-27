import { Tabs } from "expo-router";
import { AddIcon, FavoriteIcon, HomeIcon, ProfileIcon } from "../../components/Icons";

export default function TablsLayout(){
    return(
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {backgroundColor: "#fff"},
                tabBarActiveTintColor: 'blue'
                
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color}) => <HomeIcon color={color}/>,
                    headerShown: true
                }}
            />
            <Tabs.Screen 
                name="add"
                options={{
                    title: "Agregar",
                    tabBarIcon: ({color}) => <AddIcon color={color}/>
                }}
            />
            <Tabs.Screen 
                name="favorite"
                options={{
                    title: "Favoritos",
                    tabBarIcon: ({color}) => <FavoriteIcon color={color}/>
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({color}) => <ProfileIcon color={color}/>
                }}
            />

        </Tabs>
    )
}