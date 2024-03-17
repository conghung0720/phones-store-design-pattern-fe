import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../../../components/Button/Button"
import Input from "../../../../components/Input/Input"
import { useLoginMutation, useRegisterMutation } from "../../../../api/api";
import { store } from "../../../../store";
import { decodeUser, setUser } from "../../../../store/redux/userSlice";
import { useNavigate } from "react-router-dom";
import CalloutRadix from "../../../../components/Form/Callout";
import axios from "axios";


const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isCallout, setCallout] = useState(false);
  const [calloutError, setCallOutError] = useState('');
  const [login, { isloading }] = useLoginMutation();
  const navigate = useNavigate()

  const googleLogin = () => window.open(process.env.REACT_APP_HOST + 'auth/google/callback', '_self');


  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      setIsLoading(false);
      await login({
        userName,
        password,
      }).then(value => {
        if(value.error){
          setCallOutError(value.error.data.message)
          setCallout(true)
          return;
        }
        const {accessToken, refreshToken} = value.data.metadata.tokens
        localStorage.setItem("access_token", accessToken)
        localStorage.setItem("refresh_token", refreshToken)
        store.dispatch(decodeUser())
        if(userName === 'admin' || userName === 'Admin') return navigate('/admin')
        return navigate('/')
      })
    }, 3000);
    
  }

  const handleLoginGmail = async () => {
    // const data = await axios.get(process.env.REACT_APP_HOST + 'auth/google', { withCredentials: true })
    // console.log(data);
  googleLogin()
  }


  
  // const titleButton =
  return (
    <>
    <ToastContainer />
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 space-y-3">
            <Input
              placeHolder="Điền tài khoản"
              type="text"
              disabled={isLoading}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <Input
              disabled={isLoading}
              placeHolder="Điền mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            disabled={isLoading}
            loading={isLoading}
            title="Đăng nhập"
            colorButton="bg-black"
            textColor="text-white"
            type="submit"
          />
        </div>
      </form>
        {isCallout && <CalloutRadix text={calloutError}/>}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span class="w-full border-t"></span>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white px-2 ">
            <span class="align-middle">Hoặc tiếp tục với</span>
          </span>
        </div>
      </div>
      {/* <div onClick={handleLoginGmail}>
      <Button  
        disabled={isLoading}
        loading={isLoading}
        icon={true}
        colorButton="bg-white"
        textColor="text-black"
        title="Gmail"
        margin-left ="20px"
        />
      </div> */}
      <div className="w-[60%] m-auto">
        <p class="px-8 text-center text-sm text-slate-600">
          By clicking continue, you agree to our{" "}
          <a
            class="underline underline-offset-4 hover:text-primary"
            href="/terms"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            class="underline underline-offset-4 hover:text-primary"
            href="/privacy"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default SigninForm;
