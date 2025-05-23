import {
  Container,
  Main,
  Content,
  Form,
  Avatar,
} from "./style"

import Header from "../../components/header"
import Footer from "../../components/footer"
import ToGoBack from "../../components/toGoBack"
import Input from "../../components/input"
import Button from "../../components/button"
import MessageAlert from "../../components/messageAlert"
import InputFile from "../../components/inputFile"

import { RxAvatar } from "react-icons/rx"

import {
  useLayoutEffect,
  useCallback,
  useState,
} from "react"

import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom"

import {
  useValidatePassword,
  useValidateOldPassword,
  useValidateEmail,
  useValidateName,
} from "../../hooks/validatingFormInputs"

import { configDisplayTimerMessageAlert } from "../../configs/messageAlert"
import { api } from "../../services"

export function Profile() {
  const { user, updateProfile } = useAuth()

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : ""
  const [avatar, setAvatar] = useState(avatarURL)
  const [avatarFile, setAvatarFile] = useState(null)

  const [name, setName] = useState(user.name)
  const [validName, setValidName] = useState(true)

  const [email, setEmail] = useState(user.email)
  const [validEmail, setValidEmail] = useState(true)

  const [oldPassword, setOldPassword] = useState(false)
  const [validOldPassword, setValidOldPassword] = useState(true)

  const [newPassword, setNewPassword] = useState(false)
  const [validNewPassword, setValidNewPassword] = useState(true)

  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [cep, setCep] = useState("")
  const [validCep, setValidCep] = useState("")
  const [complement, setComplement] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [validDataAddress, setValidDataAddress] = useState(true)
  const [statusAddress, setStatusAddress] = useState("")
  const [color, setColor] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [messageDisplayTime, setMessageDisplayTime] = useState(
    configDisplayTimerMessageAlert.timer
  )
  const [waiting, setWaiting] = useState(true)

  const navigate = useNavigate()

  function handleCep(e) {
    setAlertMessage("")
    setColor(false)

    const cep = e.target.value
    setCep(cep)

    switch (true) {
      case cep === "":
        setValidCep(true)
        setStreet("")
        setNumber("")
        setComplement("")
        setDistrict("")
        setCity("")
        setCountry("")
        break

      case /\D/.test(cep):
        setValidCep("Digite somente números")
        setStreet("")
        setNumber("")
        setComplement("")
        setDistrict("")
        setCity("")
        setCountry("")
        break

      case cep.length < 8 || cep.length > 8:
        setValidCep("Deve conter no mínimo 8 caracteres.")
        setStreet("")
        setNumber("")
        setComplement("")
        setDistrict("")
        setCity("")
        setCountry("")
        break

      case cep.length === 8:
        setCep(cep)
        searchCep(cep)
        break
    }
  }

  async function searchCep(cep) {
    setAlertMessage("")

    try {
      const response = await api.post("/search_cep", { cep })
      setAddress(response.data)
      setValidCep(true)
      setAlertMessage("Cep localizado")
      setColor(true)
    } catch (error) {
      if (error.response.data.message === "Cep não localizado") {
        setAlertMessage(error.response.data.message)
        setColor(false)
        setValidCep("Cep não localizado")
      }
    }
  }

  function handleValidateName(e) {
    const name = e.target.value
    useValidateName(name, setName, setValidName)
  }

  function handleValidateEmail(e) {
    const email = e.target.value
    useValidateEmail(email, setEmail, setValidEmail)
  }

  function handleValidateOldPassword(e) {
    setAlertMessage("")
    const oldPassword = e.target.value

    if (oldPassword === "") {
      setValidOldPassword(true)
      setValidNewPassword(true)
      setOldPassword(false)
    } else {
      if (newPassword === user.password) {
        setValidNewPassword(false)
      }

      useValidateOldPassword(oldPassword, setOldPassword, setValidOldPassword)
    }
  }

  function handleValidateNewPassword(e) {
    setAlertMessage("")
    const newPassword = e.target.value

    if (newPassword === "") {
      setValidNewPassword(true)
      setValidOldPassword(true)
      setNewPassword(false)
    } else {
      if (oldPassword === user.password) {
        setValidOldPassword(false)
      }

      useValidatePassword(newPassword, setNewPassword, setValidNewPassword)
    }
  }

  function handleChangeAvatar(e) {
    const file = e.target.files[0]
    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }

  const showAddress = useCallback(async () => {
    try {
      const response = await api.get("/address")
      setAddress(response.data)
      setValidDataAddress(false)
      setStatusAddress(true)
      return response.data
    } catch (error) {
      setStatusAddress(false)
      return error.response?.data?.message || "Erro ao buscar endereço"
    }
  }, [])

  async function updateAddress(formAddress) {
    try {
      const response = await api.put("/address", formAddress)
      return response.data
    } catch (error) {
      setWaiting(false)
      setAlertMessage(error.response.data.message)
    }
  }

  async function createAddress(formAddress) {
    try {
      const response = await api.post("/address", formAddress)
      setStatusAddress(true)
      return response.data
    } catch (error) {
      setWaiting(false)
      setAlertMessage(error.response.data.message)
    }
  }

  async function handleFormSaving() {
    setWaiting(false)
    setAlertMessage("")

    if (
      validName === true &&
      validEmail === true &&
      validOldPassword &&
      validNewPassword &&
      validCep === true
    ) {
      const formUser = {
        name,
        email,
        oldPassword,
        newPassword,
      }

      const user = await updateProfile(formUser, avatarFile)
      if (typeof user === "object") {
        if (validCep && address) {
          const formAddress = {
            street,
            number,
            cep,
            complement,
            district,
            city,
            country,
          }

          if (statusAddress) {
            updateAddress(formAddress)
          } else if (cep) {
            createAddress(formAddress)
          }
          setAlertMessage("Alterações salvas!")
          setColor(true)
        } else if (!address) {
          setAlertMessage("Alterações salvas!")
          setColor(true)
        }
      } else {
        setAlertMessage(user)
        setColor(false)
      }
    } else {
      setAlertMessage("Verifique os campos em validação")
      setColor(false)
    }

    setTimeout(() => {
      setWaiting(true)
      setAlertMessage("")
    }, messageDisplayTime + 250)
  }

  useLayoutEffect(() => {
    if (validDataAddress) {
      showAddress()
      setValidCep(true)
    }

    if (address) {
      setStreet(address.street ?? "")
      setNumber(address.number ?? "")
      setCep(address.cep ?? "")
      setComplement(address.complement ?? "")
      setDistrict(address.district ?? "")
      setCity(address.city ?? "")
      setCountry(address.country ?? "")
    }
  }, [address, validDataAddress, showAddress])

  return (
    <Container>
      <MessageAlert
        message={alertMessage}
        $color={color}
        $messageDisplayTime={messageDisplayTime}
      />

      <Header />

      <Main>
        <Content>
          <ToGoBack />

          <div>
            <Avatar htmlFor="upload-image">
              {avatar ? (
                <div>
                  <img src={avatar} alt="Imagem de Perfil" />
                </div>
              ) : (
                <RxAvatar />
              )}

              <InputFile
                title="Selecione uma imagem"
                onChange={handleChangeAvatar}
              />
            </Avatar>

            <Form>
              <div>
                <div>
                  <Input
                    identifier="name"
                    label="Nome"
                    id="name"
                    type="text"
                    placeholder="Ex.: Eduardo Bergstron"
                    autoComplete="off"
                    value={name}
                    onChange={handleValidateName}
                  />
                  {validName && <p>{validName}</p>}
                </div>

                <div>
                  <Input
                    identifier="email"
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Ex.: exemplo@email.com"
                    autoComplete="off"
                    value={email}
                    onChange={handleValidateEmail}
                  />
                  {validEmail && <p>{validEmail}</p>}
                </div>
              </div>

              <div>
                <div>
                  <Input
                    identifier="oldPassword"
                    label="Senha antiga"
                    id="oldPassword"
                    type="password"
                    placeholder="Digite sua senha atual"
                    autoComplete="off"
                    onChange={handleValidateOldPassword}
                  />
                  {!validOldPassword && (
                    <p>A senha deve conter no mínimo 6 caracteres.</p>
                  )}
                </div>

                <div>
                  <Input
                    identifier="newPassword"
                    label="Nova Senha"
                    id="newPassword"
                    type="password"
                    placeholder="Digite sua nova senha"
                    autoComplete="off"
                    onChange={handleValidateNewPassword}
                  />
                  {!validNewPassword && (
                    <p>A senha deve conter no mínimo 6 caracteres.</p>
                  )}
                </div>
              </div>

              <div>
                <Input
                  identifier="street"
                  label="Endereço"
                  id="street"
                  type="text"
                  placeholder="Ex.: Rua Franklin"
                  autoComplete="off"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />

                <Input
                  identifier="number"
                  label="Número"
                  id="number"
                  type="number"
                  placeholder="Ex.: 123"
                  min={0}
                  max={99999}
                  autoComplete="off"
                  value={number}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value >= 0) setNumber(value)
                  }}
                />

                <div>
                  <Input
                    identifier="cep"
                    label="Cep"
                    id="cep"
                    type="text"
                    placeholder="Ex.: 91210060"
                    autoComplete="off"
                    maxLength={8}
                    value={cep}
                    onChange={handleCep}
                  />
                  {validCep && <p>{validCep}</p>}
                </div>
              </div>

              <div>
                <Input
                  identifier="complement"
                  label="Complemento"
                  id="complement"
                  type="text"
                  placeholder="Ex.: Próximo a escola"
                  autoComplete="off"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />

                <Input
                  identifier="district"
                  label="Bairro"
                  id="district"
                  type="text"
                  placeholder="Ex.: Jardim Itu"
                  autoComplete="off"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>

              <div>
                <Input
                  identifier="city"
                  label="Cidade"
                  id="city"
                  type="text"
                  placeholder="Ex.: Porto Alegre"
                  autoComplete="off"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <Input
                  identifier="country"
                  label="Estado"
                  id="country"
                  type="text"
                  placeholder="Ex.: RS"
                  autoComplete="off"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <Button
                $loading={!waiting}
                onClick={waiting ? handleFormSaving : null}
                title="Salvar"
              />
            </Form>
          </div>
        </Content>
        <Footer />
      </Main>
    </Container>
  )
}