import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICONS from '../assets/icons';
import CustomIcon from '../components/CustomIcon';
import { removeFromCart } from '../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const cartItems = useAppSelector(state => state.cart.items);
  const language = useAppSelector(state => state.language.language);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          {language === 'ar' ? 'السعر:' : 'Price:'} ${item.price}
        </Text>
        <Text style={styles.qty}>
          {language === 'ar' ? 'الكمية:' : 'Qty:'} x{item.quantity}
        </Text>
        <Text style={styles.total}>
          {language === 'ar' ? 'الإجمالي:' : 'Total:'} $
          {(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        testID={`cart_item_delete_${item.id}`}
      >
        <CustomIcon Icon={ICONS.deleteIcon} width={30} height={30} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          testID="back_to_home_button"
          accessibilityLabel="back_to_home_button"
        >
          <CustomIcon Icon={ICONS.backIcon} width={20} height={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {language === 'ar' ? 'عربة التسوق' : 'Cart'}
        </Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {language === 'ar' ? 'السلة فارغة' : 'Cart is empty'}
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
  list: {
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  name: {
    flex: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    flex: 1,
    fontSize: 14,
    color: '#888',
  },
  qty: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  total: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
});

export default CartScreen;
