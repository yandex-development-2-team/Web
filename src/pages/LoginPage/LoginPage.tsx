import LoginForm from './LoginForm'
import loginBg from '@/assets/images/login-page-cover.png'

export default function LoginPage() {
  return (
    <div className="h-svh w-full bg-background px-[30px] py-5 space-x-5 flex">
      {/* Левая часть — теперь с полной высотой */}
      <div className="flex min-w-[445px] max-w-[445px] flex-shrink-0 h-full relative">
        {/* Весь контент внутри одного flex-контейнера с центрированием */}
        <div className="flex w-full flex-col items-center justify-center p-10 bg-secondary rounded-lg">
          {/* Логотип */}
          <div className="gap-10 absolute left-17 top-6 text-left">
            <h1 className="text-[36px] font-bold tracking-normal text-accent-strong 
            text-stroke-white leading-none text-shadow-md font-arsenal">
              Event
            </h1>
          </div>

          {/* Форма */}
          <div className="w-full max-w-md pl-1 mt-2">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Правая часть — занимает оставшееся место */}
      <div className="relative flex-1 min-w-0 overflow-hidden rounded-lg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        />
      </div>
    </div>
  )
}

export const Component = LoginPage;