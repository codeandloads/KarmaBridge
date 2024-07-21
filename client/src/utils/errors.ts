// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MErrors = (errors: any): any[] | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errArray: any[] | undefined = [];
  Object.entries(errors).forEach(([_key, value]) => {
    errArray?.push(value[0]);
  });
  return errArray;
};
