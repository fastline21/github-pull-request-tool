import Link from 'next/link';

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE;

const Header = () => {
	return (
		<header className='mx-auto p-5 bg-slate-100'>
			<nav>
				<div>
					<Link href='/'>{siteTitle}</Link>
				</div>
			</nav>
		</header>
	);
};

export default Header;
