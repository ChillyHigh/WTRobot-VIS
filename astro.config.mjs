// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://chillyhigh.github.io',
	base: '/WTRobot-VIS',
	output: 'static',
	integrations: [
		starlight({
			title: '南工问天 VIS',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
			},
			customCss: ['./src/styles/vis.css'],
			components: {
				Header: './src/components/Header.astro',
			},
			sidebar: [
				{
					label: '品牌规范',
					items: [
						{ autogenerate: { directory: 'brand' } },
					],
				},
				{
					label: '素材归档',
					items: [
						{ autogenerate: { directory: 'assets' } },
					],
				},
				{
					label: '应用规范',
					items: [
						{ autogenerate: { directory: 'guidelines' } },
					],
				},
				{
					label: '周边设计',
					items: [
						{ autogenerate: { directory: 'merch' } },
					],
				},
			],
		}),
	],
});
