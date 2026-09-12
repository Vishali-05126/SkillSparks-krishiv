// backend/services/skillDnaEngine.js
// Skill DNA: Dynamic skill graphs with confidence scores and evidence

class SkillDnaEngine {
  /**
   * Calculate comprehensive skill DNA for a user
   * Based on: claims, certificates, courses, challenges, projects, peer ratings, etc.
   */
  static calculateSkillDna(userData) {
    const skillDnaMap = new Map();

    // 1. Claimed skills (baseline)
    if (userData.claimedSkills) {
      userData.claimedSkills.forEach((skill) => {
        skillDnaMap.set(skill.id, {
          name: skill.name,
          level: skill.level || 1,
          confidence: skill.level * 20, // 1=20%, 5=100%
          evidence: {
            claimed: true,
            certificate: skill.certificate_url || null,
          },
          sources: ['claim'],
        });
      });
    }

    // 2. Verified certificates (+30% confidence boost)
    if (userData.certificates) {
      userData.certificates.forEach((cert) => {
        const existing = skillDnaMap.get(cert.skillId) || {
          name: cert.skillName,
          level: 4,
          confidence: 0,
          evidence: {},
          sources: [],
        };
        existing.confidence = Math.min(100, existing.confidence + 30);
        existing.evidence.certificate = cert.url;
        existing.sources.push('certificate');
        skillDnaMap.set(cert.skillId, existing);
      });
    }

    // 3. Completed courses (+25% confidence)
    if (userData.completedCourses) {
      userData.completedCourses.forEach((course) => {
        course.skillIds.forEach((skillId) => {
          const existing = skillDnaMap.get(skillId) || {
            name: course.skillName,
            level: 3,
            confidence: 0,
            evidence: {},
            sources: [],
          };
          existing.confidence = Math.min(100, existing.confidence + 25);
          existing.evidence.courses = existing.evidence.courses || [];
          existing.evidence.courses.push({
            name: course.name,
            completedAt: course.completedAt,
          });
          existing.sources.push('course');
          skillDnaMap.set(skillId, existing);
        });
      });
    }

    // 4. Completed AI challenges (+15% confidence per challenge)
    if (userData.completedChallenges) {
      userData.completedChallenges.forEach((challenge) => {
        const existing = skillDnaMap.get(challenge.skillId) || {
          name: challenge.skillName,
          level: 2,
          confidence: 0,
          evidence: {},
          sources: [],
        };
        existing.confidence = Math.min(100, existing.confidence + 15);
        existing.evidence.challenges = existing.evidence.challenges || [];
        existing.evidence.challenges.push({
          title: challenge.title,
          completedAt: challenge.completedAt,
        });
        existing.sources.push('challenge');
        skillDnaMap.set(challenge.skillId, existing);
      });
    }

    // 5. Projects built (+20% per project)
    if (userData.projects) {
      userData.projects.forEach((project) => {
        project.skillIds.forEach((skillId) => {
          const existing = skillDnaMap.get(skillId) || {
            name: project.skillName,
            level: 3,
            confidence: 0,
            evidence: {},
            sources: [],
          };
          existing.confidence = Math.min(100, existing.confidence + 20);
          existing.evidence.projects = existing.evidence.projects || [];
          existing.evidence.projects.push({
            title: project.title,
            url: project.url,
            completedAt: project.completedAt,
          });
          existing.sources.push('project');
          skillDnaMap.set(skillId, existing);
        });
      });
    }

    // 6. GitHub activity analysis (+10-20%)
    if (userData.githubAnalysis) {
      userData.githubAnalysis.skillsFromGithub.forEach((skill) => {
        const existing = skillDnaMap.get(skill.id) || {
          name: skill.name,
          level: 2,
          confidence: 0,
          evidence: {},
          sources: [],
        };
        existing.confidence = Math.min(100, existing.confidence + skill.confidence);
        existing.evidence.github = {
          repositories: skill.repoCount,
          contributions: skill.commits,
        };
        existing.sources.push('github');
        skillDnaMap.set(skill.id, existing);
      });
    }

    // 7. Teaching sessions completed (+25% for skill taught)
    if (userData.teachingSessions) {
      userData.teachingSessions.forEach((session) => {
        const existing = skillDnaMap.get(session.skillId) || {
          name: session.skillName,
          level: 4,
          confidence: 0,
          evidence: {},
          sources: [],
        };
        existing.confidence = Math.min(100, existing.confidence + 25);
        existing.evidence.teachingSessions = existing.evidence.teachingSessions || [];
        existing.evidence.teachingSessions.push({
          studentId: session.studentId,
          completedAt: session.completedAt,
          studentRating: session.studentRating,
        });
        existing.sources.push('teaching');
        skillDnaMap.set(session.skillId, existing);
      });
    }

    // 8. Peer ratings & reviews (+15-30%)
    if (userData.peerRatings) {
      userData.peerRatings.forEach((rating) => {
        const existing = skillDnaMap.get(rating.skillId) || {
          name: rating.skillName,
          level: 3,
          confidence: 0,
          evidence: {},
          sources: [],
        };
        const ratingBoost = (rating.averageRating / 5) * 30;
        existing.confidence = Math.min(100, existing.confidence + ratingBoost);
        existing.evidence.peerRatings = existing.evidence.peerRatings || [];
        existing.evidence.peerRatings.push({
          ratingCount: rating.ratingCount,
          averageRating: rating.averageRating,
        });
        existing.sources.push('peer_rating');
        skillDnaMap.set(rating.skillId, existing);
      });
    }

    // Convert to array and sort by confidence
    const skillDnaArray = Array.from(skillDnaMap.values())
      .map((skill) => ({
        ...skill,
        confidence: Math.round(skill.confidence),
        strengths: this.identifyStrengths(skill),
        weaknesses: this.identifyWeaknesses(skill),
      }))
      .sort((a, b) => b.confidence - a.confidence);

    return skillDnaArray;
  }

