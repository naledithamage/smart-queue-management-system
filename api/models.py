from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, TIMESTAMP
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Fetch the database URL from the .env file
DATABASE_URL = os.getenv("DATABASE_URL")

# Create SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Define User table
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String)
    password = Column(String)
    created_at = Column(TIMESTAMP)

# Define Queue table
class Queue(Base):
    __tablename__ = "queue"
    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String, index=True)
    user_name = Column(String, ForeignKey("users.username"))
    clinic_id = Column(String)
    position = Column(Integer)
    estimated_wait = Column(Integer)
    is_emergency = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP)

    user = relationship("User", back_populates="queues")

User.queues = relationship("Queue", back_populates="user")

# Create the tables in MySQL database
Base.metadata.create_all(bind=engine)
