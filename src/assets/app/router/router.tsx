import { createBrowserRouter } from 'react-router';
import { ROUTES } from '@/assets/app/router/routes';
import App from '@/App';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        lazy: async () => {
          const module = await import('@/pages/HomePage');
          return { Component: module.HomePage };
        },
      },
      {
        path: ROUTES.BOX_SOLUTIONS,
        lazy: async () => {
          const module = await import('@/pages/BoxSolutionsPage');
          return { Component: module.BoxSolutionsPage };
        },
      },
      {
        path: ROUTES.BOX_DETAILS,
        lazy: async () => {
          const module =
            await import('@/pages/BoxSolutionsPage/BoxDetailsPage');
          return { Component: module.BoxDetailsPage };
        },
      },
      {
        path: ROUTES.SPECIAL_PROJECTS,
        lazy: async () => {
          const module = await import('@/pages/SpecialProjectsPage');
          return { Component: module.SpecialProjectsPage };
        },
      },
      {
        path: ROUTES.APPLICATIONS_BOX,
        lazy: async () => {
          const module =
            await import('@/pages/ApplicationsPage/ApplicationsBoxPage');
          return { Component: module.ApplicationsBoxPage };
        },
      },
      {
        path: ROUTES.APPLICATIONS_BOX_DETAILS,
        lazy: async () => {
          const module =
            await import('@/pages/ApplicationsPage/ApplicationsBoxPage/ApplicationsBoxDetailsPage');
          return { Component: module.ApplicationsBoxDetailsPage };
        },
      },
      {
        path: ROUTES.APPLICATIONS_SPECIAL_PROJECTS,
        lazy: async () => {
          const module =
            await import('@/pages/ApplicationsPage/ApplicationsProjectPage');
          return { Component: module.ApplicationsProjectPage };
        },
      },
      {
        path: ROUTES.APPLICATIONS_SPECIAL_PROJECTS_DETAILS,
        lazy: async () => {
          const module =
            await import('@/pages/ApplicationsPage/ApplicationsProjectPage/ApplicationsProjectDetailsPage');
          return { Component: module.ApplicationsProjectDetailsPage };
        },
      },
      {
        path: ROUTES.LINKS_RESOURCES,
        lazy: async () => {
          const module = await import('@/pages/LinksResourcesPage');
          return { Component: module.LinksResourcesPage };
        },
      },
      {
        path: ROUTES.SUPPORT,
        lazy: async () => {
          const module = await import('@/pages/SupportPage');
          return { Component: module.SupportPage };
        },
      },
      {
        path: ROUTES.ANALYTICS,
        lazy: async () => {
          const module = await import('@/pages/AnalyticsPage');
          return { Component: module.AnalyticsPage };
        },
      },
      {
        path: ROUTES.AVERAGE_BOX_ATTENDANCE,
        lazy: async () => {
          const module =
            await import('@/pages/AnalyticsPage/AverageBoxAttendancePage');
          return { Component: module.AverageBoxAttendancePage };
        },
      },
      {
        path: ROUTES.APPLICATIONS_WORK,
        lazy: async () => {
          const module =
            await import('@/pages/AnalyticsPage/ApplicationsWorkPage');
          return { Component: module.ApplicationsWorkPage };
        },
      },
      {
        path: ROUTES.BOX_SOLUTIONS_POPULARITY,
        lazy: async () => {
          const module =
            await import('@/pages/AnalyticsPage/BoxSolutionsPopularityPage');
          return { Component: module.BoxSolutionsPopularityPage };
        },
      },
      {
        path: ROUTES.DATA_EXPORT,
        lazy: async () => {
          const module = await import('@/pages/AnalyticsPage/DataExportPage');
          return { Component: module.DataExportPage };
        },
      },
      {
        path: ROUTES.USERS_ANALYTICS,
        lazy: async () => {
          const module =
            await import('@/pages/AnalyticsPage/UsersAnalyticsPage');
          return { Component: module.UsersAnalyticsPage };
        },
      },
      {
        path: ROUTES.SCHEDULE_MANAGEMENT,
        lazy: async () => {
          const module = await import('@/pages/ScheduleManagementPage');
          return { Component: module.ScheduleManagementPage };
        },
      },
      {
        path: ROUTES.BOX_MANAGEMENT,
        lazy: async () => {
          const module = await import('@/pages/BoxManagementPage');
          return { Component: module.BoxManagementPage };
        },
      },
      {
        path: ROUTES.USER_PERMISSIONS,
        lazy: async () => {
          const module = await import('@/pages/UserPermissionsPage');
          return { Component: module.UserPermissionsPage };
        },
      },
      {
        path: ROUTES.SYSTEM_SETTINGS,
        lazy: async () => {
          const module = await import('@/pages/SystemSettingsPage');
          return { Component: module.SystemSettingsPage };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const module = await import('@/pages/NotFoundPage');
          return { Component: module.NotFoundPage };
        },
      },
    ],
  },
]);
