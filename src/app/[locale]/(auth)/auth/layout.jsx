import AuthListener from 'providers/AuthListener.provider'

const AuthLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <AuthListener>{children}</AuthListener>
    </main>
  )
}

export default AuthLayout
