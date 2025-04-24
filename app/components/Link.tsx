import Link from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'

interface Props {
  href: string
  children: React.ReactNode
}

const Links = ({ href, children }: Props) => {
  return (
    <RadixLink asChild>
      <Link href={href} id="link">
        {children}
      </Link>
    </RadixLink>
  )
}

export default Links

