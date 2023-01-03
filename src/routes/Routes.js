import React from 'react';
const LoginContainer = React.lazy(() => import('../modules/Login/LoginContainer'));
const DashboardContainer = React.lazy(() => import('../modules/Dashboard/DashboardContainer'));
const SettingContainer = React.lazy(() => import('../modules/Setting/SettingContainer'));
const ProjectContainer = React.lazy(() => import('../modules/Projects/ProjectContainer'));
const ProjectDocumentsContainer = React.lazy(() =>
  import('../modules/ProjectDocuments/ProjectDocumentsContainer')
);
const DocumentContainer = React.lazy(() => import('../modules/Document/DocumentContainer'));
const NotificationContainer = React.lazy(() =>
  import('../modules/Notification/NotificationContainer')
);

const AuthContainer = React.lazy(() => import('../modules/Auth/AuthContainer'));
const LandingContainer = React.lazy(() => import('../modules/LandingPage/LandingContainer'));
const DocumentReviewContainer = React.lazy(() =>
  import('../modules/DocumentReview/DocumentReviewContainer')
);
const DocumentHistory = React.lazy(() => import('../modules/DocumentHistory/DocumentHistory'));
export const PublicRoutesList = [
  {
    name: 'login',
    title: 'Login',
    path: '/login',
    Component: LoginContainer
  },
  {
    name: 'authentication',
    title: 'Authentication',
    path: '/auth',
    Component: AuthContainer
  },
  {
    name: 'Landing',
    title: 'Landing',
    path: '/',
    Component: LandingContainer
  }
];

// Private Routes

export const PrivateRoutesList = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    path: 'dashboard',
    component: DashboardContainer
  },
  {
    name: 'setting',
    title: 'Setting',
    path: 'setting',
    component: SettingContainer
  },
  {
    name: 'projects',
    title: 'Projects',
    path: 'projects',
    component: ProjectContainer
  },
  {
    name: 'project-documents',
    title: 'Project Documents',
    path: '/project-documents/:id',
    component: ProjectDocumentsContainer
  },
  {
    name: 'documents',
    title: 'Documents',
    path: '/documents/:id',
    component: DocumentContainer
  },
  {
    name: 'notification',
    title: 'Notification',
    path: '/notification',
    component: NotificationContainer
  },
  {
    name: 'document-review',
    title: 'Document Review',
    path: '/document-review/:id',
    component: DocumentReviewContainer
  },
  {
    name: 'document-history',
    title: 'Document History',
    path: '/history',
    component: DocumentHistory
  }
];
