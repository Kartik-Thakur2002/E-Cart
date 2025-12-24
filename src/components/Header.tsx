import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from './CustomIcon';
import ICONS from '../assets/icons';

interface HeaderProps {
  title: string;
  cartCount: number;
  onSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, cartCount, onSettings }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={{ width: 40 }} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart' as never)}
          style={styles.iconBtn}
          testID="cart_button"
        >
          <CustomIcon Icon={ICONS.cartIcon} width={25} height={25} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettings} style={styles.iconBtn}>
          <CustomIcon Icon={ICONS.settingsIcon} width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 16,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 5,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;
