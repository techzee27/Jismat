export const menuItems = [
    {
        id: 'chicken-mandi',
        slug: 'chicken-mandi',
        category: 'chicken',
        name: 'Chicken Mandi',
        price: 350,
        image: '/images/mandi-chicken.png',
        description: 'Classic Mandi with tender roasted chicken, served with saffron rice and spicy tomato sauce.',
        ingredients: ['Whole Chicken', 'Basmati Rice', 'Saffron', 'Cardamom', 'Cinnamon', 'Cloves', 'Dried Lemon', 'Raisins', 'Fried Onions'],
        isPopular: true,
        serves: 2
    },
    {
        id: 'chicken-madhbi',
        slug: 'chicken-madhbi',
        category: 'chicken',
        name: 'Chicken Madhbi',
        price: 400,
        image: '/images/mandi-chicken.png',
        description: 'Succulent chicken grilled over hot stones, served with aromatic rice.',
        ingredients: ['Chicken Pieces', 'Stone Grilling Spices', 'Basmati Rice', 'Garlic', 'Ginger', 'Green Chilies', 'Coriander'],
        isPopular: false,
        serves: 2
    },
    {
        id: 'chicken-zurbian',
        slug: 'chicken-zurbian',
        category: 'chicken',
        name: 'Chicken Zurbian',
        price: 520,
        image: '/images/mandi-chicken.png',
        description: 'Chicken slow-cooked in yogurt and special spices, a creamy and rich delight.',
        ingredients: ['Chicken', 'Yogurt', 'Potatoes', 'Basmati Rice', 'Saffron', 'Caramelized Onions', 'Cardamom', 'Cloves'],
        isPopular: false,
        serves: 2
    },
    {
        id: 'kingfish-mandi',
        slug: 'kingfish-mandi',
        category: 'fish',
        name: 'Kingfish Mandi',
        price: 380,
        image: '/images/mandi-chicken.png',
        description: 'Fresh Kingfish steak marinated and served with our signature Mandi rice.',
        ingredients: ['Kingfish Steak', 'Lemon', 'Garlic', 'Turmeric', 'Cumin', 'Basmati Rice', 'Tomato Sauce'],
        isPopular: false,
        serves: 1
    },
    {
        id: 'sheri-fish-sayadieh',
        slug: 'sheri-fish-sayadieh',
        category: 'fish',
        name: 'Sheri Fish Sayadieh',
        price: 220,
        image: '/images/mandi-chicken.png',
        description: 'Whole Sheri fish with caramelized onion rice and brown sauce.',
        ingredients: ['Sheri Fish', 'Caramelized Onions', 'Fish Stock', 'Cumin', 'Cinnamon', 'Rice', 'Pine Nuts'],
        isPopular: true,
        serves: 2
    },
    {
        id: 'family-platter',
        slug: 'family-platter',
        category: 'combo',
        name: 'Family Platter (4 Pax)',
        price: 180,
        image: '/images/mandi-chicken.png',
        description: 'A grand feast featuring a mix of Chicken Mandi, Madhbi, and Lamb, served with all sides.',
        ingredients: ['Chicken Mandi', 'Chicken Madhbi', 'Lamb Meat', 'Large Platter Rice', 'Salad', 'Yogurt Sauce', 'Spicy Salsa', 'Bread'],
        isPopular: true,
        serves: 4
    },
    {
        id: 'royal-feast',
        slug: 'royal-feast',
        category: 'combo',
        name: 'Royal Feast (8 Pax)',
        price: 350,
        image: '/images/mandi-chicken.png',
        description: 'The ultimate gathering meal with our finest selection of meats and fish.',
        ingredients: ['Whole Lamb Shoulder', '2 Whole Chickens', 'Kingfish Steaks', 'Extra Large Rice Selection', 'Full Side Assortment', 'Drinks'],
        isPopular: false,
        serves: 8
    },
    {
        id: 'saudi-champagne',
        slug: 'saudi-champagne',
        category: 'beverages',
        name: 'Saudi Champagne',
        price: 150,
        image: '/images/mandi-chicken.png',
        description: 'Sparkling apple juice with fresh mint, orange slices, and lemon.',
        ingredients: ['Sparkling Apple Juice', 'Perrier Water', 'Fresh Mint Leaves', 'Orange Slices', 'Lemon Slices', 'Apples'],
        isPopular: true,
        serves: 4
    },
    {
        id: 'fresh-lemon-mint',
        slug: 'fresh-lemon-mint',
        category: 'beverages',
        name: 'Fresh Lemon Mint',
        price: 100,
        image: '/images/mandi-chicken.png',
        description: 'Freshly squeezed lemon juice blended with mint leaves.',
        ingredients: ['Fresh Lemon Juice', 'Mint Leaves', 'Sugar/Honey', 'Ice', 'Water'],
        isPopular: false,
        serves: 1
    },
];

export const categories = [
    { id: 'chicken', label: 'Chicken Mandi' },
    { id: 'fish', label: 'Fish Mandi' },
    { id: 'combo', label: 'Combos' },
    { id: 'beverages', label: 'Beverages' },
];
