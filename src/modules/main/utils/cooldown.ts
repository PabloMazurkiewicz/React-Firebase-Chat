const timeoutInSeconds = 10;

export const isCoolDownActive = (lastAccessDate: Date) => {
  const allowedDate = new Date();
  allowedDate.setSeconds(allowedDate.getSeconds() - timeoutInSeconds);
  return lastAccessDate > allowedDate;
};

export const getCoolDownSeconds = (lastAccessDate: Date) => {
  const allowedDate = new Date();
  allowedDate.setSeconds(allowedDate.getSeconds() - timeoutInSeconds);
  return Math.ceil((lastAccessDate.getTime() - allowedDate.getTime()) / 1000);
};
