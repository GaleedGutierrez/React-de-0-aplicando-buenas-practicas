import Brand from '@icons/brand.svg';
import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './index.module.css';

export function Header(): JSX.Element {
	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<Outlet />
		</>
	);
}
