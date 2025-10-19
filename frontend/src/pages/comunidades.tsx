import { FormEvent, useMemo, useState } from 'react';
import Head from 'next/head';

import Layout from '@/components/Layout';
import CommunityCard from '@/components/CommunityCard';
import { useCommunities, useCreateCommunity } from '@/hooks/useCommunities';
import {
	Community,
	CommunityTopic,
	CreateCommunityDTO,
} from '@/shared/types/community.types';

const DEFAULT_COMMUNITY: CreateCommunityDTO = {
	name: '',
	slug: '',
	description: '',
	topic: CommunityTopic.OUTROS,
	isPrivate: false,
	rules: '',
};

export default function Comunidades() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTopic, setSelectedTopic] = useState<CommunityTopic | ''>('');
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [newCommunity, setNewCommunity] = useState<CreateCommunityDTO>(DEFAULT_COMMUNITY);

	const queryParams = useMemo(
		() => ({
			search: searchTerm || undefined,
			topic: selectedTopic || undefined,
			onlyPublic: true,
		}),
		[searchTerm, selectedTopic]
	);

	const { data: communities = [], isLoading, isFetching, error } = useCommunities(queryParams);
	const createCommunityMutation = useCreateCommunity();

	const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await createCommunityMutation.mutateAsync(newCommunity);
			handleCloseModal();
		} catch (creationError) {
			console.error('Erro ao criar comunidade:', creationError);
		}
	};

	const handleFieldChange = <K extends keyof CreateCommunityDTO>(field: K, value: CreateCommunityDTO[K]) => {
		setNewCommunity((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCloseModal = () => {
		setShowCreateModal(false);
		setNewCommunity(DEFAULT_COMMUNITY);
	};

	return (
		<Layout>
			<Head>
				<title>Comunidades - PedagoPass</title>
				<meta
					name="description"
					content="Participe de comunidades temáticas e compartilhe experiências com educadores."
				/>
			</Head>

			<main className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-10">
				<div className="mx-auto w-full max-w-6xl space-y-8 px-4">
					<header className="rounded-2xl bg-white p-8 shadow-sm">
						<h1 className="text-3xl font-bold text-gray-900">Comunidades</h1>
						<p className="mt-2 text-gray-600">
							Conecte-se com outros educadores, compartilhe aprendizados e descubra novas oportunidades.
						</p>

						<div className="mt-6 grid gap-4 md:grid-cols-12">
							<div className="md:col-span-6">
								<label htmlFor="community-search" className="sr-only">
									Buscar comunidades
								</label>
								<input
									id="community-search"
									type="search"
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									placeholder="Buscar comunidades..."
									className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								/>
							</div>

							<div className="md:col-span-4">
								<label htmlFor="community-topic" className="sr-only">
									Filtrar por tópico
								</label>
								<select
									id="community-topic"
									value={selectedTopic}
									onChange={(event) => setSelectedTopic(event.target.value as CommunityTopic | '')}
									className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								>
									<option value="">Todos os tópicos</option>
									{Object.values(CommunityTopic).map((topic) => (
										<option key={topic} value={topic}>
											{topic}
										</option>
									))}
								</select>
							</div>

							<div className="md:col-span-2 flex items-center justify-end">
								<button
									type="button"
									onClick={() => setShowCreateModal(true)}
									className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 md:w-auto"
								>
									<span className="text-lg">+</span>
									Criar comunidade
								</button>
							</div>
						</div>
					</header>

					<section className="space-y-4">
						{(isLoading || isFetching) && (
							<div className="rounded-2xl bg-white p-8 text-center shadow-sm">
								<p className="text-gray-600">Carregando comunidades...</p>
							</div>
						)}

						{error && !isLoading && !isFetching && (
							<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
								Ocorreu um erro ao carregar as comunidades. Tente novamente mais tarde.
							</div>
						)}

						{!isLoading && !isFetching && !error && (
							<div className="rounded-2xl bg-white p-6 shadow-sm">
								<div className="mb-6 flex items-center justify-between">
									<h2 className="text-xl font-semibold text-gray-900">Comunidades disponíveis</h2>
									<span className="text-sm text-gray-500">
										{communities.length}{' '}
										{communities.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
									</span>
								</div>

								{communities.length === 0 ? (
									<div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
										Nenhuma comunidade encontrada com os filtros selecionados.
									</div>
								) : (
									<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
										{communities.map((community: Community) => (
											<CommunityCard key={community.id} community={community} />
										))}
									</div>
								)}
							</div>
						)}
					</section>
				</div>
			</main>

			{showCreateModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
						<div className="flex items-start justify-between">
							<div>
								<h3 className="text-lg font-semibold text-gray-900">Criar nova comunidade</h3>
								<p className="mt-1 text-sm text-gray-600">
									Preencha os campos abaixo para cadastrar uma nova comunidade pública.
								</p>
							</div>
							<button
								type="button"
								onClick={handleCloseModal}
								className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
								aria-label="Fechar modal"
							>
								<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						<form className="mt-6 space-y-4" onSubmit={handleCreate}>
							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="community-name">
									Nome
								</label>
								<input
									id="community-name"
									type="text"
									required
									value={newCommunity.name}
									onChange={(event) => handleFieldChange('name', event.target.value)}
									className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="community-slug">
									Slug
								</label>
								<input
									id="community-slug"
									type="text"
									required
									value={newCommunity.slug}
									onChange={(event) => handleFieldChange('slug', event.target.value)}
									className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="community-description">
									Descrição
								</label>
								<textarea
									id="community-description"
									required
									rows={3}
									value={newCommunity.description}
									onChange={(event) => handleFieldChange('description', event.target.value)}
									className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="community-topic-select">
									Tópico
								</label>
								<select
									id="community-topic-select"
									value={newCommunity.topic}
									onChange={(event) => handleFieldChange('topic', event.target.value as CommunityTopic)}
									className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								>
									{Object.values(CommunityTopic).map((topic) => (
										<option key={topic} value={topic}>
											{topic}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700" htmlFor="community-rules">
									Regras (opcional)
								</label>
								<textarea
									id="community-rules"
									rows={3}
									value={newCommunity.rules || ''}
									onChange={(event) => handleFieldChange('rules', event.target.value)}
									className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
								/>
							</div>

							<div className="flex items-center gap-3">
								<input
									id="community-private"
									type="checkbox"
									checked={newCommunity.isPrivate ?? false}
									onChange={(event) => handleFieldChange('isPrivate', event.target.checked)}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label className="text-sm text-gray-600" htmlFor="community-private">
									Comunidade privada
								</label>
							</div>

							<div className="flex items-center justify-end gap-3 pt-4">
								<button
									type="button"
									onClick={handleCloseModal}
									className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
								>
									Cancelar
								</button>
								<button
									type="submit"
									disabled={createCommunityMutation.isPending}
									className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
								>
									{createCommunityMutation.isPending ? 'Salvando...' : 'Criar comunidade'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</Layout>
	);
}
