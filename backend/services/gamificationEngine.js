// backend/services/gamificationEngine.js
// XP, badges, levels, streaks, achievements, and leaderboards

class GamificationEngine {
    // XP requirements per level (exponential growth)
    static XP_PER_LEVEL = {
        1: 0,
        2: 500,
        3: 1500,
        4: 3000,
        5: 5000,
        6: 8000,
        7: 12000,
        8: 17000,
        9: 23000,
        10: 30000,
    };

    /**
     * Award XP for various activities
     */
    static awardXp(userId, activityType, metadata = {}) {
        const xpRewards = {
            // Learning
            complete_challenge: 100,
            complete_course: 500,
            complete_project: 1000,
            learning_session: 200,

            // Teaching
            teaching_session: 300,
            teach_5_people: 1000,
            teach_10_people: 2000,

            // Skill exchanges
            free_skill_swap: 250,
            successful_match: 150,
            skill_chain_completion: 500,

            // Community
            help_someone: 75,
            give_feedback: 50,
            achieve_streak_7: 300,
            achieve_streak_30: 1000,

            // Challenges & Hackathons
            complete_daily_challenge: 100,
            complete_weekly_mission: 500,
            hackathon_participation: 1000,
            hackathon_win: 5000,

            // Engagement
            profile_complete_50: 100,
            profile_complete_100: 500,
            first_connection: 50,
            skill_verified: 200,
        };

        const xpEarned = xpRewards[activityType] || 0;

        return {
            userId,
            xpEarned,
            activityType,
            timestamp: new Date(),
            metadata,
        };
    }

    /**
     * Calculate current level based on XP
     */
    static calculateLevel(totalXp) {
        let level = 1;
        const xpArray = Object.entries(this.XP_PER_LEVEL).sort((a, b) => a[0] - b[0]);

        for (let i = xpArray.length - 1; i >= 0; i--) {
            if (totalXp >= xpArray[i][1]) {
                level = parseInt(xpArray[i][0]);
                break;
            }
        }

        // Calculate progress to next level
        const currentLevelXp = this.XP_PER_LEVEL[level];
        const nextLevelXp = this.XP_PER_LEVEL[level + 1] || currentLevelXp + 50000;
        const progressToNextLevel = totalXp - currentLevelXp;
        const xpNeededForNextLevel = nextLevelXp - currentLevelXp;

        return {
            level,
            totalXp,
            progressToNextLevel,
            xpNeededForNextLevel,
            progressPercentage: Math.round((progressToNextLevel / xpNeededForNextLevel) * 100),
        };
    }

    /**
     * Award badges based on achievements
     */
    static checkAndAwardBadges(userId, userStats) {
        const earnedBadges = [];

        // Skill badges
        if (userStats.skillsWithLevel5 >= 1) {
            earnedBadges.push({
                id: 'master_of_one',
                name: 'Master of One',
                icon: '🎖️',
                rarity: 'rare',
                description: 'Reached level 5 in a skill',
            });
        }

        if (userStats.skillsWithLevel5 >= 3) {
            earnedBadges.push({
                id: 'skill_collector',
                name: 'Skill Collector',
                icon: '🏆',
                rarity: 'rare',
                description: 'Mastered 3 skills',
            });
        }

        // Teaching badges
        if (userStats.peopleTeached >= 5) {
            earnedBadges.push({
                id: 'first_mentor',
                name: 'First Mentor',
                icon: '👨‍🏫',
                rarity: 'rare',
                description: 'Taught 5 people',
            });
        }

        if (userStats.peopleTeached >= 20) {
            earnedBadges.push({
                id: 'knowledge_guardian',
                name: 'Knowledge Guardian',
                icon: '🧙‍♂️',
                rarity: 'epic',
                description: 'Taught 20 people',
            });
        }

        // Learning badges
        if (userStats.skillsLearned >= 5) {
            earnedBadges.push({
                id: 'perpetual_learner',
                name: 'Perpetual Learner',
                icon: '📚',
                rarity: 'rare',
                description: 'Learned 5 skills',
            });
        }

        // Engagement badges
        if (userStats.consecutiveDayStreak >= 7) {
            earnedBadges.push({
                id: 'week_warrior',
                name: 'Week Warrior',
                icon: '⚔️',
                rarity: 'common',
                description: '7-day learning streak',
            });
        }

        if (userStats.consecutiveDayStreak >= 30) {
            earnedBadges.push({
                id: 'month_master',
                name: 'Month Master',
                icon: '🌟',
                rarity: 'epic',
                description: '30-day learning streak',
            });
        }

        // Community badges
        if (userStats.connectionsFormed >= 10) {
            earnedBadges.push({
                id: 'connector',
                name: 'Connector',
                icon: '🤝',
                rarity: 'rare',
                description: 'Formed 10 connections',
            });
        }

        if (userStats.skillChainParticipations >= 1) {
            earnedBadges.push({
                id: 'chain_link',
                name: 'Chain Link',
                icon: '⛓️',
                rarity: 'rare',
                description: 'Participated in a skill chain',
            });
        }

        // Hackathon badges
        if (userStats.hackathonParticipations >= 1) {
            earnedBadges.push({
                id: 'hackathon_warrior',
                name: 'Hackathon Warrior',
                icon: '⚡',
                rarity: 'rare',
                description: 'Participated in a hackathon',
            });
        }

        if (userStats.hackathonWins >= 1) {
            earnedBadges.push({
                id: 'champion',
                name: 'Champion',
                icon: '👑',
                rarity: 'legendary',
                description: 'Won a hackathon',
            });
        }

        // Profile badges
        if (userStats.verified) {
            earnedBadges.push({
                id: 'verified_master',
                name: 'Verified Master',
                icon: '✅',
                rarity: 'epic',
                description: 'Fully verified on SkillSwap',
            });
        }

        return earnedBadges;
    }

