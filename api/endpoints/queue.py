from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict
import uuid

router = APIRouter()

# Simulated queue (clinic_id → ticket_id → position)
clinic_queues: Dict[str, Dict[str, int]] = {}

class QueueRequest(BaseModel):
    user_name: str
    clinic_id: str
    is_emergency: bool = False  # Emergency flag to prioritize users

class QueueResponse(BaseModel):
    ticket_id: str
    position: int
    estimated_wait: int  # in minutes

class CancelRequest(BaseModel):
    ticket_id: str
    clinic_id: str

@router.post("/", response_model=QueueResponse)
def join_queue(request: QueueRequest):
    clinic_id = request.clinic_id
    user_name = request.user_name

    # If the clinic doesn't exist, create it
    if clinic_id not in clinic_queues:
        clinic_queues[clinic_id] = {}

    # Emergency patients get priority, others are added normally
    if request.is_emergency:
        # Push emergency patients to the front (position 1)
        position = 1
        # Shift everyone else down
        for ticket_id in clinic_queues[clinic_id]:
            clinic_queues[clinic_id][ticket_id] += 1
    else:
        position = len(clinic_queues[clinic_id]) + 1

    ticket_id = str(uuid.uuid4())
    clinic_queues[clinic_id][ticket_id] = position

    # Estimate wait time (25 minutes per patient)
    estimated_wait = position * 25

    return QueueResponse(ticket_id=ticket_id, position=position, estimated_wait=estimated_wait)

@router.get("/{clinic_id}/{ticket_id}", response_model=QueueResponse)
def check_position(clinic_id: str, ticket_id: str):
    if clinic_id not in clinic_queues or ticket_id not in clinic_queues[clinic_id]:
        raise HTTPException(status_code=404, detail="Ticket ID not found")

    position = clinic_queues[clinic_id][ticket_id]
    estimated_wait = position * 25
    return QueueResponse(ticket_id=ticket_id, position=position, estimated_wait=estimated_wait)

@router.delete("/cancel", response_model=dict)
def cancel_ticket(data: CancelRequest):
    clinic_id = data.clinic_id
    ticket_id = data.ticket_id

    if clinic_id not in clinic_queues or ticket_id not in clinic_queues[clinic_id]:
        raise HTTPException(status_code=404, detail="Ticket ID not found")

    # Get the removed ticket's position
    removed_position = clinic_queues[clinic_id][ticket_id]
    del clinic_queues[clinic_id][ticket_id]

    # Reorder remaining positions
    for tid in clinic_queues[clinic_id]:
        if clinic_queues[clinic_id][tid] > removed_position:
            clinic_queues[clinic_id][tid] -= 1

    return {"message": f"Ticket {ticket_id} canceled successfully."}

