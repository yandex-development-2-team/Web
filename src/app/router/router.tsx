import { createBrowserRouter } from 'react-router';
import RootLayout from '@/app/router/RootLayout';
import { ROUTES } from '@/app/router/routes';
import App from '@/App';

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          element: <App />,
          children: [
            {
              path: ROUTES.HOME,
              lazy: () => import('@/pages/HomePage/HomePage'),
            },
            {
              path: ROUTES.BOX_SOLUTIONS,
              lazy: () => import('@/pages/BoxSolutionsPage/BoxSolutionsPage'),
            },
            {
              path: ROUTES.BOX_DETAILS,
              lazy: () =>
                import('@/pages/BoxSolutionsPage/BoxDetailsPage/BoxDetailsPage'),
            },
            {
              path: ROUTES.SPECIAL_PROJECTS,
              lazy: () =>
                import('@/pages/SpecialProjectsPage/SpecialProjectsPage'),
            },
            {
              path: ROUTES.APPLICATIONS_BOX,
              lazy: () =>
                import('@/pages/ApplicationsPage/ApplicationsBoxPage/ApplicationsBoxPage'),
            },
            {
              path: ROUTES.APPLICATIONS_BOX_DETAILS,
              lazy: () =>
                import('@/pages/ApplicationsPage/ApplicationsBoxPage/ApplicationsBoxDetailsPage/ApplicationsBoxDetailsPage'),
            },
            {
              path: ROUTES.APPLICATIONS_SPECIAL_PROJECTS,
              lazy: () =>
                import('@/pages/ApplicationsPage/ApplicationsProjectPage/ApplicationsProjectPage'),
            },
            {
              path: ROUTES.APPLICATIONS_SPECIAL_PROJECTS_DETAILS,
              lazy: () =>
                import('@/pages/ApplicationsPage/ApplicationsProjectPage/ApplicationsProjectDetailsPage/ApplicationsProjectPage'),
            },
            {
              path: ROUTES.LINKS_RESOURCES,
              lazy: () =>
                import('@/pages/LinksResourcesPage/LinksResourcesPage'),
            },
            {
              path: ROUTES.SUPPORT,
              lazy: () => import('@/pages/SupportPage/SupportPage'),
            },
            {
              path: ROUTES.ANALYTICS,
              lazy: () => import('@/pages/AnalyticsPage/AnalyticsPage'),
            },
            {
              path: ROUTES.AVERAGE_BOX_ATTENDANCE,
              lazy: () =>
                import('@/pages/AnalyticsPage/AverageBoxAttendancePage/AverageBoxAttendancePage'),
            },
            {
              path: ROUTES.APPLICATIONS_WORK,
              lazy: () =>
                import('@/pages/AnalyticsPage/ApplicationsWorkPage/ApplicationsWorkPage'),
            },
            {
              path: ROUTES.BOX_SOLUTIONS_POPULARITY,
              lazy: () =>
                import('@/pages/AnalyticsPage/BoxSolutionsPopularityPage/BoxSolutionsPopularityPage'),
            },
            {
              path: ROUTES.DATA_EXPORT,
              lazy: () =>
                import('@/pages/AnalyticsPage/DataExportPage/DataExportPage'),
            },
            {
              path: ROUTES.USERS_ANALYTICS,
              lazy: () =>
                import('@/pages/AnalyticsPage/UsersAnalyticsPage/UsersAnalyticsPage'),
            },
            {
              path: ROUTES.SCHEDULE_MANAGEMENT,
              lazy: () =>
                import('@/pages/ScheduleManagementPage/ScheduleManagementPage'),
            },
            {
              path: ROUTES.BOX_MANAGEMENT,
              lazy: () => import('@/pages/BoxManagementPage/BoxManagementPage'),
            },
            {
              path: ROUTES.USER_PERMISSIONS,
              lazy: () =>
                import('@/pages/UserPermissionsPage/UserPermissionsPage'),
            },
            {
              path: ROUTES.SYSTEM_SETTINGS,
              lazy: () =>
                import('@/pages/SystemSettingsPage/SystemSettingsPage'),
            },
          ],
        },
        {
          path: ROUTES.LOGIN,
          lazy: () => import('@/pages/LoginPage/LoginPage'),
        },
        {
          path: '*',
          lazy: () => import('@/pages/NotFoundPage/NotFoundPage'),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
