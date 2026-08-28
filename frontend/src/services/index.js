/**
 * Services Barrel Export
 * 
 * Central entry point for frontend API client and feature services.
 */

export { apiClient, ApiError, request } from './api';
export {
  default as issueService,
  getIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} from './issueService';
