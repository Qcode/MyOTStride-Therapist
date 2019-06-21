import React from 'react';
import {Text, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import People from '../assets/People.png';
import greenBackground from '../assets/GreenBackground.jpg';
import MyOTTitleText from './Text/MyOTTitleText';
import LoginButton from './LoginComponents/LoginButton';
import CreateButton from './LoginComponents/CreateButton';
import TextInput from './LoginTextInput';

const localStyles = StyleSheet.create({
  textInput: {
    textAlign: 'center',
    fontSize: 17,
    padding: 3,
  },
  textInputContainer: {
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 20,
    width:'90%',
    paddingRight: 20,
    paddingLeft: 20,
    height:'25%',
    marginTop:'2.5%',
  },
  Form_Container: {
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    width: '90%',
    height:'17.5%',
    bottom:'6%',
  },
  Create_Button:{
    bottom:'4%',
  },
  People_Icon: {
    resizeMode: 'contain',
    marginTop: '5%',
    flex: 1,
    height: '50%',
    width: '50%',
  },
  People_Icon_Container: {
    top:'50%',
    right:'50%',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  Title_Text_Login:{
    color:"white",
    textAlign: 'center',
    fontSize:50,
    top:"5%",
  }
});


function LoginForm(props){
  return(
      <ImageBackground
        source={greenBackground}
        style={{ width: '100%', height: '100%', alignItems:'center',flex:1}}
      >
        <MyOTTitleText style = {localStyles.Title_Text_Login}>
          MyOTStride
        </MyOTTitleText>
        <View style={localStyles.Form_Container}>
          <TextInput values = {props.values} type = "password"/>
          <TextInput values = {props.values} type = "password"/>
          <LoginButton handleSubmit = {props.handleSubmit}/>
        </View>
        <CreateButton style = {localStyles.CreateButton}/>
        {this.state.error && <Text>Error logging in</Text>}
      </ImageBackground>
    )
}

export default withFormik({
  mapPropsToValues: () =>({
    email:'',
    password:'',
  })
  handleSubmit:(values,formikBag) =>{
    formikBag.props
      .loginAttempt(values)
      .catch(()=>
        formikBag.setErrors({
          failedSubmit:"Problem logging on."
        })
      )
      .finally(()=>
          formikBag.setSubmitting(false);
          formikBag.setValues({
            email: '',
            password: '',
          });
          props.navigation.navigate('Home');
        )
  },
})(LoginForm)
