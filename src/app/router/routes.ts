export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  BOX_SOLUTIONS: '/box-solutions',
  BOX_DETAILS: '/box-solutions/:boxId',
  SPECIAL_PROJECTS: '/special-projects',

  APPLICATIONS_BOX: '/applications-box',
  APPLICATIONS_BOX_DETAILS: '/applications-box/:boxId',

  APPLICATIONS_SPECIAL_PROJECTS: '/applications-special-projects',
  APPLICATIONS_SPECIAL_PROJECTS_DETAILS:
    '/applications-special-projects/:projectId',

  LINKS_RESOURCES: '/links-resources',
  SUPPORT: '/support',

  ANALYTICS: '/analytics',

  AVERAGE_BOX_ATTENDANCE: '/analytics/average-box-attendance',
  APPLICATIONS_WORK: '/analytics/applications-work',
  BOX_SOLUTIONS_POPULARITY: '/analytics/box-solutions-popularity',
  DATA_EXPORT: '/analytics/data-export',
  USERS_ANALYTICS: '/analytics/users-analytics',

  SCHEDULE_MANAGEMENT: '/schedule-management',
  BOX_MANAGEMENT: '/box-management',
  USER_PERMISSIONS: '/user-permissions',
  SYSTEM_SETTINGS: '/system-settings',
} as const;

export type PathParams = {
  [ROUTES.BOX_DETAILS]: {
    boxId: string;
  };
  [ROUTES.APPLICATIONS_BOX_DETAILS]: {
    boxId: string;
  };
  [ROUTES.APPLICATIONS_SPECIAL_PROJECTS_DETAILS]: {
    projectId: string;
  };
};
