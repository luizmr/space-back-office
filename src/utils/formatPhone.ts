const formatPhone = (str: string) => {
  //Filter only numbers from the input
  const cleaned = ('' + str).replace(/\D/g, '');

  //Check if the input is of correct length
  const match =
    cleaned.length === 11 ? cleaned.match(/^(\d{2})(\d{5})(\d{4})$/) : cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }

  return null;
};

export default formatPhone;
