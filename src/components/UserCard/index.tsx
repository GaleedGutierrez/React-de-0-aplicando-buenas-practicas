import { JSX } from 'react';

import styles from './index.module.css';
import { User } from './useUsers';

function UserCard({ user }: Readonly<{ user: User }>): JSX.Element {
	return (
		<div className={styles['m-user-card']}>
			<p>{user.name}</p>
		</div>
	);
}

export default UserCard;
