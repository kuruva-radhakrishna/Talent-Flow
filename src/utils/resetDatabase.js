import { jobsDB, seedJobs } from './jobs';
import { candidatesDB, seedCandidates } from './candidates';
import { assessmentsDB, seedQuestionBank, seedAssessments } from './assessments';

export const resetFullDatabase = async () => {
  try {
    console.log("🗑️ Clearing databases...");

    // Clear everything in parallel
    await Promise.all([
      jobsDB.delete(),
      candidatesDB.delete(),
      assessmentsDB.delete(),
    ]);

    console.log("🔄 Re-initializing databases...");

    // Seed jobs first
    const jobs = await seedJobs();
    const jobIds = jobs.map(j => j.id);

    // Seed candidates
    await seedCandidates(jobIds);

    // Seed question bank + assessments
    await seedQuestionBank();
    await seedAssessments(jobs);

    console.log("✅ Full database reset complete!");
    return true;
  } catch (error) {
    console.error("❌ Full database reset failed:", error);
    return false;
  }
};

// Make globally available
if (typeof window !== "undefined") {
  window.resetFullDB = resetFullDatabase;
}
