interface option {
  iconTitle: string;
  text: string;
  type: string;
  path: string;
  subText?: boolean;
  fnc: boolean;
}

const options: option[] = [
  {
    iconTitle: 'location',
    text: 'Shipping Address',
    type: 'entypo',
    path: 'Login',
    fnc: false,
  },
  {
    iconTitle: 'credit-card',
    text: 'Payment Method',
    type: 'entypo',
    path: 'Login',
    fnc: false,
  },
  {
    iconTitle: 'list',
    text: 'Order History',
    type: 'entypo',
    path: 'Login',
    fnc: false,
  },
  {
    iconTitle: 'truck',
    text: 'Delivery Status',
    type: 'material-community',
    path: 'Login',
    fnc: false,
  },
  {
    iconTitle: 'language',
    text: 'Language',
    type: 'font-awesome',
    path: 'Login',
    subText: true,
    fnc: false,
  },
  {
    iconTitle: 'log-out',
    text: 'Logout',
    type: 'entypo',
    path: 'Login',
    fnc: true,
  },
];

const categories = [
  {text: 'Furniture', icon: 'sofa', type: 'material-community'},
  {text: 'Footwear', icon: 'socks', type: 'font-awesome-5'},
  {text: 'Pet Supplies', icon: 'pets', type: 'material'},
  {text: 'Clothing', icon: 'tshirt', type: 'font-awesome-5'},
  {text: 'Pens & Stationery', icon: 'pen', type: 'font-awesome-5'},
  {text: 'Sports & Fitness', icon: 'fitness-center', type: 'material'},
  {
    text: 'Beauty and Personal Care',
    icon: 'face-retouching-natural',
    type: 'material',
  },
  {text: 'FurniturBags, Wallets & Beltse', icon: 'wallet', type: 'antdesign'},
  {text: 'Home Decor & Festive Needs', icon: 'festival', type: 'material'},
  {text: 'Automotive', icon: 'car', type: 'font-awesome'},
  {text: 'Tools & Hardware', icon: 'tool', type: 'antdesign'},
  {
    text: 'Home Furnishing',
    icon: 'table-furniture',
    type: 'material-community',
  },
  {text: 'Baby Care', icon: 'baby-carriage', type: 'material-community'},
  {text: 'Mobiles & Accessories', icon: 'mobile1', type: 'antdesign'},
  {text: 'Food & Nutrition', icon: 'fast-food', type: 'ionicon'},
  {text: 'Watches', icon: 'watch', type: 'ionicon'},
  {text: 'Toys & School Supplies', icon: 'toys', type: 'material'},
  {text: 'Jewellery', icon: 'diamond', type: 'font-awesome'},
  {text: 'Kitchen & Dining', icon: 'fridge', type: 'material-community'},
  {text: 'Home & Kitchen', icon: 'dishwasher', type: 'material-community'},
  {text: 'Computers', icon: 'computer', type: 'material'},
  {text: 'Cameras & Accessories', icon: 'camera', type: 'antdesign'},
  {
    text: 'Health & Personal Care Appliances',
    icon: 'blood-drop',
    type: 'fontisto',
  },
  {text: 'Gaming', icon: 'gamepad', type: 'font-awesome'},
  {text: 'Home Improvement', icon: 'home', type: 'antdesign'},
  {text: 'Automation & Robotics', icon: 'robot', type: 'material-community'},
  {text: 'Sunglasses', icon: 'sunglasses', type: 'material-community'},
  {text: 'Home Entertainment', icon: 'slideshow', type: 'material'},
  {
    text: 'Wearable Smart Devices',
    icon: 'lock-smart',
    type: 'material-community',
  },
  {text: 'Eyewear', icon: 'eye', type: 'antdesign'},
  {text: 'eBooks', icon: 'book', type: 'antdesign'},
  {text: 'Household Supplies', icon: 'warehouse', type: 'material-community'},
];

export {options, categories};
