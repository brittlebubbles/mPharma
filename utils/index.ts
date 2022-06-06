import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLatestPrice = (dates: any) => {
  let latest = dates.reduce((r: any, a: any) => {
    return r.date > a.date ? r : a;
  });
  return latest.price;
};

export interface ProductType {
  item: {
    id: number;
    name: string;
    prices: {
      date: string;
      id: number;
      price: number;
    };
  };
}

export const storeDataLocally = async (key, value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

export const fetchDataLocally = async (key) => {
  return await AsyncStorage.getItem(key);
};
