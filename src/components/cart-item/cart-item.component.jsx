import './cart-item.style.scss';

const CartItem = ({cartItem}) => {
    const {name, imageUrl, quantity, price} = cartItem;
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-detail'>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );
};

export default CartItem;