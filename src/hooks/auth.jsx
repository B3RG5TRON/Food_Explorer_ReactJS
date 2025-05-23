import { createContext, useContext, useLayoutEffect, useState } from "react"
import { api } from "../services/index"
import { configDisplayTimerMessageAlert } from "../configs/messageAlert"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({})
  const [alertMessage, setAlertMessage] = useState("")
  const [color, setColor] = useState(false)

  const [dishRedirection, setDishRedirection] = useState("")
  const [back, setBack] = useState(false)

  function redirectionDish(dish) {
    setBack(true)
    setDishRedirection(dish)
  }

  async function signIn({ email, password }) {
    setAlertMessage("")

    try {
      const response = await api.post("/sessions", { email, password })
      const { user } = response.data
      if (user) {
        setAlertMessage(`Bem vindo ${user.name}`)
        setColor(true)
      }

      localStorage.setItem("@foodExplorer:user", JSON.stringify(user))

      setTimeout(() => {
        setData({ user })
      }, configDisplayTimerMessageAlert.timer + 250)
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.data.message)
      } else {
        setAlertMessage("Não foi possível efetuar o login")
      }
    }
  }

  function signOut() {
    const user = localStorage.removeItem("@foodExplorer:user")
    localStorage.removeItem("@foodExplorer:cartItems")

    setData({ user })

    setTimeout(() => {
      setAlertMessage("Volte sempre !")
      setColor(false)
    }, 200)
  }

  async function updateProfile(formUser, avatarFile) {
    if (avatarFile) {
      const fileUploadForm = new FormData()
      fileUploadForm.append("avatar", avatarFile)

      const response = await api.patch("/users/avatar", fileUploadForm)
      formUser.avatar = response.data.avatar
    }

    try {
      const response = await api.put("/users", formUser)
      const user = response.data

      localStorage.setItem("@foodExplorer:user", JSON.stringify(user))

      setTimeout(() => {
        setData({ user })
      }, configDisplayTimerMessageAlert.timer + 250)

      return response.data
    } catch (error) {
      if (error.response) {
        return error.response.data.message
      }
      return "Não foi possível atualizar o perfil"
    }
  }

  useLayoutEffect(() => {
    const user = localStorage.getItem("@foodExplorer:user")

    if (user) {
      setData({
        user: JSON.parse(user),
      })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateProfile,
        redirectionDish,
        dishRedirection,
        back,
        setBack,
        setAlertMessage,
        alertMessage,
        color,
        user: data.user ?? false,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export default AuthProvider
export { useAuth }