    /**
     * Track and update learning streak
     */
    static updateStreak(lastActivityDate) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const lastActivity = new Date(lastActivityDate);

        // Reset if more than 1 day has passed
        if (lastActivity.getTime() < yesterday.getTime()) {
            return {
                currentStreak: 1,
                streakReset: true,
            };
        }

        // Continue or start streak
        return {
            currentStreak: lastActivity.getDate() === yesterday.getDate() ? 0 : 1,
            streakReset: false,
        };
    }

    /**
     * Calculate leaderboard rankings
     */
    static calculateLeaderboardPosition(users, userId, type = 'global') {
        let scoredUsers;

        if (type === 'global') {
            scoredUsers = users
                .map((u) => ({
                    userId: u.id,
                    userName: u.name,
                    score: u.xp_points || 0,
                    level: u.level || 1,
                    avatar: u.avatar_url,
                    skillCount: u.skillCount || 0,
                }))
                .sort((a, b) => b.score - a.score);
        } else if (type === 'skill_specific') {
            // Leaderboard for specific skill proficiency
            scoredUsers = users
                .map((u) => ({
                    userId: u.id,
                    userName: u.name,
                    score: u.skillConfidence || 0,
                    level: u.skillLevel || 1,
                    avatar: u.avatar_url,
                }))
                .sort((a, b) => b.score - a.score);
        }

        const userRank = scoredUsers.findIndex((u) => u.userId === userId) + 1;
        const userEntry = scoredUsers[userRank - 1];

        return {
            rank: userRank,
            totalUsers: scoredUsers.length,
            percentile: Math.round((userRank / scoredUsers.length) * 100),
            user: userEntry,
            topUsers: scoredUsers.slice(0, 10),
            nearbyRanks: scoredUsers.slice(Math.max(0, userRank - 3), userRank + 3),
        };
    }

    /**
     * Generate daily/weekly challenges
     */
    static generateChallenges(userSkillDna) {
        const challenges = [
            {
                id: 'daily_practice',
                type: 'daily',
                title: 'Daily Practice',
                description: 'Spend 30 minutes learning any skill today',
                xpReward: 100,
                skillCoinsReward: 10,
                difficulty: 'easy',
            },
            {
                id: 'teach_someone',
                type: 'daily',
                title: 'Share Knowledge',
                description: 'Help someone learn a skill you know',
                xpReward: 150,
                skillCoinsReward: 25,
                difficulty: 'medium',
            },
            {
                id: 'complete_project',
                type: 'weekly',
                title: 'Project Master',
                description: 'Complete or contribute to a project this week',
                xpReward: 500,
                skillCoinsReward: 100,
                difficulty: 'hard',
            },
            {
                id: 'skill_chain',
                type: 'weekly',
                title: 'Chain Breaker',
                description: 'Participate in a skill chain this week',
                xpReward: 300,
                skillCoinsReward: 50,
                difficulty: 'medium',
            },
        ];

        // Add skill-specific challenges based on user's top skills
        userSkillDna.slice(0, 3).forEach((skill, index) => {
            challenges.push({
                id: `master_${skill.name.replace(/\s+/g, '_')}`,
                type: 'weekly',
                title: `Master ${skill.name}`,
                description: `Increase your ${skill.name} proficiency by 10%`,
                xpReward: 250 + index * 50,
                skillCoinsReward: 30 + index * 10,
                difficulty: 'medium',
            });
        });

        return challenges;
    }

    /**
     * Simulate level-up animation data
     */
    static generateLevelUpAnimation(previousLevel, newLevel) {
        return {
            levelUp: true,
            previousLevel,
            newLevel,
            xpBurst: 100,
            particleCount: 50,
            confettiDuration: 2000,
            achievementUnlocked: newLevel % 5 === 0, // Every 5 levels
        };
    }
}

module.exports = GamificationEngine;
