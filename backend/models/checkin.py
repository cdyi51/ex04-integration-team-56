"""Model for a User checking in at a specific date and time."""

from datetime import datetime
from pydantic import BaseModel
from .user import User

class Checkin(BaseModel):
    user: User
    created_at: datetime