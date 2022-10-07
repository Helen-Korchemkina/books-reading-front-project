export const addLeadingZero = d => {
  return d < 10 ? '0' + d : d;
};

export const millisecondsToDate = mls => {
  const date = new Date(Number(mls));
  const Y = date.getFullYear();
  const M = addLeadingZero(date.getMonth() + 1);
  const D = addLeadingZero(date.getDate());

  return `${D}.${M}.${Y}`;
};

export const millisecondsToTime = mls => {
  const date = new Date(Number(mls));

  const H = addLeadingZero(date.getHours());
  const M = addLeadingZero(date.getMinutes());
  const S = addLeadingZero(date.getSeconds());

  return `${H}:${M}:${S}`;
};
