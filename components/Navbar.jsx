import styles from './Navbar.module.css'

import Link from 'next/link';

export default function Navbar() {


  return (
    <div className={styles.nav}>
        <div className={styles.navLogo}>
            <h1><Link href="/">Fund Raiser</Link></h1>
        </div>
        <div className={styles.navItems}>
            <ul className={styles.navItem}>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/signup">Sign Up</Link></li>
            </ul>
        </div>
    </div>
  );
}