from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class IssueBase(BaseModel):
    title: str = Field(..., max_length=150)
    description: str
    location: str
    category: str = Field(default="General")

class IssueCreate(IssueBase):
    pass

class IssueUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None

class IssueResponse(IssueBase):
    id: str
    status: str
    priority: str
    created_at: datetime
    updated_at: datetime