  /**
   * Identify strengths based on evidence and teaching history
   */
  static identifyStrengths(skill) {
    const strengths = [];

    if (skill.evidence.certificate) strengths.push('Certified');
    if (skill.evidence.projects?.length > 2) strengths.push('Multiple projects');
    if (skill.evidence.teachingSessions?.length > 0) strengths.push('Can teach others');
    if (skill.evidence.peerRatings?.some((r) => r.averageRating >= 4.5))
      strengths.push('Highly rated');
    if (skill.sources.length > 3) strengths.push('Well-rounded knowledge');

    return strengths;
  }

  /**
   * Identify weaknesses and improvement areas
   */
  static identifyWeaknesses(skill) {
    const weaknesses = [];

    if (skill.confidence < 30) weaknesses.push('Needs more practice');
    if (!skill.evidence.projects) weaknesses.push('No project experience');
    if (!skill.evidence.teachingSessions) weaknesses.push('Not validated through teaching');
    if (!skill.evidence.certificate) weaknesses.push('Could get certified');

    return weaknesses;
  }

  /**
   * Calculate readiness for a target skill
   * Based on prerequisite skills and current skill DNA
   */
  static calculateReadiness(currentSkillDna, targetSkill, prerequisites) {
    let readinessScore = 0;
    let missingSkills = [];

    prerequisites.forEach((prereq) => {
      const hasSkill = currentSkillDna.find(
        (s) => s.name.toLowerCase() === prereq.toLowerCase()
      );

      if (hasSkill) {
        readinessScore += hasSkill.confidence * 0.5; // 50% weighted
      } else {
        missingSkills.push(prereq);
      }
    });

    const finalReadiness = Math.min(100, readinessScore / prerequisites.length);

    return {
      readiness: Math.round(finalReadiness),
      missingSkills,
      estimatedWeeks: Math.ceil((100 - finalReadiness) / 5),
    };
  }
}

module.exports = SkillDnaEngine;
