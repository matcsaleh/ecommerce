import { Modal } from "@material-ui/core";
import { createContext, ReactNode, useState } from "react";

export const EcomerceContext = createContext({} as EcommerceData);
interface Product {
  id: number
  name: string
  price: number
  score: number
  image: string
}

interface EcommerceData {
  isModalOpen: Boolean
  selectType: (type: string) => void
  onAddItemCart: (item: Product) => void
  cart: Product[]
  type: string
  searchText: string
  onRemoveItemCart: (index: number) => void
  onChangeText: (text: string) => void
}

interface EcommerceContextProps { children: ReactNode }

export default function EcomerceContextProvider({ children }: EcommerceContextProps) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState('')
  const [cart, setCart] = useState([])
  const [searchText, setSearchText] = useState('')


  function handleClose() {
    setIsModalOpen(false)
  }
  function onAddItemCart(item: Product) {
    console.log(item)
    setCart([...cart, { ...item }])

  }
  function onRemoveItemCart(index: number) {
    let arr = cart.filter((item) => {
      if (item.id != index) {
        return item
      }
    })
    setCart(arr)

  }

  function selectType(type: string) {
    setType(type)
  }
  function onChangeText(text: string) {
    setSearchText(text)
  }

  const body = (
    <div>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  return (
    <EcomerceContext.Provider value={{
      isModalOpen,
      cart,
      type,
      searchText,
      onRemoveItemCart,
      selectType,
      onAddItemCart,
      onChangeText
    }}>
      {children}
      <Modal
        open={isModalOpen}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </EcomerceContext.Provider>

  )

}