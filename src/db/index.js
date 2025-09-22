import { jobsDB, seedJobs, getJob, getAllJobs, updateJob, saveJob } from './jobs.js';
import { candidatesDB, seedCandidates, getCandidatesByJob, getCandidate, updateCandidate, addTimelineEntry, getCandidateTimeline } from './candidates.js';
import { assessmentsDB, seedAssessments, getAssessmentByJob, getAssessmentsByJob, getAssessment, saveAssessment, updateAssessment, saveResponse, getResponse, saveDraftResponse, getDraftResponse, saveAssessmentWithResponses, getAssessmentWithResponses, generateAssessmentForJob, saveBuilderState, getBuilderState, clearBuilderState, deleteAssessment } from './assessments.js';

// Auto-initialize database when this module is imported
const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing databases...');
    
    // Check if already initialized
    const existingJobs = await jobsDB.jobs.count();
    if (existingJobs > 0) {
      console.log('✅ Database already initialized, preserving existing data');
      return;
    }
    
    console.log('🔄 Initializing fresh database...');
    
    // Seed jobs first
    const jobs = await seedJobs();
    console.log(`✅ Created ${jobs.length} jobs`);
    
    // Seed candidates with job IDs
    const jobIds = jobs.map(job => job.id);
    await seedCandidates(jobIds);
    console.log('✅ Created 1000 candidates with timeline');
    console.log(candidatesDB.candidates);
    
    // Seed assessments with job references
    await seedAssessments(jobs);
    console.log('✅ Created comprehensive assessments');
    
    console.log('✅ Database initialization complete!');
    return { jobs, jobIds };
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
};

// Don't auto-initialize, let main.jsx control timing

export { initializeDatabase };

// Export all database functions
export {
  // Jobs
  getJob,
  getAllJobs,
  updateJob,
  saveJob,
  
  // Candidates
  getCandidatesByJob,
  getCandidate,
  updateCandidate,
  addTimelineEntry,
  getCandidateTimeline,
  
  // Assessments
  getAssessmentByJob,
  getAssessmentsByJob,
  getAssessment,
  saveAssessment,
  updateAssessment,
  saveResponse,
  getResponse,
  saveDraftResponse,
  getDraftResponse,
  saveAssessmentWithResponses,
  getAssessmentWithResponses,
  generateAssessmentForJob,
  saveBuilderState,
  getBuilderState,
  clearBuilderState,
  deleteAssessment
};

// Global reset function
if (typeof window !== 'undefined') {
  window.resetModularDB = initializeDatabase;
}