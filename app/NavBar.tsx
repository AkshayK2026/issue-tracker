"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';

// AuthStatus component to handle user authentication status
const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated") {
    return <Link className='nav-link' href="/api/auth/signin">Login</Link>;
  }

  const userImage = session?.user?.image || "";
  const userInitial = session?.user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={userImage}
          fallback={userInitial}
          radius="full"
          size="2"
          className="cursor-pointer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>{session?.user?.email}</DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

// NavLinks component with dynamic styling based on current path
const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" }
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
              
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// NavBar component assembling everything together
const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
