import { Key } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

import { GithubResponse } from '@/interfaces/github.interface';

const Table = ({ data = [], dataCount = 0, title = '' }) => {
	return (
		<div className='border-t-2 pt-5'>
			<h3 className='text-2xl mb-3'>{title} Pull Request</h3>
			<div>
				{dataCount > 0 ? (
					<div className='bg-slate-300'>
						<table className='table-auto w-full'>
							<thead className='bg-slate-500 text-white'>
								<tr>
									<th className='py-3'>#</th>
									<th className='py-3'>Title</th>
									<th className='py-3'>Merge Date</th>
									<th className='py-3'>URL</th>
									<th className='py-3'>User</th>
									<th className='py-3'>Merge Commit</th>
								</tr>
							</thead>
							<tbody className='text-center align-top'>
								{data.map(
									(element: GithubResponse, index: Key) => (
										<tr
											key={index}
											className='odd:bg-slate-100'
										>
											<td className='p-4'>
												{Number(index) + 1}
											</td>
											<td className='p-4'>
												{element.title}
											</td>
											<td className='p-4'>
												{element.merged_at
													? `${format(
															element.merged_at,
															'MM/dd/yyyy'
													  )}\n${format(
															element.merged_at,
															'hh:mm:ss aa'
													  )}`
													: 'N/A'}
											</td>
											<td className='p-4'>
												<Link
													href={element.html_url}
													target='_blank'
													className='hover:underline'
												>
													{element.html_url}
												</Link>
											</td>
											<td className='p-4'>
												{element.login
													? element.login
													: 'N/A'}
											</td>
											<td className='p-4'>
												{element.merge_commit_sha}
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				) : (
					<p className='pb-5'>No Merge Pull Request Found</p>
				)}
			</div>
		</div>
	);
};

export default Table;
