export const useNewArchitecture = () => {
  return !!(global as Record<string, any>)?.nativeFabricUIManager;
};
