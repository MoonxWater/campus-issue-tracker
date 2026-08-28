from bson import ObjectId
from datetime import datetime, timezone
from src.config.db import db
from src.models.issue import IssueCreate, IssueUpdate

def serialize_issue(issue: dict) -> dict:
    if not issue:
        return None
    issue["id"] = str(issue["_id"])
    del issue["_id"]
    return issue

def create_issue(issue_data: IssueCreate):
    if db is None:
        raise Exception("Database not initialized")
        
    issue_dict = issue_data.model_dump()
    
    # Add default fields
    issue_dict["status"] = "Open"
    issue_dict["priority"] = "Normal"
    issue_dict["created_at"] = datetime.now(timezone.utc)
    issue_dict["updated_at"] = issue_dict["created_at"]
    
    result = db.issues.insert_one(issue_dict)
    
    # Fetch the created issue to return
    created_issue = db.issues.find_one({"_id": result.inserted_id})
    return serialize_issue(created_issue)

def get_all_issues(status: str = None, category: str = None):
    if db is None:
        raise Exception("Database not initialized")
        
    query = {}
    if status:
        query["status"] = status
    if category:
        query["category"] = category
        
    issues = db.issues.find(query).sort("created_at", -1)
    return [serialize_issue(issue) for issue in issues]

def get_issue_by_id(issue_id: str):
    if db is None:
        raise Exception("Database not initialized")
        
    if not ObjectId.is_valid(issue_id):
        return None
        
    issue = db.issues.find_one({"_id": ObjectId(issue_id)})
    return serialize_issue(issue)

def update_issue(issue_id: str, issue_data: IssueUpdate):
    if db is None:
        raise Exception("Database not initialized")
        
    if not ObjectId.is_valid(issue_id):
        return None
        
    update_data = {k: v for k, v in issue_data.model_dump(exclude_unset=True).items() if v is not None}
    
    if update_data:
        update_data["updated_at"] = datetime.now(timezone.utc)
        result = db.issues.update_one(
            {"_id": ObjectId(issue_id)},
            {"$set": update_data}
        )
        if result.matched_count == 0:
            return None
            
    updated_issue = db.issues.find_one({"_id": ObjectId(issue_id)})
    return serialize_issue(updated_issue)

def delete_issue(issue_id: str):
    if db is None:
        raise Exception("Database not initialized")
        
    if not ObjectId.is_valid(issue_id):
        return False
        
    result = db.issues.delete_one({"_id": ObjectId(issue_id)})
    return result.deleted_count > 0
