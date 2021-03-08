import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch, faBan } from '@fortawesome/free-solid-svg-icons'
import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Modal,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    InputBase,
    Input,
    InputLabel
} from '@material-ui/core'
import { useContext, useEffect, useState } from 'react';
import { EcomerceContext } from '../context/EcommerceContext';



export default function Header() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [total, setTotal] = useState(0)
    const [shipping, setShipping] = useState(0)
    const { selectType, onRemoveItemCart, onChangeText, searchText, cart } = useContext(EcomerceContext);

    // Modal
    function onClickCart() {
        setIsModalOpen(true)
    }
    function onCloseModal() {
        setIsModalOpen(false)
    }

    // Menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectMenu = (type: string) => {
        selectType(type);
        handleClose()

    }
    //Funções
    function onClickRemove(id: number) {
        onRemoveItemCart(id)
    }

    function handleResult() {
        let arr = cart.reduce((prev, curr) => {

            return prev + curr.price
        }, 0)

        setTotal(arr)
        handleShipping()
    }

    function handleShipping() {
        let arr = cart.reduce((prev, curr) => {
            if (total >= 250.00) {
                return 0
            } else {
                return cart.length * 10
            }

        }, 0)

        setShipping(arr)
    }

    useEffect(() => {
        handleResult()

    }, [cart, shipping])





    const modalBody = (
        <Card style={{ position: 'absolute', padding: '4px', right: 0, width: '50rem', marginTop: '4rem', marginRight: '0.5rem' }}>
            <CardHeader
                title='Carrinho de compras' />
            <CardContent>
                <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 0 }}   >
                    <div style={{}}>
                        {cart.length != 0 ?
                            cart.map((item) => {
                                return (
                                    <>
                                        <div key={item.id}>
                                            <Typography>
                                                {` ${item.name} ${item.price}R$`}
                                                <Button onClick={() => onClickRemove(item.id)}>
                                                    <FontAwesomeIcon icon={faBan} width='30' height='30' />
                                                </Button>
                                            </Typography>

                                        </div>
                                    </>
                                )
                            })
                            : <Typography>Carrinho Vazio</Typography>}
                    </div>
                </CardContent>
                <div style={{ borderTop: '1px solid black' }}>
                    <Typography>{shipping === 0 ? 'Frete Gratis' : `Frete ${shipping} R$`}</Typography>
                    <Typography>{`Total ${total + shipping} R$`}</Typography>

                </div>

            </CardContent>
            <CardActions>
                <Button>
                    Comprar
                </Button>
                <Button
                    onClick={onCloseModal}>
                    <img src='/arrow-down-icon.svg' alt='back' />
                </Button>
            </CardActions>

        </Card>
    )

    const menu = (
        <div>
            <Button onClick={handleClick} style={{ color: 'white',marginLeft:'0.5rem',borderTop:'2px solid white' }}>
                Ordenar
        </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}

            >
                <MenuItem onClick={() => handleSelectMenu('price')}>Menor Preço</MenuItem>
                <MenuItem onClick={() => handleSelectMenu('score')}>Popularidade</MenuItem>
            </Menu>
        </div>
    )

    return (
        <>
            <AppBar position="fixed" >
                <Toolbar  >
                    <Typography style={{ flexGrow: 100 }}>Loja de Games</Typography>
                    <Button style={{ flexGrow: 1 }}>
                        <FontAwesomeIcon icon={faSearch} color='white' style={{ flexGrow: 1 }} />
                    </Button>
                    <InputLabel style={{ margin: '0.5rem', color: 'white' }}>Procurar</InputLabel>
                    <Input
                        value={searchText}
                        onChange={(event) => onChangeText(`${event.target.value}`)}
                        style={{ background: 'white', flexGrow: 2, borderRadius: '5px', padding: '0.5rem' }} />
                    <Button style={{ flexGrow: 1 }} onClick={onClickCart}>
                        <FontAwesomeIcon icon={faShoppingCart} color='white' />
                    </Button>
                </Toolbar>
                {menu}
            </AppBar>

            <Modal
                open={isModalOpen}
                onClose={onCloseModal}
            >
                {modalBody}
            </Modal>
        </>
    )
}