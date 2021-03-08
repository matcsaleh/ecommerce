import {
    Button,
    Card,
    Snackbar,
    CardActions,
    CardHeader,
    CardMedia,
    IconButton,
    Modal,
    Typography
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useState, useContext } from 'react'
import { faShoppingBasket, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EcomerceContext } from '../context/EcommerceContext'
interface CardViewProps {
    id: number
    name: string
    price: number
    score: number
    image: string
}
export default function CardView(props: CardViewProps) {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const { onAddItemCart } = useContext(EcomerceContext)


    //Modal
    function handleClose() {
        setIsDetailModalOpen(false)
    }
    function handleOpen() {
        setIsDetailModalOpen(true)
    }
    //SnackBar
    function handleCloseSnackBar() {
        setIsSnackbarOpen(false)
    }
    function handleOpenSnackBar() {
        setIsSnackbarOpen(true)
    }
    const snackSuccesBar = (
        <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="success">
                Adicionado ao carrinho de compras
        </Alert>
        </Snackbar>
    )

    //Funções
    function onClickBuy() {
        onAddItemCart(props)
        handleClose()
        handleOpenSnackBar()
    }
    function onClickCart() {
        handleOpen()
        console.log(props)
    }


    const modalDetail = (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ width: '50%', height: '60%', padding: '1rem' }}>
                <div className='modalHeader'><h1 style={{ fontFamily: 'roboto', display: 'flex', justifyContent: 'center' }}>Detalhes do produto</h1></div>
                <div className='body' style={{ display: 'flex', flexDirection: 'row', width: '80%', height: '70%', justifyContent: 'space-between' }}>
                    <div className='imgContainer' style={{ flex: 2 }}>
                        <img src={`/${props.image}`} alt="ilustration" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className='detailContainer' style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0 }}>
                        <div style={{ maxHeight: '80%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography style={{ margin: '1rem' }}> Descrição</Typography>
                            <div >
                                <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry ummy text of the printing and typesetting industry. </Typography>
                            </div>
                            <Typography style={{ fontFamily: 'roboto', margin: '1rem' }}> {`Valor ${props.price} R$`}</Typography>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>Comprar</Typography>
                            <Button onClick={onClickBuy}><FontAwesomeIcon icon={faShoppingBasket} /></Button>
                            <Typography>Sair</Typography>
                            <Button onClick={handleClose}><FontAwesomeIcon icon={faTimesCircle} /></Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )

    return (
        <>
            <Card style={{ width: '15rem', margin: '1rem', padding: '5px', display: 'grid' }}>
                <CardHeader
                    title={props.name}
                />
                <CardMedia
                    image={`/${props.image}`}
                    style={{ height: 0, paddingTop: '100%' }} />
                <CardActions style={{ justifyContent: 'space-between', margin: '2px', padding: '3px', alignItems: 'center' }}>
                    <Typography >
                        {`${props.price} R$`}
                    </Typography>
                    <IconButton
                        onClick={onClickCart}
                        edge='end'>
                        <img src='/cart-icon.svg' height='60' width='60' />
                    </IconButton>
                </CardActions>
            </Card>
            <Modal
                open={isDetailModalOpen}
                onClose={handleClose}>
                {modalDetail}
            </Modal>
            {snackSuccesBar}
        </>
    )
}