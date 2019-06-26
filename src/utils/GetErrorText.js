function GetErrorText(errorCode) {
  const errorTexts = {
    '401': 'Incorrect username and/or password.',
    '500': 'There is an issue with the server, please try again in 15 minutes.',
  };
  return Object.keys(errorTexts).includes(errorCode.message)
    ? errorTexts[errorCode.message]
    : 'We are experiencing technical difficulties, please try again in 15 minutes.';
}

export default GetErrorText;
