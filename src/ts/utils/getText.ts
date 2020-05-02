const getTimeText = (number: number, text: string) => {
  if (number > 10 && number < 21) {
    return `${number} ${text}`;
  }
  switch (number % 10) {
    case 1:
      return `${number} ${text + 'у'}`;
    case 2 || 3 || 4:
      return `${number} ${text + 'ы'}`;
    default:
      return `${number} ${text}`;
  }

};

const getMistakesText = (number: number, text: string) => {
  switch (number % 10) {
    case 1:
      return `${number} ${text + 'ку'}`;
    case 2 || 3:
      return `${number} ${text + 'ки'}`;
    default:
      return `${number} ${text + 'ок'}`;
  }
};

export { getTimeText, getMistakesText };