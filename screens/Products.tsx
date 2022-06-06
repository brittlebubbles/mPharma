import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import {
  ProductType,
  fetchDataLocally,
  getLatestPrice,
  storeDataLocally,
} from "../utils";
import React, { useCallback, useEffect, useState } from "react";

import AddButton from "../components/AddButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/base";
import { Input } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../components/SearchInput";

const { width } = Dimensions.get("screen");

const Products = ({ navigation }: any) => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (name == "" && price == "") {
      Alert.alert("Error", "Please enter details");
      setError("Fields Required");
      setModalVisible(!modalVisible);
      return;
    }
    const productData = {
      id: Math.random().toFixed(),
      name,
      prices: [
        {
          date: Date.now(),
          id: Math.random().toFixed(),
          price: price,
        },
      ],
    };
    storeDataLocally("@mProducts", JSON.stringify(productData));
    setProducts([...products, productData]);
    setName("");
    setPrice("");
    // const jsonValue = JSON.stringify(value);

    setModalVisible(!modalVisible);
  };

  const handleEdit = async (id, name) => {
    Keyboard.dismiss();
    // if (name == "" && price == "") {
    //   Alert.alert("Error", "Please enter details");
    //   setError("Fields Required");
    //   setModalVisible(!modalVisible);
    //   return;
    // }
    // const product = {
    //   id: Math.random().toFixed(),
    //   name: name,
    //   prices: [
    //     {
    //       date: new Date(),
    //       id: Math.random().toFixed(),
    //       price: price,
    //     },
    //   ],
    // };
    // setProducts([...products, product]);
    setName(name);
    setPrice(price);
    setModalVisible(!modalVisible);

    // console.log(product);
  };

  const getProducts = async () => {
    fetch("http://www.mocky.io/v2/5c3e15e63500006e003e9795")
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Object From Api", data.products);
        setProducts(data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTodosFromUserDevice = async () => {
    try {
      const result = await fetchDataLocally("@mProducts");
      if (result != null) {
        setProducts(JSON.parse(result));
      }
      console.log("this is the saved object data", result);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProduct = async (id) => {
    const newProducts = products.filter((item) => item.id !== id);
    setProducts(newProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // useEffect(() => {
  //   getTodosFromUserDevice();
  // }, []);

  const ProductCard = ({ item }: ProductType) => {
    return (
      <View style={styles.box} key={item.id}>
        <View style={styles.leftSection}>
          <View style={[styles.imageContainer, { backgroundColor: "#FF5100" }]}>
            <AntDesign name="medicinebox" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.pStyle}>{item?.name}</Text>
            <Text style={styles.h2Style}>
              <Text> GHS {getLatestPrice(item?.prices)}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            // onPress={() => {
            //   item.id
            // }}
            onPress={() => {
              setModalVisible(true);
              // if (item) {
              //   handleEdit(item.name);
              // }
              // console.log({ ...item });
            }}
          >
            <Feather
              name="edit-2"
              size={24}
              color="black"
              style={{ marginHorizontal: 15 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Delete Product",
                `Are you sure you want to delete ${item.name}`,
                [
                  {
                    text: "No",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => deleteProduct(item.id),
                  },
                ]
              );
            }}
          >
            <AntDesign
              name="delete"
              size={24}
              color="black"
              // style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={styles.box}>
        <View style={styles.leftSection}>
          <View style={[styles.imageContainer, { backgroundColor: "#FF5100" }]}>
            <AntDesign name="medicinebox" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.pStyle}>{item.name}</Text>
            {/* <Text style={styles.h2Style}>{product.prices[0]}</Text> */}
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity>
            <Feather
              name="edit-2"
              size={24}
              color="black"
              style={{ marginHorizontal: 15 }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <AntDesign
              name="delete"
              size={24}
              color="black"
              // style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 30,
              color: "#FF5100",
              fontWeight: "500",
            }}
          >
            mPharma
          </Text>
          <Ionicons name="md-notifications-outline" size={30} color="black" />
        </View>
        <View>
          <SearchInput placeholder="Search..." />
        </View>
        <View>
          <Text
            style={{
              textAlign: "left",
              fontSize: 18,
              paddingTop: "5%",
              paddingBottom: "5%",
              fontWeight: "500",
            }}
          >
            All Products
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 5,
            }}
          >
            {products?.map((item, index) => {
              return (
                // <View key={index}>
                <ProductCard item={item} key={index} />
                // </View>
              );
            })}

            {/* <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            /> */}
          </ScrollView>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <KeyboardAvoidingView
              enabled
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: 5,
              }}
            >
              {/* <Text>{error}</Text> */}
              <View style={{ alignSelf: "flex-end" }}>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    paddingBottom: 5,
                  }}
                >
                  Name
                </Text>
                <TextInput
                  style={styles.formInputs}
                  onChangeText={(name: any) => setName(name)}
                  value={name}
                  placeholder="Enter product name"
                  autoCapitalize="none"
                  placeholderTextColor="#ABB3BF"
                  keyboardType="default"
                />

                <Text
                  style={{
                    alignSelf: "flex-start",
                    paddingBottom: 5,
                  }}
                >
                  Price
                </Text>

                <TextInput
                  style={styles.formInputs}
                  onChangeText={(price: any) => setPrice(price)}
                  value={price}
                  placeholder="Enter price"
                  autoCapitalize="none"
                  placeholderTextColor="#ABB3BF"
                  keyboardType="numeric"
                />
              </View>
              {/* <View style={{ alignItems: "center", alignContent: "center" }}> */}
              <Button
                title="Add"
                style={{
                  width: "60%",
                  height: 50,
                  alignItems: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  marginTop: 15,
                }}
                // disabled={!name || !price}
                onPress={handleSubmit}
                // onPress={(item) => {
                //   if (item) {
                //     handleEdit();
                //   } else {
                //     handleSubmit();
                //   }
                // }}
              />
              {/* </View> */}
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>

      <AddButton
        onPress={(item) => {
          setModalVisible(true);

          // if (item) {
          //   handleEdit();
          // } else {
          //   handleSubmit();
          // }
        }}
        antIconName="plus"
        style={styles.addBtn}
      />
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    paddingTop: "5%",
    flex: 1,
    backgroundColor: "#E9EEEF",
  },
  scrollView: {
    height: "100%",
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: "5%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
    marginBottom: "5%",
    // backgroundColor: "#3ff",
  },
  card: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    padding: 15,
  },
  desc: {
    fontSize: 12,
    color: "grey",
    marginBottom: 5,
  },
  // price: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },
  img: {
    width: 50,
    height: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balance: {
    fontSize: 12,
    color: "grey",
  },
  price: {
    fontWeight: "bold",
  },
  cardNum: {
    fontSize: 10,
  },
  cons: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    marginRight: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 35,
    height: 35,
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  pStyle: {
    color: "grey",
    fontSize: 12,
    paddingBottom: 8,
  },
  h2Style: {
    fontSize: 16,
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "white",
    width: "100%",
    height: 70,
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingEnd: 15,
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 1,
    // borderRadius: 50,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    height: 320,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  formInputs: {
    height: 50,
    width: width * 0.7,
    borderColor: "#E7E9EE",
    borderRadius: 3,
    borderWidth: 1,

    alignContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 20,
    fontSize: 14,
    backgroundColor: "#FAFBFC",
  },
});
