import GetErrorCodeText from './GetErrorCodeText';
import GetErrorText from './GetErrorText';

function CheckUnfilledFields(
  fields,
  modalFunction,
  activeFunction,
  formikBag,
  values,
) {
  let checkedSum = 0;
  fields.forEach(field => {
    if (values[field] !== '' && values[field] !== null) {
      checkedSum += 1;
    }
  });
  if (checkedSum === fields.length) {
    activeFunction(formikBag.props.info, values)
      .then(() => modalFunction())
      .catch(err =>
        formikBag.setErrors({
          failedSubmit: GetErrorCodeText(err),
        }),
      )
      .finally(() => {
        formikBag.setSubmitting(false);
      });
  } else {
    formikBag.setErrors({
      failedSubmit: GetErrorText('unfilledFields'),
    });
    formikBag.setSubmitting(false);
  }
}

export default CheckUnfilledFields;
