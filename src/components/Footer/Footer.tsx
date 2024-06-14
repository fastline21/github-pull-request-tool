import Link from 'next/link';

const authorURL = process.env.NEXT_PUBLIC_AUTHOR_URL;

const Footer = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();

	return (
		<footer className='mx-auto pt-5'>
			<p className='bg-slate-100 p-5'>
				Copyright &copy; {year === 2024 ? year : `2024 - ${year}`} by{' '}
				<Link
					href={String(authorURL)}
					target='_blank'
					className='hover:underline'
				>
					Faci Tech
				</Link>
				. All Rights Reserved.
			</p>
		</footer>
	);
};

export default Footer;
