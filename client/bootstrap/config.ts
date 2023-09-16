/* eslint-disable linebreak-style */
import { IconTemplate, IconDashboard, IconFile, IconSettings, IconLayoutDashboard, IconFileSymlink } from '@tabler/icons';

export const AdditionalModules = [{
  name: 'दर्ता चलानी',
  key: 'darta-chalani-chalani',
  url: '/admin/darta-chalani',
  match: '/admin/darta-chalani-chalani',
  icon: IconFile,
  role: ['user'],
  subMenuItems: [
    {
      name: 'दर्ता किताब',
      key: 'darta-chalani-kitab',
      url: '/admin/darta-chalani/darta-kitab',
      match: '/admin/darta-chalani-chalani/darta-chalani-kitab',
    },
    {
      name: 'चलानी किताब',
      key: 'chalani-kitab',
      url: '/admin/darta-chalani/chalani-kitab',
      match: '/admin/darta-chalani-chalani/chalani-kitab',
    },
  ],
},
  {
  name: 'न्यायिक समिति',
  key: 'lawsuit',
  url: '/admin/lawsuit',
  match: '/admin/lawsuit',
  icon: IconFile,

  role: ['user'],
  subMenuItems: [
    {
      name: 'पेशीको सूची',
      key: 'caselist',
      url: '/admin/lawsuit/caselist',
      match: '/admin/lawsuit/caselist',
    },
  ],
},
];

export const primarySideMenuItems = [
  {
    name: 'ड्यासबोर्ड',
    key: 'dashboard',
    url: '/admin/dashboard',
    match: '/admin/dashboard',
    icon: IconDashboard,
    role: ['user', 'admin'],
  },
  {
    name: 'प्रणाली सेटिङहरू',
    key: 'system-settings',
    url: '/admin/system-settings',
    match: '/admin/system-settings',
    icon: IconSettings,
    role: ['admin'],
    subMenuItems: [{
      name: 'सेटअप',
      key: 'setup',
      url: '/admin/system-settings/setup',
      match: '/admin/system-settings/setup',
    }, {
      name: 'शाखा',
      key: 'branches',
      url: '/admin/system-settings/branches',
      match: '/admin/system-settings/branches',
    }, {
      name: 'प्रयोगकर्ता',
      key: 'users',
      url: '/admin/system-settings/users',
      match: '/admin/system-settings/users',
    }, {
      name: 'पदनाम सूची',
      key: 'designations',
      url: '/admin/system-settings/designations',
      match: '/admin/system-settings/designations',
    }, {
      name: 'पदाधिकारी',
      key: 'authorities',
      url: '/admin/system-settings/authorities',
      match: '/admin/system-settings/authorities',
    },
    ],
  },
  {
    name: 'Overview',
    key: 'overview',
    url: 'admin/ward',
    match: 'admin',
    icon: IconLayoutDashboard,
    role: ['admin'],
    subMenuItems: [
      {
        name: 'Wards',
        key: 'ward',
        url: '/admin/ward',
        match: '/admin/ward',
      },
      {
        name: 'Departments',
        key: 'department',
        url: '/admin/department',
        match: '/admin/overview/department',
      },
      {
        name: 'Category',
        key: 'category',
        url: '/admin/category',
        match: '/admin/category',
      },
    ],
  },
  {
    name: 'Template System',
    key: 'template-system',
    url: 'admin/templates',
    match: 'admin/templates',
    icon: IconTemplate,
    role: ['admin', 'user'],
    subMenuItems: [
     {
        name: 'Templates',
        key: 'templates',
        url: '/admin/templates/create',
        match: '/admin/templates/create',
      },
    ],
  },
  {
    name: 'Users Overview',
    key: 'registeration',
    url: 'admin/users',
    match: 'admin/users',
    icon: IconFile,
    role: ['admin'],
    subMenuItems: [
      {
        name: 'Users',
        key: 'templates',
        url: '/admin/users',
        match: '/admin/users',
      },
      {
        name: 'Create User',
        key: 'create-user',
        url: '/admin/users/create',
        match: '/admin/users/create',
      },
      {
        name: 'Set User Role',
        key: 'setrole',
        url: '/admin/users/setRole',
        match: '/admin/users/setRole',
      },
      {
        name: 'SewaGrahi Registeration',
        key: 'sewagrahi-registeration',
        url: '/admin/users/sewagrahi/register',
        match: '/admin/users/sewagrahi/register',
      },
    ],
  },
  {
    name: 'Darta',
    key: 'darta',
    url: 'admin/darta-chalani',
    match: 'admin/darta-chalani',
    icon: IconFileSymlink,
    role: ['admin'],
    subMenuItems: [
      {
        name: 'Darta Kitab',
        key: 'darta-kitab',
        url: '/admin/darta-chalani/darta-kitab',
        match: '/admin/darta-chalani/darta-kitab',
      },
      {
        name: 'Chalani Kitab',
        key: 'chalani-kitab',
        url: '/admin/darta-chalani/chalani-kitab',
        match: '/admin/darta-chalani/chalani-kitab',
      },
    ],
  },
  {
    name: 'खाता सेटिङ',
    key: 'account-settings',
    url: '/admin/settings',
    match: '/admin/settings',
    icon: IconSettings,
    role: ['user'],
  },

  {
    name: 'Gunaso',
    key: 'gunaso',
    url: 'admin/gunaso',
    match: 'admin/gunaso',
    icon: IconFileSymlink,
    role: ['admin'],
    subMenuItems: [
      {
        name: 'Dashboard',
        key: 'dashboard',
        url: '/admin/gunaso/dashboard',
        match: '/admin/gunaso/dashboard',
      },
    ],
  },
  {
    name: 'खाता सेटिङ',
    key: 'account-settings',
    url: '/admin/settings',
    match: '/admin/settings',
    icon: IconSettings,
    role: ['user'],
  },
];

export const sideMenuItems = primarySideMenuItems.concat(AdditionalModules);
