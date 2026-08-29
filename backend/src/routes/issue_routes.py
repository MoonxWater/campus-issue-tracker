from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from src.models.issue import IssueCreate, IssueUpdate, IssueResponse
from src.controllers import issue_controller

router = APIRouter(prefix="/api/issues", tags=["Issues"])

@router.post("", response_model=IssueResponse, status_code=201)
def create_issue(issue: IssueCreate):
    created_issue = issue_controller.create_issue(issue)
    if not created_issue:
        raise HTTPException(status_code=500, detail="Failed to create issue")
    return created_issue

@router.get("", response_model=List[IssueResponse])
def get_issues(
    status: Optional[str] = Query(None, description="Filter by status"),
    category: Optional[str] = Query(None, description="Filter by category")
):
    return issue_controller.get_all_issues(status=status, category=category)

@router.get("/{issue_id}", response_model=IssueResponse)
def get_issue(issue_id: str):
    issue = issue_controller.get_issue_by_id(issue_id)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue

@router.put("/{issue_id}", response_model=IssueResponse)
def update_issue(issue_id: str, issue: IssueUpdate):
    updated_issue = issue_controller.update_issue(issue_id, issue)
    if not updated_issue:
        raise HTTPException(status_code=404, detail="Issue not found or no changes made")
    return updated_issue

@router.delete("/{issue_id}", status_code=204)
def delete_issue(issue_id: str):
    success = issue_controller.delete_issue(issue_id)
    if not success:
        raise HTTPException(status_code=404, detail="Issue not found")
    return None
