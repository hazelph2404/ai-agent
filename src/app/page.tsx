'use client'
import {useState} from 'react'
import {authClient} from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {Input} from '@/components/ui/input'
export default function Home() {
  const {data: session} = authClient.useSession() //a fetch request, so you might see log in screen at first -> then logged in as user name + session
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = () => {
    authClient.signUp.email({
      email, name, password
    }, {
      onRequest: () => {
          //show loading
      },
      onSuccess: () => {
          //redirect to the dashboard or sign in page
          window.alert("Success")
      },
      onError: () => {
          // display the error message
          window.alert("Something went wrong")
      },
  });}
  const onLogin = () => {
    authClient.signIn.email({
      email, password
    }, {
      onRequest: () => {
          //show loading
      },
      onSuccess: () => {
          //redirect to the dashboard or sign in page
          window.alert("Success")
      },
      onError: () => {
          // display the error message
          window.alert("Something went wrong")
      },
  });}
  if (session) {
    return (
      <div>
        <div className="flex flex-col p-4 gap-y-5">
          <p> Log in as {session.user.name} </p>
        </div>
        <Button onClick={() => authClient.signOut()}> Sign out </Button>
      </div>
    )
  }
  return (
    <div className="p-4 flex flex-col gap-y-5">
      <Input placeholder="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      <Input placeholder="email"  type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder="password"  type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

      <Button onClick={handleSubmit}>Create User </Button>

      <div className="p-4 flex flex-col gap-y-5">

      <Input placeholder="email"  type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Input placeholder="password"  type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

      <Button onClick={onLogin}>Login </Button>

      
    </div>

    </div>

  );
}
