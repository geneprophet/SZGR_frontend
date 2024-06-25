export default [
  {
    path: '/',
    component: '@/layouts/LayoutFixed',
    routes: [
      {
        path: '/',
        component: '@/pages/index',
      },
      {
        path: '/home',
        component: '@/pages/index',
      },
      {
        path: '/variant/:name',
        component: '@/pages/VariantOverview',
      },
      {
        path: '/datasetresult/:name',
        component: '@/pages/DatasetResult',
      },
      {
        path: '/gene_curation/:name',
        component: '@/pages/GeneCuration',
      },
      {
        path: '/gene_deg/:name',
        component: '@/pages/GeneDeg',
      },
      {
        path: '/gene_association/:name',
        component: '@/pages/GeneAssociation',
      },
      {
        path: '/gene_post/:name',
        component: '@/pages/GenePost',
      },
      {
        path: '/explorecmap/:dataset/:tissue/:sig_index',
        component: '@/pages/ExploreCMap',
      },
      {
        path: '/exploregeo/:dataset/:tissue/:accession',
        component: '@/pages/ExploreGEO',
      },
      {
        path: '/contact',
        component: '@/pages/Contact',
      },
      {
        path: '/download',
        component: '@/pages/Download',
      },
      {
        path: '/documentation',
        component: '@/pages/Documentation',
      },
    ],
  },
];