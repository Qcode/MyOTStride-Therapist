import React from 'react';
import { Text, View, } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

function SignUpForm(props){
  return(
       <View>
            <FormLabel>
              {'First Name'}
            </FormLabel>
            <FormInput
              onChangeText={text => this.handleTextInput(text, info)}
              value = {props.firstName}
              placeholder={info}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <FormLabel>
              {'Last Name'}
            </FormLabel>
            <FormInput
              onChangeText={text => this.handleTextInput(text, info)}
              value = {props.lastName}
              placeholder={info}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <FormLabel>
              {'Username'}
            </FormLabel>
            <FormInput
              onChangeText={text => this.handleTextInput(text, info)}
              value = {props.email}
              placeholder={info}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <FormLabel>
              {'Password'}
            </FormLabel>
            <FormInput
              onChangeText={text => this.handleTextInput(text, info)}
              value = {props.password}
              placeholder={info}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <FormLabel>
              {'Re-enter your password'}
            </FormLabel>
            <FormInput
              onChangeText={text => this.handleTextInput(text, info)}
              value = {props.passwordConfirmation}
              placeholder={info}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
        <Button title="Submit info" onPress={props.handleSubmit} />
    )
}

export default SignUpForm;
