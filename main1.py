from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====== DATA ======
orders_db = []

class OrderItem(BaseModel):
    food: str
    quantity: int

class OrderIn(BaseModel):
    customer: str
    table: int
    cart: List[OrderItem]

@app.post("/orders")
def create_order(order: OrderIn):
    for item in order.cart:
        orders_db.append({
            "id": len(orders_db) + 1,
            "food": item.food,
            "quantity": item.quantity,
            "customer": order.customer,
            "table": order.table,
            "status": "new"
        })
    return {"message": "OK"}

@app.get("/orders")
def get_orders():
    return orders_db

@app.put("/orders/{order_id}/{status}")
def update_status(order_id: int, status: str):
    for o in orders_db:
        if o["id"] == order_id:
            o["status"] = status
    return {"message": "updated"}

@app.delete("/orders/{order_id}")
def delete_order(order_id: int):
    global orders_db
    orders_db = [o for o in orders_db if o["id"] != order_id]
    return {"message": "deleted"}
