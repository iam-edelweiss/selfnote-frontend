export const delay = (ms = 500) => new Promise(resolve => setTimeout(() => resolve('delayed'), ms));
