import { query, queryOne, execute, transaction } from '@/lib/db';

export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id: number;
  product_name: string;
  product_sku?: string;
  product_image?: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
  variant_details?: any;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  postal_code: string;
  total_amount: number;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  shipping_fee: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  tracking_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  postal_code: string;
  subtotal: number;
  discount_amount?: number;
  tax_amount?: number;
  shipping_fee?: number;
  total_amount: number;
  payment_method: string;
  notes?: string;
  items: {
    product_id: number;
    product_name: string;
    product_sku?: string;
    product_image?: string;
    unit_price: number;
    quantity: number;
    subtotal: number;
    variant_details?: any;
  }[];
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `SMS-${dateStr}-${randomSuffix}`;

  return transaction(async (conn) => {
    const [orderResult]: any = await conn.execute(
      `INSERT INTO orders (
        order_number, customer_name, customer_email, customer_phone,
        shipping_address, city, state, postal_code, total_amount, subtotal,
        discount_amount, tax_amount, shipping_fee, payment_method,
        payment_status, order_status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending', ?)`,
      [
        orderNumber,
        input.customer_name,
        input.customer_email,
        input.customer_phone,
        input.shipping_address,
        input.city,
        input.state,
        input.postal_code,
        input.total_amount,
        input.subtotal,
        input.discount_amount || 0,
        input.tax_amount || 0,
        input.shipping_fee || 0,
        input.payment_method || 'cod',
        input.notes || null,
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of input.items) {
      await conn.execute(
        `INSERT INTO order_items (
          order_id, product_id, product_name, product_sku,
          product_image, unit_price, quantity, subtotal, variant_details
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.product_id,
          item.product_name,
          item.product_sku || null,
          item.product_image || null,
          item.unit_price,
          item.quantity,
          item.subtotal,
          item.variant_details ? JSON.stringify(item.variant_details) : null,
        ]
      );

      // Decrement product stock
      await conn.execute(
        'UPDATE products SET stock_quantity = GREATEST(0, stock_quantity - ?) WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    return {
      id: orderId,
      order_number: orderNumber,
      ...input,
      payment_status: 'pending',
      order_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as unknown as Order;
  });
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const sql = 'SELECT * FROM orders WHERE order_number = ? LIMIT 1';
  const order = await queryOne<Order>(sql, [orderNumber]);
  if (!order) return null;

  const items = await query<OrderItem>('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
  order.items = items;
  return order;
}

export async function getOrders(limit = 50, offset = 0): Promise<{ orders: Order[]; total: number }> {
  const countSql = 'SELECT COUNT(*) as total FROM orders';
  const countRes = await queryOne<{ total: number }>(countSql);
  const total = countRes?.total || 0;

  const sql = 'SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?';
  const orders = await query<Order>(sql, [limit, offset]);
  return { orders, total };
}

