export const FormataStringData = (data: any): string => {
  if (data && data !== '') {
    const ano = data.split('-')[0];
    const mes = data.split('-')[1];
    const dia = data.split('-')[2];

    return ('0' + dia).slice(1, 3) + '/' + ('0' + mes).slice(-2) + '/' + ano;
  } else {
    return '';
  }
};
