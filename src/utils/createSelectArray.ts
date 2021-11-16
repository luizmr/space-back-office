const createSelectArray = (array: any) => {
  const newArray: any = [];
  array.forEach((obj: { id: string; name: string }) => {
    newArray.push({ value: obj.id, label: obj.name });
  });
  return newArray;
};

export default createSelectArray;
