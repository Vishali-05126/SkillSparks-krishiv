// backend/services/aiMatchingEngine.js
// AI matching with 1-to-1 matches and multi-person skill chains

class AiMatchingEngine {
    /**
     * Find best skill swap matches for a user
     * Returns direct 1-to-1 matches sorted by compatibility
     */
    static findDirectMatches(currentUser, allUsers, limit = 10) {
        const matches = [];

        allUsers.forEach((otherUser) => {
            if (otherUser.id === currentUser.id) return;

            // Calculate match score
            const matchScore = this.calculateMatchScore(currentUser, otherUser);

            // Check if there's a skill swap opportunity
            const swapOpportunity = this.findSwapOpportunity(currentUser, otherUser);

            if (matchScore > 40 && swapOpportunity) {
                matches.push({
                    userId: otherUser.id,
                    userName: otherUser.name,
                    avatar: otherUser.avatar_url,
                    matchScore,
                    matchPercentage: Math.round(matchScore),
                    reason: this.generateMatchReason(currentUser, otherUser, swapOpportunity),
                    swapOpportunity,
                    hobbies: otherUser.hobbies,
                    interests: otherUser.interests,
                    goals: otherUser.goals,
                    availability: otherUser.availability,
                    reputation: otherUser.reputation_score,
                    skillDna: otherUser.skillDna,
                });
            }
        });

        return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
    }

    /**
     * Calculate match score between two users
     * Considers: skills, goals, interests, hobbies, availability, reputation
     */
    static calculateMatchScore(userA, userB) {
        let score = 0;
        let factors = 0;

        // 1. Skill complementarity (40%)
        const skillScore = this.calculateSkillComplementarity(userA, userB);
        score += skillScore * 0.4;
        factors++;

        // 2. Goal alignment (25%)
        if (userA.goals && userB.goals) {
            const goalScore = this.calculateGoalAlignment(userA.goals, userB.goals);
            score += goalScore * 0.25;
            factors++;
        }

        // 3. Shared interests (15%)
        if (userA.interests && userB.interests) {
            const interestScore = this.calculateInterestOverlap(userA.interests, userB.interests);
            score += interestScore * 0.15;
            factors++;
        }

        // 4. Availability match (10%)
        if (userA.availability && userB.availability) {
            const availabilityScore = this.calculateAvailabilityMatch(
                userA.availability,
                userB.availability
            );
            score += availabilityScore * 0.1;
            factors++;
        }

        // 5. Reputation consideration (10%)
        if (userA.reputation_score && userB.reputation_score) {
            const reputationScore = Math.min(
                100,
                ((userA.reputation_score + userB.reputation_score) / 2 / 5) * 100
            );
            score += reputationScore * 0.1;
            factors++;
        }

        return factors > 0 ? Math.round(score / factors) : 0;
    }

    /**
     * Calculate if there's a skill swap opportunity
     */
    static findSwapOpportunity(userA, userB) {
        const userATeaches = userA.skillDna?.filter((s) => s.confidence > 70) || [];
        const userAWants = userA.skills_learning || [];

        const userBTeaches = userB.skillDna?.filter((s) => s.confidence > 70) || [];
        const userBWants = userB.skills_learning || [];

        // Find mutual opportunity
        const aCanTeachB = userATeaches.some((s) =>
            userBWants.some((w) => w.toLowerCase() === s.name.toLowerCase())
        );
        const bCanTeachA = userBTeaches.some((s) =>
            userAWants.some((w) => w.toLowerCase() === s.name.toLowerCase())
        );

        if (aCanTeachB || bCanTeachA) {
            return {
                type: 'direct_swap',
                userATeaches: userATeaches
                    .filter((s) => userBWants.some((w) => w.toLowerCase() === s.name.toLowerCase()))
                    .slice(0, 2),
                userBTeaches: userBTeaches
                    .filter((s) => userAWants.some((w) => w.toLowerCase() === s.name.toLowerCase()))
                    .slice(0, 2),
            };
        }

        return null;
    }

