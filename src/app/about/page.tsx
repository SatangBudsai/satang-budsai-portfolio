import MainLayout from '@/layouts/main-layout'

export default function About() {
  return (
    <MainLayout>
      <div className='flex min-h-dvh flex-col items-center justify-center gap-4'>
        <h1 className='text-4xl font-bold'>About</h1>
        <p className='text-default-500'>หน้า About</p>
      </div>
    </MainLayout>
  )
}
