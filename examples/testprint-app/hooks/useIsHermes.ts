export const useIsHermes = () => {
  return !!(global as Record<string, any>)?.HermesInternal;
};
