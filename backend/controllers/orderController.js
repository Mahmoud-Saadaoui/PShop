import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @desc   Create New Order
 * @route  POST /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404).json({ message: "No Order Items" });
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

/**
 * @desc   Get Logged in user orders
 * @route  GET /api/orders/mine
 * @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

/**
 * @desc   Get order by id
 * @route  GET /api/orders/:id
 * @access Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const orderId = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (orderId) {
    res.status(200).json(orderId);
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
});

/**
 * @desc   Update order to paid
 * @route  PUT /api/orders/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update order to paid");
});

/**
 * @desc   Update order to delivered
 * @route  PUT /api/orders/:id/deliver
 * @access Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update order to delivered");
});

/**
 * @desc   Get all orders
 * @route  GET /api/orders
 * @access Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  res.send("Update order to delivered");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
