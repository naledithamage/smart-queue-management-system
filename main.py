from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import User, Queue, SessionLocal  # Import the models and SessionLocal
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Fetch the database URL from the .env file
DATABASE_URL = os.getenv("DATABASE_URL")

# FastAPI application setup
app = FastAPI()

# Set up the SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Register user ---
@app.post("/auth/register")
def register(user: User, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# --- User login ---
@app.post("/auth/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == username).first()
    if not db_user or db_user.password != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}

# --- Join Queue ---
@app.post("/queue")
def join_queue(user_name: str, clinic_id: str, is_emergency: bool = False, db: Session = Depends(get_db)):
    ticket_id = str(uuid.uuid4())
    position = db.query(Queue).filter(Queue.clinic_id == clinic_id).count() + 1
    estimated_wait = position * 25
    queue_item = Queue(ticket_id=ticket_id, user_name=user_name, clinic_id=clinic_id, position=position, estimated_wait=estimated_wait, is_emergency=is_emergency)
    db.add(queue_item)
    db.commit()
    db.refresh(queue_item)
    return queue_item

# --- Check Queue Position ---
@app.get("/queue/{clinic_id}/{ticket_id}")
def check_position(clinic_id: str, ticket_id: str, db: Session = Depends(get_db)):
    queue_item = db.query(Queue).filter(Queue.clinic_id == clinic_id, Queue.ticket_id == ticket_id).first()
    if not queue_item:
        raise HTTPException(status_code=404, detail="Ticket ID not found")
    
    return queue_item

# --- Cancel Queue Ticket ---
@app.delete("/queue/cancel")
def cancel_ticket(ticket_id: str, db: Session = Depends(get_db)):
    queue_item = db.query(Queue).filter(Queue.ticket_id == ticket_id).first()
    if not queue_item:
        raise HTTPException(status_code=404, detail="Ticket ID not found")
    
    db.delete(queue_item)
    db.commit()

    # Reorder positions after the cancellation
    db.query(Queue).filter(Queue.position > queue_item.position).update({"position": Queue.position - 1}, synchronize_session=False)
    db.commit()
    return {"message": f"Ticket {ticket_id} canceled successfully."}

@app.get("/")
def root():
    return {"message": "Welcome to HealthAssist API"}
