const ConvertToSlug = (str: string): string => {
  str = str.toLowerCase();
  const from = 'àáäâãèéëêìíïîòõóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
};

export default ConvertToSlug;
