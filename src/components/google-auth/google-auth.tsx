import React from "react";
import styles from './google-auth.module.css'
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from "../../utils/hooks";
import { useHistory } from "react-router-dom";

export const GoogleAuth = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse)
      // dispatch(googleLogin({ provider, accessToken: credentialResponse.access_token }))
      //   .unwrap()
      //   .then(() => {
      //     history.push('/')
      //   })
    },
    onError: (err) => console.warn(err),
  })
  return (
    <div className="mt-6"><Button
      htmlType='button'
      type='primary'
      size='medium'
      onClick={() => handleGoogleLogin()}>Google</Button></div>
  )
}
