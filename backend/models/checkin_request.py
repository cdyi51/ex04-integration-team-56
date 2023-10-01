"""Model for a requesting a check-in by PID."""

from pydantic import BaseModel

class CheckinRequest(BaseModel):
    pid: int