/**
 * Issue Service
 * 
 * Provides methods for consuming the Campus Issues CRUD API endpoints
 * (/api/issues) specified in issues_frontend.txt.
 * 
 * NOTE: This service defines the API consumption interface and methods.
 * Actual API requests should be triggered when components explicitly invoke them.
 */

import apiClient from './api';

const ISSUES_BASE_PATH = '/issues';

/**
 * Retrieve a list of all issues.
 * Supports optional filtering by status, category, etc.
 * 
 * @param {object} [params] - Query parameters (e.g. { status, category, priority, page, limit })
 * @returns {Promise<Array>} List of issues
 */
export async function getIssues(params = {}) {
  return apiClient.get(ISSUES_BASE_PATH, { params });
}

/**
 * Retrieve details for a specific issue by its ID.
 * 
 * @param {string} id - The issue ID
 * @returns {Promise<object>} The issue details
 */
export async function getIssueById(id) {
  if (!id) {
    throw new Error('Issue ID is required to fetch issue details.');
  }
  return apiClient.get(`${ISSUES_BASE_PATH}/${id}`);
}

/**
 * Create a new campus issue.
 * 
 * @param {object} issueData - Issue payload { title, description, location, category }
 * @returns {Promise<object>} The newly created issue
 */
export async function createIssue(issueData) {
  return apiClient.post(ISSUES_BASE_PATH, issueData);
}

/**
 * Update an existing issue by its ID (supports partial updates).
 * 
 * @param {string} id - The issue ID
 * @param {object} updateData - Partial update fields (e.g. title, description, location, category, status, priority)
 * @returns {Promise<object>} The updated issue
 */
export async function updateIssue(id, updateData) {
  if (!id) {
    throw new Error('Issue ID is required to update an issue.');
  }
  return apiClient.put(`${ISSUES_BASE_PATH}/${id}`, updateData);
}

/**
 * Delete an issue by its ID.
 * 
 * @param {string} id - The issue ID
 * @returns {Promise<object>} Deletion confirmation response
 */
export async function deleteIssue(id) {
  if (!id) {
    throw new Error('Issue ID is required to delete an issue.');
  }
  return apiClient.delete(`${ISSUES_BASE_PATH}/${id}`);
}

const issueService = {
  getIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
};

export default issueService;
