import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAppSelector } from '../redux/hooks';

interface ProductItemProps {
  item: { id: string; name: string; price: number; image: string };
  onAddToCart: (item: any) => void;
  isAdded: boolean;
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  item,
  onAddToCart,
  isAdded,
  index,
}) => {
  const language = useAppSelector(state => state.language.language);

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity
        testID={`product_${index + 1}_add_button`}
        style={[styles.button, isAdded && styles.buttonAdded]}
        onPress={() => onAddToCart(item)}
        // disabled={isAdded}
      >
        <Text style={styles.buttonText}>
          {isAdded
            ? language === 'ar'
              ? 'تمت الإضافة'
              : 'Added'
            : language === 'ar'
            ? 'أضف إلى السلة'
            : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonAdded: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductItem;
