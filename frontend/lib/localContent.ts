export type LocalPost = { id: string; caption: string; type: string; tags: string[]; createdAt: string; user: { name: string; avatarUrl?: string | null } }
export type LocalTeam = { id: string; projectTopic: string; createdBy: { name: string }; members: { roleNeeded: string }[] }

export const localProjects = [
    { id: 'local-project-1', title: 'Build a personal portfolio', description: 'Create a thoughtful portfolio with a case study and a clear point of view.', level: 'BEGINNER', resourceLinks: [] },
    { id: 'local-project-2', title: 'Community recipe exchange', description: 'Design and build a small recipe-sharing experience for a local community.', level: 'BEGINNER', resourceLinks: [] },
    { id: 'local-project-3', title: 'Climate habits dashboard', description: 'Turn household sustainability data into a useful weekly decision tool.', level: 'INTERMEDIATE', resourceLinks: [] },
    { id: 'local-project-4', title: 'Peer learning marketplace', description: 'Prototype matching, scheduling, and trust signals for skill exchange.', level: 'INTERMEDIATE', resourceLinks: [] },
    { id: 'local-project-5', title: 'Open source mentor network', description: 'Build a scalable platform for volunteer mentors and learning circles.', level: 'ADVANCED', resourceLinks: [] },
]

export const localRooms = ['Web Development', 'UI/UX Design', 'Data Structures', 'Public Speaking'].map((topic, index) => ({ id: `local-room-${index + 1}`, topic, description: `A focused room for ${topic} learners and mentors.`, _count: { messages: index * 3 } }))
export const localPosts: LocalPost[] = [{ id: 'local-post-1', caption: 'I am looking for feedback on a first product design case study.', type: 'POST', tags: ['Product Design'], createdAt: new Date().toISOString(), user: { name: 'SkillSwap community' } }]
export const localTeams: LocalTeam[] = [{ id: 'local-team-1', projectTopic: 'Climate habits dashboard', createdBy: { name: 'SkillSwap community' }, members: [{ roleNeeded: 'React developer' }, { roleNeeded: 'UX researcher' }] }]