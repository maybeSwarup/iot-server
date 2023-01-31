const user = ['getJobs', 'manageJobs'];
const admin = ['getUsers', 'manageUsers', ...user];

const allRoles = { user, admin };

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
