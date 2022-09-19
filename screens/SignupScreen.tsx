import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack";
import { Pressable, SafeAreaView, TextInput } from "react-native";
import { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import MenuIcon from "../components/MenuIcon";

import AuthScreenStyle from "../styles/authenticateStyle";
import ButtonStyles from "../styles/buttonStyle";
import Checkbox from "expo-checkbox";

import { AuthScreenStyle } from "../styles/authenticateStyle";
import { ButtonStyle } from "../styles/buttonStyle";
import { SignUpScreenStyle } from "../styles/signUpStyle";

import {
  userSignUp,
  saveDetails,
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../web/firebase";
import { render } from "react-dom";

{
  /* User sign up screen */
}

const SignupScreen = (props) => {
  const navigation = useNavigation();
  const [firstName, onChangeTextFirstName] = React.useState("");
  const [lastName, onChangeTextLastName] = React.useState("");
  const [homeCountry, onChangeTextCountry] = React.useState("");
  const [homePostcode, onChangeTextPostcode] = React.useState("");
  const [email, onChangeTextEmail] = React.useState("");
  const [password, onChangeTextPassword] = React.useState("");
  const [isChecked, setChecked] = React.useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props: StackHeaderLeftButtonProps) => <MenuIcon />,
    });
  });

  const saveDetails = async (firstName, email, password) => {
    try {
      const { user } = await userSignUp(email, password);
      await createUserDocFromAuth(user, { firstName });
      console.log("User Stored");
    } catch (error) {
      console.log("Error in creating this user", error.message);
    }
  };

  return (
    <View style={main.Centered}>
      <Text lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        Already have an account?
      </Text>

      {/* Link to go to sign in page*/}
      <Pressable
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={buttonStyles.SigninLink}>Sign in</Text>
      </Pressable>

      {/* Collect user information */}
      <SafeAreaView style={inputStyle.InputArea}>
        <TextInput
          style={inputStyle.Text}
          onChange={onChangeTextFirstName}
          value={firstName}
          placeholder="Firstname"
        />
        <TextInput
          style={inputStyle.Text}
          onChange={onChangeTextLastName}
          value={lastName}
          placeholder="Lastname"
        />
        <TextInput
          style={inputStyle.Text}
          onChange={onChangeTextCountry}
          value={homeCountry}
          placeholder="Home Country"
        />
        <TextInput
          style={inputStyle.Text}
          onChange={onChangeTextPostcode}
          value={homePostcode}
          placeholder="Home Postcode"
        />
        <TextInput
          style={inputStyle.Text}
          onChange={onChangeTextEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={inputStyle.Text}
          onChange={onChangeTextPassword}
          secureTextEntry={true}
          value={password}
          placeholder="Password"
        />
      </SafeAreaView>

      <View style={inputStyle.CheckBox}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#294E4B" : undefined}
        />
        <Text style={inputStyle.CheckBoxText}>
          I agree to Terms and Conditions and the Privacy Policy
        </Text>
      </View>

      {/* Submit button */}
      <Pressable
        style={buttonStyles.Button}
        onPress={async () => {
          await saveDetails(firstName, email, password);
          navigation.navigate("Database");
        }}
      >
        <Text style={buttonStyles.Text}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default SignupScreen;
