import { createContext, useContext, useState, ReactNode } from 'react';

type SelectedDistrictsContextType = {
  selectedDistrictIDs: number[];
  toggleDistrictSelection: (districtID: number) => void;
  clearSelectedDistricts: () => void; // Function to clear selected district IDs
};

const SelectedDistrictsContext = createContext<SelectedDistrictsContextType>({
  selectedDistrictIDs: [],
  toggleDistrictSelection: () => {},
  clearSelectedDistricts: () => {},
});

export const useSelectedDistricts = () => useContext(SelectedDistrictsContext);

type SelectedDistrictsProviderProps = {
  children: ReactNode;
};

export const SelectedDistrictsProvider = ({ children }: SelectedDistrictsProviderProps) => {
  const [selectedDistrictIDs, setSelectedDistrictIDs] = useState<number[]>([]);

  const toggleDistrictSelection = (districtID: number) => {
    setSelectedDistrictIDs((prevSelectedDistrictIDs) =>
      prevSelectedDistrictIDs.includes(districtID)
        ? prevSelectedDistrictIDs.filter((id) => id !== districtID)
        : [...prevSelectedDistrictIDs, districtID]
    );
  };

  const clearSelectedDistricts = () => {
    setSelectedDistrictIDs([]);
  };

  return (
    <SelectedDistrictsContext.Provider value={{ selectedDistrictIDs, toggleDistrictSelection, clearSelectedDistricts }}>
      {children}
    </SelectedDistrictsContext.Provider>
  );
};
