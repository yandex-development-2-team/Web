import LoginForm from './LoginForm';
import loginBg from '@/assets/images/login-page-cover.png';

export default function LoginPage() {
  return (
    <div className="bg-background flex h-svh min-h-[445px] w-full space-x-5 px-[30px] py-5">
      <div className="relative flex h-full max-w-[445px] min-w-[445px] flex-shrink-0">
        <div className="bg-secondary flex w-full flex-col items-center justify-center rounded-lg p-10">
          <div className="absolute top-6 left-17 text-left">
            <h1 className="h1 text-accent-strong font-arsenal leading-none">
              Event
            </h1>
          </div>

          <div className="mt-2 w-full max-w-md pl-1">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-lg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        />
      </div>
    </div>
  );
}

export const Component = LoginPage;
