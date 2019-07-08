function GetErrorText(errorType) {
  const types = {
    unfilledFields: 'Please ensure that all fields are filled in.',
  };
  return types[errorType];
}

export default GetErrorText;
