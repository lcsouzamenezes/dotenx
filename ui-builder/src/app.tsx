import { createEmotionCache, MantineProvider, MantineThemeOverride } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BuilderPage } from './pages/builder'
import { EcommerceBuilder } from './pages/ecommerce-builder'
import { ExtensionDetailsPage } from './pages/extension'
import { ExtensionCreatePage } from './pages/extension-create'
import { ExtensionEditPage } from './pages/extension-edit'
import { ExtensionsPage } from './pages/extensions'
import { NotFoundPage } from './pages/not-found'

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
})
const emotionCache = createEmotionCache({ key: 'mantine' })
const theme: MantineThemeOverride = {
	colors: {
		rose: [
			'#fff1f2',
			'#ffe4e6',
			'#fecdd3',
			'#fda4af',
			'#fb7185',
			'#f43f5e',
			'#e11d48',
			'#be123c',
			'#9f1239',
			'#881337',
		],
	},
	primaryColor: 'rose',
	fontFamily: "'Inter', sans-serif",
	fontFamilyMonospace: 'monospace',
}

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider
				withNormalizeCSS
				withGlobalStyles
				emotionCache={emotionCache}
				theme={theme}
			>
				<NotificationsProvider>
					<ModalsProvider>
						<BrowserRouter>
							<Router />
						</BrowserRouter>
					</ModalsProvider>
				</NotificationsProvider>
			</MantineProvider>
		</QueryClientProvider>
	)
}

function Router() {
	return (
		<Layout>
			<Routes>
				<Route path="/ecommerce/:projectName/:pageName" element={<EcommerceBuilder />} />
				<Route path="/extensions-edit/:projectName/:name" element={<ExtensionEditPage />} />
				<Route path="/extensions-create/:projectName" element={<ExtensionCreatePage />} />
				<Route path="/extensions/:projectName/:name" element={<ExtensionDetailsPage />} />
				<Route path="/extensions/:projectName" element={<ExtensionsPage />} />
				<Route path="/projects/:projectName/:pageName" element={<BuilderPage />} />
				<Route path="/projects/:projectName" element={<Navigate to="index" replace />} />
				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
		</Layout>
	)
}

function Layout({ children }: { children: ReactNode }) {
	return <div className="text-slate-700">{children}</div>
}