    /**
     * CORE INNOVATION: Find multi-person skill chains
     * Example: A→UI/UX→B, B→Python→C, C→React→A
     */
    static findSkillChains(targetUser, allUsers, chainLength = 3) {
        const chains = [];
        const visited = new Set();

        function buildChain(currentUser, remainingUsers, chainPath) {
            if (chainPath.length === chainLength) {
                // Check if chain can close back to start
                const canClose = this.canChainClose(currentUser, chainPath[0], targetUser);
                if (canClose) {
                    chains.push({
                        participants: chainPath,
                        compatibility: this.calculateChainCompatibility(chainPath),
                        closingSkill: canClose,
                        description: this.describeChain(chainPath),
                    });
                }
                return;
            }

            remainingUsers.forEach((nextUser) => {
                if (!visited.has(nextUser.id)) {
                    const hasSwapOpportunity = this.findSwapOpportunity(currentUser, nextUser);
                    if (hasSwapOpportunity) {
                        visited.add(nextUser.id);
                        buildChain(nextUser, remainingUsers.filter((u) => u.id !== nextUser.id), [
                            ...chainPath,
                            { userId: nextUser.id, userName: nextUser.name, skill: hasSwapOpportunity },
                        ]);
                        visited.delete(nextUser.id);
                    }
                }
            });
        }

        buildChain.call(this, targetUser, allUsers.filter((u) => u.id !== targetUser.id), [
            { userId: targetUser.id, userName: targetUser.name },
        ]);

        return chains.sort((a, b) => b.compatibility - a.compatibility);
    }

    /**
     * Check if a chain can close (complete circle)
     */
    static canChainClose(lastUser, firstUser, targetUser) {
        const lastTeaches = lastUser.skillDna?.filter((s) => s.confidence > 70) || [];
        const firstWants = firstUser.skills_learning || [];

        const closingSkill = lastTeaches.find((s) =>
            firstWants.some((w) => w.toLowerCase() === s.name.toLowerCase())
        );

        return closingSkill;
    }

    /**
     * Calculate overall chain compatibility
     */
    static calculateChainCompatibility(chainPath) {
        let totalScore = 0;

        for (let i = 0; i < chainPath.length - 1; i++) {
            const userAScore = chainPath[i].skill?.userATeaches?.[0]?.confidence || 50;
            const userBScore = chainPath[i].skill?.userBTeaches?.[0]?.confidence || 50;
            totalScore += (userAScore + userBScore) / 2;
        }

        return Math.round(totalScore / (chainPath.length - 1));
    }

    /**
     * Generate human-readable chain description
     */
    static describeChain(chainPath) {
        let description = '';
        for (let i = 0; i < chainPath.length - 1; i++) {
            const current = chainPath[i];
            const next = chainPath[i + 1];
            const skill = current.skill?.userATeaches?.[0]?.name || 'skill';
            description += `${current.userName} teaches ${skill} to ${next.userName}. `;
        }
        return description.trim();
    }

    // Helper methods
    static calculateSkillComplementarity(userA, userB) {
        const aSkills = new Set(userA.skillDna?.map((s) => s.name.toLowerCase()) || []);
        const bSkills = new Set(userB.skillDna?.map((s) => s.name.toLowerCase()) || []);

        const intersection = Array.from(aSkills).filter((s) => bSkills.has(s)).length;
        const union = new Set([...aSkills, ...bSkills]).size;

        return union > 0 ? (1 - intersection / union) * 100 : 50; // Less overlap = better
    }

    static calculateGoalAlignment(goalsA, goalsB) {
        if (!goalsA || !goalsB) return 50;
        const overlap = goalsA.filter((g) => goalsB.includes(g)).length;
        return (overlap / Math.max(goalsA.length, goalsB.length)) * 100;
    }

    static calculateInterestOverlap(interestsA, interestsB) {
        const overlap = interestsA.filter((i) => interestsB.includes(i)).length;
        return (overlap / Math.max(interestsA.length, interestsB.length)) * 100;
    }

    static calculateAvailabilityMatch(availA, availB) {
        const overlappingHours = availA.filter((slot) => availB.includes(slot)).length;
        return (overlappingHours / Math.max(availA.length, availB.length)) * 100;
    }

    static generateMatchReason(userA, userB, swapOpportunity) {
        const reasons = [];

        if (swapOpportunity.userATeaches.length > 0) {
            reasons.push(`They can teach you ${swapOpportunity.userATeaches[0].name}`);
        }

        if (swapOpportunity.userBTeaches.length > 0) {
            reasons.push(`You can teach them ${swapOpportunity.userBTeaches[0].name}`);
        }

        if (userB.interests?.length > 0) {
            reasons.push(`Shares your interests: ${userB.interests.slice(0, 2).join(', ')}`);
        }

        return reasons.join('. ');
    }
}

module.exports = AiMatchingEngine;
