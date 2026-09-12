-- SkillSwap AI Database Schema
-- PostgreSQL

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    verified BOOLEAN DEFAULT FALSE,
    identity_verified BOOLEAN DEFAULT FALSE,
    credentials_verified BOOLEAN DEFAULT FALSE,
    portfolio_url VARCHAR(500),
    github_username VARCHAR(255),
    location VARCHAR(255),
    timezone VARCHAR(50),
    hourly_rate DECIMAL(10,2),
    xp_points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    skill_coins INTEGER DEFAULT 0,
    reputation_score FLOAT DEFAULT 0.0,
    streak_days INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    description TEXT,
    icon_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Skills (Skill DNA)
CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1, -- 1-5
    confidence_score FLOAT DEFAULT 0.0, -- 0-100%
    xp_earned INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    certificate_url VARCHAR(500),
    evidence JSON, -- Projects, courses, ratings, etc.
    strengths TEXT[],
    weaknesses TEXT[],
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_id)
);

-- Achievements & Badges
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    requirements JSON,
    rarity VARCHAR(50), -- common, rare, epic, legendary
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- Skill Matches
CREATE TABLE skill_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_a_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_b_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    match_score FLOAT DEFAULT 0.0, -- 0-100%
    reason TEXT,
    user_a_teaches_skill UUID REFERENCES skills(id),
    user_b_teaches_skill UUID REFERENCES skills(id),
    status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, completed
    accepted_by_a BOOLEAN DEFAULT FALSE,
    accepted_by_b BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_a_id, user_b_id)
);

-- Skill Chains (multi-person swaps)
CREATE TABLE skill_chains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chain_participants UUID[] NOT NULL,
    chain_compatibility FLOAT DEFAULT 0.0,
    structure JSON, -- The chain structure and flow
    status VARCHAR(50) DEFAULT 'pending', -- pending, active, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Swipe history (Tinder-style matching)
CREATE TABLE swipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL, -- 'like', 'pass'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, target_user_id)
);

-- Connections/Matches that both users accepted
CREATE TABLE connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_a_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_b_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, blocked
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    learning_session_id UUID,
    UNIQUE(user_a_id, user_b_id)
);

-- Learning Sessions
CREATE TABLE learning_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    initiator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_taught UUID NOT NULL REFERENCES skills(id),
    skill_learned UUID NOT NULL REFERENCES skills(id),
    session_type VARCHAR(50) DEFAULT 'free_swap', -- free_swap, paid_learning
    status VARCHAR(50) DEFAULT 'pending', -- pending, active, completed, cancelled
    scheduled_at TIMESTAMP,
    completed_at TIMESTAMP,
    xp_reward_teacher INTEGER DEFAULT 0,
    xp_reward_learner INTEGER DEFAULT 0,
    rating_from_teacher FLOAT,
    rating_from_learner FLOAT,
    feedback_from_teacher TEXT,
    feedback_from_learner TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments & Transactions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id UUID NOT NULL REFERENCES users(id),
    to_user_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    skill_coin_amount INTEGER DEFAULT 0,
    learning_session_id UUID REFERENCES learning_sessions(id),
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, cancelled
    payment_method VARCHAR(50), -- stripe, skill_coins, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Gamification: Daily/Weekly Challenges
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    challenge_type VARCHAR(50), -- daily, weekly, skill_specific
    difficulty VARCHAR(50), -- easy, medium, hard
    xp_reward INTEGER DEFAULT 100,
    skill_coins_reward INTEGER DEFAULT 10,
    requirements JSON,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, challenge_id)
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    required_skills UUID[] NOT NULL,
    difficulty VARCHAR(50),
    status VARCHAR(50) DEFAULT 'open', -- open, in_progress, completed
    github_repo VARCHAR(500),
    project_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE project_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(100),
    contribution_score FLOAT DEFAULT 0.0,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- Hackathons
CREATE TABLE hackathons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    required_skills UUID[] NOT NULL,
    prize_pool DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'upcoming', -- upcoming, active, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hackathon_teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hackathon_id UUID NOT NULL REFERENCES hackathons(id) ON DELETE CASCADE,
    team_name VARCHAR(255) NOT NULL,
    team_lead_id UUID NOT NULL REFERENCES users(id),
    members UUID[] NOT NULL,
    team_compatibility FLOAT DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaderboards
CREATE TABLE leaderboard_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    leaderboard_type VARCHAR(50), -- global, college, skill_specific
    rank INTEGER,
    score INTEGER,
    period VARCHAR(50), -- weekly, monthly, all_time
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50), -- match, message, achievement, etc.
    title VARCHAR(255),
    message TEXT,
    related_user_id UUID REFERENCES users(id),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX idx_user_skills_skill_id ON user_skills(skill_id);
CREATE INDEX idx_skill_matches_user_a ON skill_matches(user_a_id);
CREATE INDEX idx_skill_matches_user_b ON skill_matches(user_b_id);
CREATE INDEX idx_swipes_user_id ON swipes(user_id);
CREATE INDEX idx_learning_sessions_initiator ON learning_sessions(initiator_id);
CREATE INDEX idx_leaderboard_entries_type ON leaderboard_entries(leaderboard_type);
