import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'

const EditissueButton = ({issueId}:{issueId: number}) => {
  return (
    <Button>
    <Pencil2Icon/>
    <Link href={`/issues ${issueId}/edit`}>
        Edit issue
    vlc</Link>
</Button>
  )
}

export default EditissueButton