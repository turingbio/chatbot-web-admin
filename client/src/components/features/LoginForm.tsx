import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/useAuthStore"
import { cn } from "@/lib/utils/cn"

/**
 * 계정 인증 후 유저 정보+토큰 저장 & 대시보드로 리디렉트
 * 상태 관리와 비즈니스 로직 액션은 useAuthStore로 분리
 */
function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { login, errorMessage } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className='min-h-[calc(100vh-80px)] w-full grid place-items-center p-6 md:p-10'>
      <div className='min-w-[300px]'>
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <form onSubmit={(e) => login(e).then(() => navigate('/'))}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  </div>
                  <span className="sr-only">{" "}</span>
                </a>
                <h1 className="text-xl font-bold">상담사로 로그인</h1>
                <div className="text-center text-sm">
                  아직 계정이 없으신가요?{" "}
                  <a href="#" className="underline underline-offset-4">
                    회원가입하기
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                {errorMessage && (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </div>
          </form>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
            로그인 버튼을 클릭하면 당사 <a href="#">서비스 약관</a>{" "}및{" "}
            <a href="#">개인정보 보호 정책</a>에 동의하게 됩니다.
          </div>
        </div>
      </div>
    </div>
  )
}



export default LoginForm
