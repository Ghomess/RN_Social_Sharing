export type RootStackParamList = {
  Tabs: undefined;
  Screens: { screen: string; params: any };
  NotFound: undefined;
};

export type ScreensParamList = {
  DogDetails: { dog: string };
};

export type TabParamList = {
  Home: undefined;
};
