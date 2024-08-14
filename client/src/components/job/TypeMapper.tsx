const mapper = (type: number): string => {
  switch (type) {
    case 1:
      return "Full Time";
    case 2:
      return "Part Time";
    case 3:
      return "Casual/Vacation";
    case 4:
      return "Hybrid";
    case 5:
      return "Work From Home";
    case 6:
      return "Contract";
    case 7:
      return "Sub Contract";
    default:
      return "Casual/Vacation";
  }
};

export const TypeMapper = ({ type }: { type: number }) => {
  return <span>{mapper(type)}</span>;
};
