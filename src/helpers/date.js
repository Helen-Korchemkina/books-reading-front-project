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

export const millisecondsToDay = mls => {
  if (Number(mls) === 0) return 0;
  const milliseconds = Number(mls) - Date.now();

  const days = Math.ceil(milliseconds / 1000 / 60 / 60 / 24);

  return days;
};
