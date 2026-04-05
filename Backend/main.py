
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "../public/images")), name="images")

# --- Product data ---
products = [
    {
        "id": 1,
        "name": "Forever Aloe Vera Gel",
        "price": 24.99,
        "description": "Pure stabilized aloe vera.",
        "image": "/images/gelly.jpg",
        "category": "Drinks"
    },
    {
        "id": 2,
        "name": "Forever Aloe Berry Nectar",
        "price": 26.99,
        "description": "Aloe with cranberry and apple.",
        "image": "/images/nectar.jpg",
        "category": "Drinks"
    },
    {
        "id": 3,
        "name": "Forever Bee Honey",
        "price": 14.99,
        "description": "Natural pure bee honey.",
        "image": "/images/bee.jpg",
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
        "image": "/images/bright.jpg",
        "category": "Personal Care"
    },
    {
        "id": 6,
        "name": "Forever Living Sonya Cream",
        "price": 39.99,
        "description": "Moisturizing skin cream.",
        "image": "/images/soya.jpg",
        "category": "Skincare"
    },
    {
        "id": 7,
        "name": "Absorbent C",
        "price": 19.99,
        "description": "Absorbent product C.",
        "image": "/images/absorbent-c.jpg",
        "category": "Personal Care"
    },
    {
        "id": 8,
        "name": "Absorbent D",
        "price": 19.99,
        "description": "Absorbent product D.",
        "image": "/images/absorbent-d.jpg",
        "category": "Personal Care"
    },
    {
        "id": 9,
        "name": "Active HA",
        "price": 29.99,
        "description": "Active hyaluronic acid supplement.",
        "image": "/images/active-ha.png",
        "category": "Supplements"
    },
    {
        "id": 10,
        "name": "Active Pro B",
        "price": 34.99,
        "description": "Active probiotic supplement.",
        "image": "/images/active-pro-b.jpg",
        "category": "Supplements"
    },
    {
        "id": 11,
        "name": "Aloe Vera Gel",
        "price": 24.99,
        "description": "Pure stabilized aloe vera.",
        "image": "/images/aloe_vera_gel.jpg",
        "category": "Drinks"
    },
    {
        "id": 12,
        "name": "Arctic Sea",
        "price": 34.99,
        "description": "Omega-3 fish oil supplement.",
        "image": "/images/arctic-sea.jpg",
        "category": "Supplements"
    },
    {
        "id": 13,
        "name": "Argi Plus",
        "price": 39.99,
        "description": "L-arginine supplement.",
        "image": "/images/argi-plus.png",
        "category": "Supplements"
    },
    {
        "id": 14,
        "name": "B12 Plus",
        "price": 19.99,
        "description": "Vitamin B12 supplement.",
        "image": "/images/b12-plus.jpg",
        "category": "Supplements"
    },
    {
        "id": 15,
        "name": "Calcium",
        "price": 14.99,
        "description": "Calcium supplement.",
        "image": "/images/calcium.png",
        "category": "Supplements"
    },
    {
        "id": 16,
        "name": "Cardio Health",
        "price": 49.99,
        "description": "Cardiovascular health supplement.",
        "image": "/images/cardiohealth.jpg",
        "category": "Supplements"
    },
    {
        "id": 17,
        "name": "Daily",
        "price": 29.99,
        "description": "Daily multivitamin.",
        "image": "/images/daily.jpg",
        "category": "Supplements"
    },
    {
        "id": 18,
        "name": "Fiber",
        "price": 19.99,
        "description": "Fiber supplement.",
        "image": "/images/fiber.jpg",
        "category": "Nutrition"
    },
    {
        "id": 19,
        "name": "Fields of Greens",
        "price": 39.99,
        "description": "Green superfood supplement.",
        "image": "/images/field-of-greens.png",
        "category": "Supplements"
    },
    {
        "id": 20,
        "name": "Focus",
        "price": 24.99,
        "description": "Focus and concentration supplement.",
        "image": "/images/focus.jpg",
        "category": "Supplements"
    },
    {
        "id": 21,
        "name": "Garcinia Plus",
        "price": 34.99,
        "description": "Garcinia cambogia supplement.",
        "image": "/images/garcina-plus.jpg",
        "category": "Supplements"
    },
    {
        "id": 22,
        "name": "Garlic Thyme",
        "price": 19.99,
        "description": "Garlic and thyme supplement.",
        "image": "/images/garlic-thme.jpg",
        "category": "Supplements"
    },
    {
        "id": 23,
        "name": "ImmuBlend",
        "price": 29.99,
        "description": "Immune system blend.",
        "image": "/images/imme-blend.jpg",
        "category": "Supplements"
    },
    {
        "id": 24,
        "name": "Immune Gummy",
        "price": 14.99,
        "description": "Immune support gummies.",
        "image": "/images/immune_gummy.jpg",
        "category": "Nutrition"
    },
    {
        "id": 25,
        "name": "iVision",
        "price": 39.99,
        "description": "Vision health supplement.",
        "image": "/images/ivision.jpg",
        "category": "Supplements"
    },
    {
        "id": 26,
        "name": "Kids",
        "price": 19.99,
        "description": "Children's supplement.",
        "image": "/images/kids.png",
        "category": "Nutrition"
    },
    {
        "id": 27,
        "name": "Lean",
        "price": 34.99,
        "description": "Weight management supplement.",
        "image": "/images/lean.jpg",
        "category": "Supplements"
    },
    {
        "id": 28,
        "name": "Lycium Plus",
        "price": 29.99,
        "description": "Goji berry supplement.",
        "image": "/images/lycium-plus.jpg",
        "category": "Supplements"
    },
    {
        "id": 29,
        "name": "Marine Collagen",
        "price": 49.99,
        "description": "Marine collagen supplement.",
        "image": "/images/marine-collagen.png",
        "category": "Supplements"
    },
    {
        "id": 30,
        "name": "Move",
        "price": 24.99,
        "description": "Joint health supplement.",
        "image": "/images/move.jpg",
        "category": "Supplements"
    },
    {
        "id": 31,
        "name": "Multi Maca",
        "price": 39.99,
        "description": "Maca root supplement.",
        "image": "/images/multi maca.jpg",
        "category": "Supplements"
    },
    {
        "id": 32,
        "name": "Nature Min",
        "price": 19.99,
        "description": "Natural minerals supplement.",
        "image": "/images/nature-min.jpg",
        "category": "Supplements"
    },
    {
        "id": 33,
        "name": "Therm",
        "price": 29.99,
        "description": "Thermogenic supplement.",
        "image": "/images/therm.png",
        "category": "Supplements"
    },
    {
        "id": 34,
        "name": "Vitolize Women",
        "price": 39.99,
        "description": "Women's vitality supplement.",
        "image": "/images/vitolize-women.jpg",
        "category": "Supplements"
    },
    {
        "id": 35,
        "name": "Vitolize",
        "price": 39.99,
        "description": "Vitality supplement.",
        "image": "/images/vitolize.jpg",
        "category": "Supplements"
    }
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

