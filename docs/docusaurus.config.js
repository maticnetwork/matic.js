/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Matic.js Docs',
  tagline: 'Javascript developer library for interacting with Matic Network',
  url: 'https://docs.matic.network/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'maticnetwork',
  projectName: 'matic.js',
  themeConfig: {
    navbar: {
      title: 'Matic.js',
      logo: {
        alt: 'matic logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          label: "Discord",
          href: "https://discord.gg/polygon",
          position: "right",
        },
        {
          href: 'https://github.com/maticnetwork/matic.js/',
          label: 'GitHub',
          position: 'right',
        },
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'abc',
              to: '/',
            },
            {
              label: 'abc',
              to: '/',
            },
            {
              label: 'adf',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/polygon',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/0xPolygon',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/maticnetwork/matic.js',
            },
          ],
        },
      ],
      copyright: `Copyright © 2021-${new Date().getFullYear()} Matic Network.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/maticnetwork/matic.js/edit/master/docs/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
