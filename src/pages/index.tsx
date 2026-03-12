import MainLayout from '@/layouts/main-layout'
import { Fragment, ReactElement } from 'react'
import { addToast, Input } from '@heroui/react'

type Props = {}

const Home = (props: Props) => {
  return <Fragment></Fragment>
}

export default Home
Home.auth = false

Home.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <MainLayout>{page}</MainLayout>
    </Fragment>
  )
}
