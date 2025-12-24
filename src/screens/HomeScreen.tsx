import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { addToCart, setCart } from '../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { persistCart, getPersistedCart } from '../utilities/persistence';
import products from '../data/products';
import ProductItem from '../components/ProductItem';
import Header from '../components/Header';

import { setLanguage } from '../redux/languageSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const [modalVisible, setModalVisible] = useState(false);
  const language = useAppSelector(state => state.language.language);
  const [data, setData] = useState(products);

  useEffect(() => {
    persistCart(cartItems);
    console.log(getPersistedCart())
  }, [cartItems]);

  useEffect(() => {
    const persisted = getPersistedCart();
    console.log('Restored cart from MMKV:', persisted);
    if (persisted.length) {
      dispatch(setCart(persisted));
    }
  }, [dispatch]);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const renderItem = ({ item, index }: { item: any,index:number }) => (
    <ProductItem
      item={item}
      onAddToCart={handleAddToCart}
      isAdded={!!cartItems.find((i: any) => i.id === item.id)}
      index={index}
    />
  );

  // Infinite scroll: loop data
  const handleEndReached = () => {
    setData((prev: typeof products) => [...prev, ...products]);
  };

  console.log('sdjkbcdsc', data)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
        cartCount={cartItems.length}
        onSettings={() => setModalVisible(true)}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
      />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity onPress={() => { dispatch(setLanguage('en')); setModalVisible(false); }}>
              <Text style={styles.languageOption}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { dispatch(setLanguage('ar')); setModalVisible(false); }}>
              <Text style={styles.languageOption}>العربية</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: { padding: 8 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  languageOption: { fontSize: 16, marginVertical: 8 },
  closeBtn: { color: 'red', marginTop: 16 },
});

export default HomeScreen;
