"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';

export default function NavBar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  console.log("SESSION:", session); // ✅ Debug the session content

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" }
  ];

  const userImage = session?.user?.image || ""; // ✅ Avoid crash if image is missing

  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-6'>
              {links.map(link => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      'text-zinc-900': link.href === currentPath,
                      'text-zinc-500': link.href !== currentPath,
                      'hover:text-zinc-800 transition-colors': true
                    })}
                    href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={userImage}
                    fallback={session.user!.name! || "?"}
                    radius="full"
                    size="2"
                    className='cursor-pointer'

                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    {session.user!.email}
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                  
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
