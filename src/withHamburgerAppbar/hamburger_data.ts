import React from 'react';
import HomeIcon from '../resources/svg/hamburger-home.svg';
import PreparingIcon from '../resources/svg/hamburger-for-preparing.svg';
import JobIcon from '../resources/svg/hamburger-jobs-internships.svg';
import CampusIcon from '../resources/svg/hamburger-campus.svg';
import EmployerIcon from '../resources/svg/hamburger-employer.svg';
import ContestIcon from '../resources/svg/hamburger-trophy.svg';
import LogoutIcon from '../resources/svg/hamburger-logout.svg';

export type DrawerSubContentType = {
  id: number;
  label: string;
  routePath: string;
  renderComponent: string;
  routeName: string;
  isNativeRoute: boolean;
  isHardRedirect: boolean;
  isNew?: boolean | null;
};

export type DrawerContentType = {
  isExpanded: boolean;
  labelIcon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  label: string;
  routePath?: string | null;
  renderComponent?: string | null;
  routeName?: string | null;
  isNativeRoute?: boolean | null;
  isHardRedirect?: boolean | null;
  subcategory?: DrawerSubContentType[] | null;
  hasBorderTop?: boolean | null;
  onlyForLogout?: boolean | null;
  isNew?: boolean | null;
};

const drawerData: DrawerContentType[] = [
  {
    isExpanded: false,
    labelIcon: HomeIcon,
    label: 'Home',
    routePath: '/',
    renderComponent: 'homepageFlow',
    routeName: 'homepage',
    isNativeRoute: false,
    isHardRedirect: false,
  },
  {
    isExpanded: false,
    labelIcon: PreparingIcon,
    label: 'For preparing',
    // routePath: "/for-preparing",
    // isNativeRoute: false,
    // isHardRedirect: false,
    subcategory: [
      {
        id: 1,
        label: 'Resume Maker',
        routePath: '/resume-maker',
        renderComponent: 'ResumeMakerScreen',
        routeName: 'resumeMaker',
        isNativeRoute: false,
        isHardRedirect: false,
      },
      {
        id: 2,
        label: 'Personlized Interview Q/A',
        routePath: '/interview-questions-and-answers',
        renderComponent: 'piqaFlow',
        routeName: 'piqa',
        isNativeRoute: false,
        isHardRedirect: false,
      },
      {
        id: 3,
        label: 'Interview Experience',
        routePath: '/career-guidance/interview-experiences/',
        renderComponent: 'NotYetDecided',
        routeName: 'piqa',
        isNativeRoute: false,
        isHardRedirect: true,
      },
      {
        id: 4,
        label: 'Career blogs',
        routePath: '/career-guidance',
        renderComponent: 'NotYetDecided',
        routeName: 'piqa',
        isNativeRoute: false,
        isHardRedirect: true,
      },
      {
        id: 5,
        label: 'Aptitude Test (FNAT)',
        routePath: '/fnat-aptitude-test',
        renderComponent: 'fnatFlow',
        routeName: 'fnat',
        isNativeRoute: false,
        isHardRedirect: false,
        isNew: true,
      },
    ],
  },
  {
    // hasBorderTop: true,
    isExpanded: false,
    labelIcon: ContestIcon,
    label: 'Contests',
    routePath: '/contest',
    renderComponent: 'contestSearch',
    routeName: 'contestSearch',
    isNativeRoute: true,
    isHardRedirect: false,
    isNew: true,
  },
  {
    isExpanded: false,
    labelIcon: JobIcon,
    label: 'Jobs & internships',
    // isNativeRoute: false,
    // isHardRedirect: false,
    subcategory: [
      {
        id: 6,
        label: 'Jobs',
        routePath: '/jobs-for-freshers',
        renderComponent: 'jobSearchFlow',
        routeName: 'jobSearch',
        isNativeRoute: false,
        isHardRedirect: false,
      },
      {
        id: 7,
        label: 'Internships',
        routePath: '/internships',
        renderComponent: 'jobSearchFlow',
        routeName: 'jobSearch',
        isNativeRoute: false,
        isHardRedirect: false,
      },
    ],
  },

  {
    hasBorderTop: true,
    isExpanded: false,
    labelIcon: CampusIcon,
    label: 'Campus',
    routePath: '/campus',
    renderComponent: 'NotYetDecided',
    routeName: 'contestSearch',
    isNativeRoute: false,
    isHardRedirect: true,
  },
  {
    isExpanded: false,
    labelIcon: EmployerIcon,
    label: 'Employer',
    routePath: '/employer',
    renderComponent: 'NotYetDecided',
    routeName: 'contestSearch',
    isNativeRoute: false,
    isHardRedirect: true,
  },
  {
    hasBorderTop: true,
    isExpanded: false,
    labelIcon: LogoutIcon,
    label: 'Logout',
    routePath: '/',
    renderComponent: 'NotYetDecided',
    routeName: 'logout',
    isNativeRoute: false,
    isHardRedirect: true,
    onlyForLogout: true,
  },
];

export type routeManifestContentType = {
  routePath?: string | null;
  renderComponent?: string | null;
  routeName?: string | null;
  label: string;
  isNativeRoute?: boolean | null;
};

export type routeManifestType = {
  mnjData: routeManifestContentType;
  resmanRegistration: routeManifestContentType;
  login: routeManifestContentType;
};

const routeManifest = {
  mnjData: {
    routePath: '/jobseeker/myprofile/view',
    renderComponent: 'mnjFlow',
    routeName: 'mnj',
    label: 'Firstnaukri | My Profile',
    isNativeRoute: false,
  },
  resmanRegistration: {
    routePath: '/jobseeker/registration',
    renderComponent: 'resmanFlow',
    routeName: 'resmanRegistration',
    label: '',
    isNativeRoute: false,
  },
  login: {
    routePath: '/jobseeker/login',
    renderComponent: 'loginFlow',
    routeName: 'login',
    label: 'Firstnaukri Login',
    isNativeRoute: true,
  },
};

export {drawerData, routeManifest};
