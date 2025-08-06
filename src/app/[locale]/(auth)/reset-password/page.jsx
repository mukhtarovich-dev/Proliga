import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = () => {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <section className="bg-background mx-4 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:mx-0">
        <ResetPasswordForm />
      </section>
    </main>
  )
}

export default ResetPassword
