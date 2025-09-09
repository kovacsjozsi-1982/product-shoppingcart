from contextlib import asynccontextmanager
from typing import List

from config import settings
from database import Product, create_tables, get_db
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield

app = FastAPI(title=settings.app_name, lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow Vite frontend (04_market) to access backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic DTO
class ProductDTO(BaseModel):
    id: int
    name: str 
    price: float
    description: str | None = None
    stock: int

    class Config:
        from_attributes = True

class ProductCreateDTO(BaseModel):
    name: str 
    price: float
    description: str | None = None
    stock: int

class ProductUpdateDTO(BaseModel):
    name: str | None = None
    price: float | None = None
    description: str | None = None
    stock: int | None = None







@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.app_name}"}

#CREATE /products
@app.post("/products/", response_model=ProductDTO, status_code=201)
async def create_product(product: ProductCreateDTO, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).filter(Product.name == product.name))
    db_product = result.first()

    if db_product:
        raise HTTPException(status_code=400, detail="The product is already registered")

    db_product = Product(name=product.name, price=product.price, description = product.description, stock = product.stock)
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
    return db_product

# GET /products
@app.get("/products/", response_model=List[ProductDTO])
async def get_products(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product))
    products = result.scalars().all()
    return products

# GET /product
@app.get("/products/{product_id}", response_model=ProductDTO)
async def get_product(product_id: int,db: AsyncSession = Depends(get_db)):
    db_product = await db.get(Product, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="The product is not found!")
    return db_product

# UPDATE /products
@app.put("/products/{product_id}", response_model=ProductDTO)
async def update_product(product_id: int, product: ProductUpdateDTO, db: AsyncSession = Depends(get_db)):
    db_product = await db.get(Product, product_id)

    if not db_product:
        raise HTTPException(status_code=404, detail="The product is not found!")

    for key, value in product.model_dump(exclude_unset=True).items():  #only fields explicitly passed by the client are updated
        setattr(db_product, key, value)  #sets the value of an attribute on an object dynamically.

    await db.commit()
    await db.refresh(db_product)
    return db_product

# DELETE /products
@app.delete("/products/{product_id}", status_code=200)
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    db_product = await db.get(Product, product_id)

    if not db_product:
        raise HTTPException(status_code=404, detail="The product is not found!")

    await db.delete(db_product)
    await db.commit()
    return {"InfoMessage": f"Product with ID {product_id} has been deleted."}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
