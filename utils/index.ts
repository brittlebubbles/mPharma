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

export const storeDataLocally = async (key: string, value: any) => {
  //   const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, value);
};

export const fetchDataLocally = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {}
};
