'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { format } from 'date-fns';

import { GithubFormData, GithubResponse } from '@/interfaces/github.interface';

import { getMergePullRequest } from '@/controllers/github.controller';
import { Key, useState } from 'react';

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
									className='border px-5 py-4 text-md rounded-md border-slate-400 block w-full disabled:pointer-events-none'
									placeholder='Personal Access Token'
									id='hs-toggle-password'
								/>
								<button
									type='button'
									className={`absolute top-0 end-0 p-5 rounded-e-md${
										isSensitiveContent ? ' active' : ''
									}`}
									onClick={handleSensitiveContent}
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
								className='border px-5 py-4 text-md rounded-md border-slate-400 block w-full'
								placeholder='Organization'
							/>
						</div>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register('repository', {
									required: 'Repository is required',
								})}
								className='border px-5 py-4 text-md rounded-md border-slate-400 block w-full'
								placeholder='Repository'
							/>
						</div>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register('label')}
								className='border px-5 py-4 text-md rounded-md border-slate-400 block w-full'
								placeholder='Label'
							/>
						</div>
					</div>
					<div className='mt-5'>
						<button
							type='submit'
							className={`p-2 ${
								GithubMutation.isPending
									? 'bg-slate-300 text-slate-700'
									: 'bg-blue-500 text-white'
							} w-full text-xl rounded-md px-5 py-4 ${
								GithubMutation.isPending && 'cursor-not-allowed'
							}`}
							disabled={GithubMutation.isPending}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
			{GithubMutation.isPending && (
				<div className='border-t-2'>
					<p className='pt-5'>Loading...</p>
				</div>
			)}
			{GithubMutation.data && (
				<div className='border-t-2 pt-5'>
					<div>
						{GithubMutation.data.data.pr_count > 0 ? (
							<div className='bg-slate-100'>
								<table className='table-auto'>
									<thead className='bg-slate-300 text-neutral-700'>
										<tr>
											<th className='py-3'>#</th>
											<th className='py-3'>Title</th>
											<th className='py-3'>Merge Date</th>
											<th className='py-3'>URL</th>
											<th className='py-3'>User</th>
											<th className='py-3'>
												Merge Commit
											</th>
										</tr>
									</thead>
									<tbody className='text-center align-top'>
										{GithubMutation.data.data.pr.map(
											(
												element: GithubResponse,
												index: Key
											) => (
												<tr key={index}>
													<td className='p-4'>
														{Number(index) + 1}
													</td>
													<td className='p-4'>
														{element.title}
													</td>
													<td className='p-4'>
														{format(
															element.merged_at,
															'MM/dd/yyyy hh:mm:ss aa'
														)}
													</td>
													<td className='p-4'>
														<NextLink
															href={
																element.html_url
															}
															target='_blank'
															className='hover:underline'
														>
															{element.html_url}
														</NextLink>
													</td>
													<td className='p-4'>
														{element.login}
													</td>
													<td className='p-4'>
														{
															element.merge_commit_sha
														}
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>
						) : (
							<p>No Merge Pull Request Found</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
