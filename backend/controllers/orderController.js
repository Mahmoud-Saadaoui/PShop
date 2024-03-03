import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @desc   Create New Order
 * @route  POST /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("Add an order");
});

/**
 * @desc   Get Logged in user orders
 * @route  GET /api/orders/mine
 * @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("My orders");
});

/**
 * @desc   Get order by id
 * @route  GET /api/orders/:id
 * @access Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  res.send("order id");
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
