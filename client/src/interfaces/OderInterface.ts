// interface.ts
export interface Order {
  id: number;
  serial_number: string;
  user_id: number;
  order_at: string;
  total_price: number;
  status: number;
  note: string;
  order_details: OrderDetail[];
  receive_name: string;
  receive_address: string;
  receive_phone: string;
  created_at: string;
  updated_at: string;
}

export interface OrderDetail {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}
