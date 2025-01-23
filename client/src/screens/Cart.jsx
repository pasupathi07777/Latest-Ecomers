import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {
  cartStates,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../slices/cartSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Cart = ({navigation}) => {
  const {cartItems} = useSelector(cartStates);
  console.log(cartItems);
  
  const dispatch = useDispatch();

  const renderCartItem = ({item}) => (
    <View style={styles.cartItemContainer}>
      <Image source={{uri: item.photo}} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name.slice(0,10)}...</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => dispatch(decrementQuantity(item.productId))}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => dispatch(incrementQuantity(item.productId))}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item.productId))}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} topic="Cart" />
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.productId}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.summaryContainer}>
        <TextInput placeholder="Enter Coupon Code" style={styles.couponInput} />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
        <View style={styles.summaryDetails}>
          <Text style={styles.summaryText}>
            Total Items ({cartItems.length}):
          </Text>
          <Text style={styles.summaryValue}>${calculateTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartList: {
    padding: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 18,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  couponInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  summaryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
