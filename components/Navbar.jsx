import { useEffect } from "react";
import styles from "./Navbar.module.css";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const {data: session } = useSession()

  return (
    <div className={styles.nav}>
      <div className={styles.navLogo}>
        <h1>
          <Link href="/">Fund Raiser</Link>
        </h1>
      </div>
      <div className={styles.navItems}>
        <ul className={styles.navItem}>
          <li>
            <Link href="/funding">Create Funding</Link>
          </li>
          {!session && (
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
