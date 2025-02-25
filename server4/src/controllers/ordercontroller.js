const Order = require('../models/ordermodel');
const Product = require('../models/productmodel');
const User = require('../models/usermodel');

// Create a new order
exports.createOrder = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        const user = await User.findById(userId);
        
        if (!product || !user) {
            return res.status(404).json({ message: 'Product or User not found' });
        }

        const totalAmount = product.price * quantity;

        const newOrder = new Order({
            product: productId,
            user: userId,
            quantity,
            totalAmount,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product').populate('user');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('product').populate('user');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { userId, productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        const user = await User.findById(userId);
        
        if (!product || !user) {
            return res.status(404).json({ message: 'Product or User not found' });
        }

        const totalAmount = product.price * quantity;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { user: userId, product: productId, quantity, totalAmount },
            { new: true }
        );
        
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
