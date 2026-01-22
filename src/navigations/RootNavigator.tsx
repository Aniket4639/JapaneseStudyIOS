import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import AppNavigator from "./AppNavigator"

const RootNavigator = () =>{

   return(
    <NavigationContainer>
         <AppNavigator />
    </NavigationContainer>
   )
}
export default RootNavigator