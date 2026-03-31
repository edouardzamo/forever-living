
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

# --- Product data ---
products = [
    {
        "id": 1,
        "name": "Forever Aloe Vera Gel",
        "price": 24.99,
        "description": "Pure stabilized aloe vera.",
        "image": "/images/aloe-vera-gel.jpg",
        "category": "Drinks"
    },
    {
        "id": 2,
        "name": "Forever Aloe Berry Nectar",
        "price": 26.99,
        "description": "Aloe with cranberry and apple.",
        "image": "/images/berry-nectar.jpg",
        "category": "Drinks"
    },
    {
        "id": 3,
        "name": "Forever Bee Honey",
        "price": 14.99,
        "description": "Natural pure bee honey.",
        "image": "/images/bee-honey.jpg",
        "category": "Nutrition"
    },
    {
        "id": 4,
        "name": "Forever Arctic Sea",
        "price": 34.99,
        "description": "Omega-3 fish oil supplement.",
        "image": "/images/arctic-sea.jpg",
        "category": "Supplements"
    },
    {
        "id": 5,
        "name": "Forever Bright Toothgel",
        "price": 9.99,
        "description": "Aloe-based toothgel.",
        "image": "/images/toothgel.jpg",
        "category": "Personal Care"
    },
    {
        "id": 6,
        "name": "Forever Living Sonya Cream",
        "price": 39.99,
        "description": "Moisturizing skin cream.",
        "image": "/images/sonya-cream.jpg",
        "category": "Skincare"
    },
]
# --- Basket (in-memory, per server run) ---
basket: List[dict] = []

class BasketItem(BaseModel):
    product_id: int
    quantity: int

@app.get("/products")
def get_products():
    return products

@app.get("/products/{product_id}")
def get_product(product_id: int):
    for p in products:
        if p["id"] == product_id:
            return p
    return {"error": "Product not found"}

@app.get("/basket")
def get_basket():
    result = []
    for item in basket:
        product = next((p for p in products if p["id"] == item["product_id"]), None)
        if product:
            result.append({**product, "quantity": item["quantity"]})
    return result

@app.post("/basket")
def add_to_basket(item: BasketItem):
    for b in basket:
        if b["product_id"] == item.product_id:
            b["quantity"] += item.quantity
            return {"message": "Quantity updated"}
    basket.append({"product_id": item.product_id, "quantity": item.quantity})
    return {"message": "Added to basket"}

@app.delete("/basket/{product_id}")
def remove_from_basket(product_id: int):
    global basket
    basket = [b for b in basket if b["product_id"] != product_id]
    return {"message": "Removed from basket"}

@app.delete("/basket")
def clear_basket():
    basket.clear()
    return {"message": "Basket cleared"}