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

export const millisecondsToDay = (startTime, finishTime) => {
  if (Number(startTime) === 0 || Number(finishTime) === 0) return 0;
  const milliseconds = Number(finishTime) - Number(startTime);

  const days = Math.floor(milliseconds / 1000 / 60 / 60 / 24);

  return days;
};
