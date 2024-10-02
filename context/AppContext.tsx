import { createContext, PropsWithChildren, useState } from "react";

interface Props {
  isPortrait: boolean;
  setIsPortrait: (value: boolean) => void;
  sliderFocal: string;
  setSliderFocal: (value: string) => void;
}

export const AppContext = createContext<Props>({
  isPortrait: false,
  setIsPortrait: () => {},
  sliderFocal: "16",
  setSliderFocal: () => {},
});

export default function AppProvider({ children }: PropsWithChildren<{}>) {
  const [isPortrait, setIsPortrait] = useState(false);
  const [sliderFocal, setSliderFocal] = useState("16");

  return (
    <AppContext.Provider
      value={{
        isPortrait,
        setIsPortrait,
        sliderFocal,
        setSliderFocal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
