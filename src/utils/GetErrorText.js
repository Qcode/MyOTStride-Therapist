function GetErrorText(errorCode) {
  const errorTexts = {
    '401': 'Incorrect username and/or password.',
    '500': 'There is an issue with the server, please try again in 15 minutes.',
    '409': 'There is already an account with this username and password.',
    '400':
      'Please make sure that you have filled out all the relevant form fields.',
  };
  return Object.keys(errorTexts).includes(errorCode.message)
    ? errorTexts[errorCode.message]
    : 'We are experiencing technical difficulties, please try again in 15 minutes.';
}

export default GetErrorText;
