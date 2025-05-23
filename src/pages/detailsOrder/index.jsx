import {
  Container,
  Main,
  Content,
  Status,
  ContentItems,
  OrderSummary,
  DeliveryAddress,
  ContentOrderSummaryAndDeliveryAddress,
} from "./style"

import Header from "../../components/header"
import Footer from "../../components/footer"
import ToGoBack from "../../components/toGoBack"
import CartItem from "../../components/cartItemCheckout"

import { api } from "../../services"

import { useParams } from "react-router-dom"

import { useEffect, useLayoutEffect, useState, useCallback } from "react"

import { useAuth } from "../../hooks/auth"
import { USER_ROLES } from "../../utils/roles"

import { AiOutlineLoading3Quarters } from "react-icons/ai"

export function DetailsOrder() {
  const { user } = useAuth()
  const params = useParams()
  const { id } = params

  const [order, setOrder] = useState([])
  const [itemsOrder, setItemsOrder] = useState([])
  const [dish, setDish] = useState([])
  const [userIdWithinThePurchaseOrder, setUserIdWithinThePurchaseOrder] =
    useState("")

  const [totalPriceOfProducts, setTotalPriceOfProducts] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [totalOrderPrice, setTotalOrderPrice] = useState(0)
  const [address, setAddress] = useState({})
  const [dataUser, setDataUser] = useState({})

  const [loading, setLoading] = useState(true)

  const handleItemsOrder = useCallback(async () => {
    const dishIdAndCount = itemsOrder.map((item) => ({
      id: item.dish_id,
      count: item.count,
    }))

    const arrayItems = await Promise.all(
      dishIdAndCount.map(async (item) => {
        const response = await api.get(`/dish/${item.id}`)
        const imageURL = `${api.defaults.baseURL}/files_image/${response.data.image}`

        return {
          name: response.data.name,
          category: response.data.category,
          price: response.data.price,
          count: item.count,
          image: imageURL,
        }
      })
    )

    setDish(arrayItems)
  }, [itemsOrder])

  useEffect(() => {
    setLoading(true)
    const getOrderAndItemsOrderById = async () => {
      const response = await api.get(`/checkout/${id}`)

      setLoading(false)

      setOrder(response.data.order[0])
      setItemsOrder(response.data.itemsOrder)
      setUserIdWithinThePurchaseOrder(response.data.order[0].user_id)
    }

    getOrderAndItemsOrderById()
  }, [id])

  useEffect(() => {
    handleItemsOrder()
  }, [handleItemsOrder])

  useLayoutEffect(() => {
    let totalPriceOfProducts = 0

    for (const item of dish) {
      totalPriceOfProducts += item.count * item.price
    }
    setTotalPriceOfProducts(totalPriceOfProducts)
  }, [dish])

  useLayoutEffect(() => {
    function shipping() {
      if (order.deliveryType === "economic") {
        setShipping(9.9)
      } else {
        setShipping(0)
      }
    }

    function discount() {
      if (order.paymentType === "pix") {
        setDiscount(0.02)
      } else {
        setDiscount(0)
      }
    }

    shipping()
    discount()
  }, [order])

  useLayoutEffect(() => {
    const total =
      totalPriceOfProducts +
      shipping -
      (totalPriceOfProducts + shipping) * discount

    setTotalOrderPrice(total)
  }, [totalPriceOfProducts, discount, shipping])

  useLayoutEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await api.get(
          `/address/${userIdWithinThePurchaseOrder}`
        )
        setAddress(response.data)
      } catch (error) {
        console.error(error.response.data.error, error.response.data.message)
      }
    }

    fetchAddress()
  }, [userIdWithinThePurchaseOrder])

  useLayoutEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await api.get(`/users/${userIdWithinThePurchaseOrder}`)

        setDataUser(response.data)
      } catch (error) {
        console.error(error.response.data.error, error.response.data.message)
      }
    }
    if ([USER_ROLES.ADMIN].includes(user.role)) {
      fetchDataUser()
    }
  }, [userIdWithinThePurchaseOrder, user.role])

  return (
    <Container>
      <Header />

      {loading ? (
        <div className="notFound">
          <AiOutlineLoading3Quarters />
        </div>
      ) : (
        <Content>
          <Main>
            <ToGoBack />

            <h1>Detalhes do Pedido</h1>

            <Status $orderCompleted={order.orderCompleted}>
              <h2>Status do pedido</h2>

              <div>
                <div>
                  <h2>
                    {order.orderCompleted === 0 ? "Em andamento" : "Finalizado"}
                  </h2>
                  <p>{dataUser.name}</p>
                  <a href={`mailto:${dataUser.email}`}>{dataUser.email}</a>
                  <p>{`Ref. ${order.id}`}</p>
                </div>

                <div>
                  <p>
                    <span>Data do pedido: </span>
                    {order.created_at}
                  </p>
                </div>
              </div>
            </Status>

            <ContentItems>
              <h2>Produtos comprados</h2>

              {dish?.map((dish) => (
                <CartItem key={dish.name} data={dish} />
              ))}
            </ContentItems>

            <ContentOrderSummaryAndDeliveryAddress>
              <DeliveryAddress>
                <h2>Endereço de entrega</h2>

                <p>{`${address.city} - ${address.country}`}</p>
                <p>{address.cep}</p>
                <p>{`${address.street}, ${address.number}`}</p>
                <p>{address.complement}</p>
                <p>{address.district}</p>
              </DeliveryAddress>

              <OrderSummary>
                <h2>Resumo do pedido</h2>

                <div className="credit-card">
                  <p>
                    Pagamento{" "}
                    {order.paymentType === "creditCard"
                      ? "(Cartão de crédito)"
                      : "(Pix)"}
                  </p>
                  <p>{`${
                    order.paymentType === "creditCard"
                      ? order.numberInstallments
                      : "1"
                  } x R$${
                    order.paymentType === "creditCard"
                      ? (totalOrderPrice / order.numberInstallments)
                          .toFixed(2)
                          .replace(".", ",")
                      : totalOrderPrice.toFixed(2).replace(".", ",")
                  }`}</p>
                </div>

                <div>
                  <p>Produtos</p>
                  <p>{`R$${totalPriceOfProducts
                    .toFixed(2)
                    .replace(".", ",")}`}</p>
                </div>

                <div>
                  <p>{`Desconto (${discount * 100}%)`}</p>
                  <p>
                    {`- R$${(totalPriceOfProducts + shipping - totalOrderPrice)
                      .toFixed(2)
                      .replace(".", ",")}`}
                  </p>
                </div>

                <div>
                  <p>Frete {shipping > 0 ? "(econômico)" : "(grátis)"}</p>
                  <p>{`R$${shipping.toFixed(2).replace(".", ",")}`}</p>
                </div>

                <div>
                  <p>Total do pedido</p>
                  <p>{`R$${totalOrderPrice.toFixed(2).replace(".", ",")}`}</p>
                </div>
              </OrderSummary>
            </ContentOrderSummaryAndDeliveryAddress>
          </Main>
        </Content>
      )}
      <Footer />
    </Container>
  )
}
