'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { format } from 'date-fns';

import { GithubFormData, GithubResponse } from '@/interfaces/github.interface';

import { getMergePullRequest } from '@/controllers/github.controller';
import { useState } from 'react';
import Table from '@/components/Table';

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE;

const Home = () => {
	const [isSensitiveContent, setIsSensitiveContent] = useState(true);

	const handleSensitiveContent = () => {
		setIsSensitiveContent(!isSensitiveContent);
	};

	const githubDefaultFormData = {
		personal_access_token: '',
		organization: '',
		repository: '',
		label: '',
	};

	const GithubForm = useForm<GithubFormData>({
		defaultValues: githubDefaultFormData,
	});

	const GithubMutation = useMutation({
		mutationFn: (event: GithubFormData) => {
			return getMergePullRequest(event);
		},
	});

	const onSubmit = (event: GithubFormData) => {
		GithubMutation.mutate(event);
	};

	return (
		<div className='container mx-auto p-5'>
			<div>
				<h1 className='text-5xl'>{siteTitle}</h1>
			</div>
			<div className='py-5'>
				<form onSubmit={GithubForm.handleSubmit(onSubmit)}>
					<div className='grid grid-cols-2 gap-4'>
						<div className='mt-5'>
							<div className='relative'>
								<input
									type={
										isSensitiveContent ? 'password' : 'text'
									}
									{...GithubForm.register(
										'personal_access_token',
										{
											required:
												'Personal Access Token is required',
										}
									)}
									className={`border px-5 py-4 text-md rounded-md border-slate-400 block w-full disabled:pointer-events-none ${
										GithubMutation.isPending
											? 'cursor-not-allowed'
											: ''
									}`}
									placeholder='Personal Access Token'
									disabled={GithubMutation.isPending}
								/>
								<button
									type='button'
									className={`absolute top-0 end-0 p-5 rounded-e-md${
										isSensitiveContent ? ' active' : ''
									}`}
									onClick={handleSensitiveContent}
									disabled={GithubMutation.isPending}
								>
									<svg
										className='flex-shrink-0 size-3.5 text-gray-400 dark:text-neutral-600'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path
											className={
												!isSensitiveContent
													? 'hidden'
													: ''
											}
											d='M9.88 9.88a3 3 0 1 0 4.24 4.24'
										></path>
										<path
											className={
												!isSensitiveContent
													? 'hidden'
													: ''
											}
											d='M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68'
										></path>
										<path
											className={
												!isSensitiveContent
													? 'hidden'
													: ''
											}
											d='M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61'
										></path>
										<line
											className={
												!isSensitiveContent
													? 'hidden'
													: ''
											}
											x1='2'
											x2='22'
											y1='2'
											y2='22'
										></line>
										<path
											className={
												isSensitiveContent
													? 'block'
													: ''
											}
											d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'
										></path>
										<circle
											className={
												isSensitiveContent
													? 'block'
													: ''
											}
											cx='12'
											cy='12'
											r='3'
										></circle>
									</svg>
								</button>
							</div>
						</div>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register('organization')}
								className={`border px-5 py-4 text-md rounded-md border-slate-400 block w-full ${
									GithubMutation.isPending
										? 'cursor-not-allowed'
										: ''
								}`}
								placeholder='Organization'
								disabled={GithubMutation.isPending}
							/>
						</div>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register('repository', {
									required: 'Repository is required',
								})}
								className={`border px-5 py-4 text-md rounded-md border-slate-400 block w-full ${
									GithubMutation.isPending
										? 'cursor-not-allowed'
										: ''
								}`}
								placeholder='Repository'
								disabled={GithubMutation.isPending}
							/>
						</div>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register('label')}
								className={`border px-5 py-4 text-md rounded-md border-slate-400 block w-full ${
									GithubMutation.isPending
										? 'cursor-not-allowed'
										: ''
								}`}
								placeholder='Label'
								disabled={GithubMutation.isPending}
							/>
						</div>
					</div>
					<div className='mt-5'>
						<button
							type='submit'
							className={`px-2 py-2.5 ${
								GithubMutation.isPending
									? 'bg-slate-300 text-slate-700'
									: 'bg-blue-500 text-white'
							} w-full text-xl rounded-md ${
								GithubMutation.isPending
									? 'cursor-not-allowed'
									: ''
							}`}
							disabled={GithubMutation.isPending}
						>
							<div className='inline-flex mt-1'>
								<div className='mt-1'>
									{GithubMutation.isPending && (
										<svg
											className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
										>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											></path>
										</svg>
									)}
								</div>
								{GithubMutation.isPending
									? 'Loading...'
									: 'Submit'}
							</div>
						</button>
					</div>
				</form>
			</div>
			{GithubMutation.data && (
				<>
					<Table
						data={GithubMutation.data.data.pr.open_prs}
						dataCount={GithubMutation.data.data.pr_count.open_prs}
						title='Open'
					/>
					<Table
						data={GithubMutation.data.data.pr.closed_prs}
						dataCount={GithubMutation.data.data.pr_count.closed_prs}
						title='Closed'
					/>
				</>
			)}
		</div>
	);
};

export default Home;
