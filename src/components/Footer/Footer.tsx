import Link from 'next/link';

const Footer = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();

	return (
		<div className='container mx-auto p-5'>
			<p className='bg-slate-100 p-5'>
				Copyright &copy; {year === 2024 ? year : `2024 - ${year}`} by{' '}
				<Link
					href='https://facitech.net'
					target='_blank'
					className='hover:underline'
				>
					Faci Tech
				</Link>
				. All Rights Reserved.
			</p>
		</div>
	);
};

export default Footer;
