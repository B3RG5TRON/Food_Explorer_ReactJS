import { Container, Main, Content, Presentation } from "./style"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css/skyblue"

import { api } from "../../services"

import Header from "../../components/header"
import Footer from "../../components/footer"
import Section from "../../components/section"
import Card from "../../components/card"

import notFound from "../../assets/icons/notFound.svg"
import cookieFruit from "../../assets/images/cookieFruit.png"

import { AiOutlineLoading3Quarters } from "react-icons/ai"

import MessageAlert from "../../components/messageAlert"
import { configDisplayTimerMessageAlert } from "../../configs/messageAlert"

export function Home({ passingCategoriesValuesToHome }) {
  const [alertMessage, setAlertMessage] = useState("")
  const [color, setColor] = useState(false)
  const [messageDisplayTime, setMessageDisplayTime] = useState(
    configDisplayTimerMessageAlert.timer
  )

  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState("")
  const [category, setCategory] = useState([])

  const [dishesSnack, setDishesSnack] = useState([])
  const [dishesDessert, setDishesDessert] = useState([])
  const [dishesDrink, setDishesDrink] = useState([])

  const [quantityOfItemsInTheCart, setQuantityOfItemsInTheCart] = useState(0)

  const [loading, setLoading] = useState(true)

  const handleSearchInputChange = (value) => {
    setSearchValue(value)
  }

  function handleCategoriesValues({ snack, dessert, drink }) {
    const categorySet = new Set([snack, dessert, drink])
    const category = Array.from(categorySet).filter(
      (category) => category !== ""
    )
    setCategory(category)
  }

  const handleCard = (dishId) => {
    navigate(`/dish/${dishId}`)
  }

  const handleQuantityOfItemsInTheCart = (value) => {
    setQuantityOfItemsInTheCart(value)
  }

  useEffect(() => {
    setLoading(true)
    const fetchDish = async () => {
      const response = await api.get(
        `/dish?name=${searchValue}&category=${category}`
      )

      const snack = response.data.filter((dish) => dish.category === "Refeição")
      const dessert = response.data.filter(
        (dish) => dish.category === "Sobremesa"
      )
      const drink = response.data.filter((dish) => dish.category === "Bebida")

      setTimeout(() => {
        setLoading(false)
      }, 500)

      setDishesSnack(snack)
      setDishesDessert(dessert)
      setDishesDrink(drink)
    }

    fetchDish()
  }, [searchValue, category])

  useEffect(() => {
    setColor(false)
    setAlertMessage("")

    if (quantityOfItemsInTheCart !== 0) {
      setColor(true)
      setAlertMessage("Pedido adicionado ao carrinho")
    }

    setTimeout(() => {
      setColor(false)
      setAlertMessage("")
    }, messageDisplayTime + 250)
  }, [quantityOfItemsInTheCart, messageDisplayTime])

  return (
    <Container>
      <MessageAlert
        message={alertMessage}
        $color={color}
        $messageDisplayTime={messageDisplayTime}
      />

      <Header
        qtdOrders={quantityOfItemsInTheCart}
        search={handleSearchInputChange}
        valueSearch={searchValue}
        passingCategoriesValuesToHome={handleCategoriesValues}
      />
      <Content>
        <Main>
          <Presentation>
            <div>
              <img src={cookieFruit} alt="Biscoito de Frutas" />
              <h2>Sabores inigualáveis</h2>
              <p>Sinta o cuidado do preparo com ingredientes selecionados</p>
            </div>
          </Presentation>
          {loading ? (
            <div className="notFound">
              <AiOutlineLoading3Quarters />
            </div>
          ) : !dishesSnack.length &&
            !dishesDessert.length &&
            !dishesDrink.length ? (
            <div className="notFound">
              <img src={notFound} alt="Não encontrado" />
              <p>pratos não encontrados</p>
            </div>
          ) : (
            <>
              {dishesSnack.length ? (
                <Section title="Refeições">
                  <Splide
                    options={{
                      fixedWidth: "fit-content",
                      gap: "2.7rem",
                      rewind: false,
                      pagination: false,
                    }}
                    aria-label="dish carousel"
                  >
                    {dishesSnack.map((dish) => (
                      <SplideSlide key={String(dish.id)}>
                        <Card
                          quantityOfItemsInTheCart={
                            handleQuantityOfItemsInTheCart
                          }
                          data={dish}
                          onClickCard={() => {
                            handleCard(dish.id)
                          }}
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </Section>
              ) : null}

              {dishesDessert.length ? (
                <Section title="Sobremesas">
                  <Splide
                    options={{
                      fixedWidth: "fit-content",
                      gap: "2.7rem",
                      rewind: false,
                      pagination: false,
                    }}
                    aria-label="dish carousel"
                  >
                    {dishesDessert.map((dish) => (
                      <SplideSlide key={String(dish.id)}>
                        <Card
                          quantityOfItemsInTheCart={
                            handleQuantityOfItemsInTheCart
                          }
                          data={dish}
                          onClickCard={() => {
                            handleCard(dish.id)
                          }}
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </Section>
              ) : null}

              {dishesDrink.length ? (
                <Section title="Bebidas">
                  <Splide
                    options={{
                      fixedWidth: "fit-content",
                      gap: "2.7rem",
                      rewind: false,
                      pagination: false,
                    }}
                    aria-label="dish carousel"
                  >
                    {dishesDrink.map((dish) => (
                      <SplideSlide key={String(dish.id)}>
                        <Card
                          quantityOfItemsInTheCart={
                            handleQuantityOfItemsInTheCart
                          }
                          data={dish}
                          onClickCard={() => {
                            handleCard(dish.id)
                          }}
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </Section>
              ) : null}
            </>
          )}
        </Main>
      </Content>
      <Footer />
    </Container>
  )
}
