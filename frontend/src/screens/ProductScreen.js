import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating';
import {useSelector, useDispatch} from 'react-redux';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsProduct } from '../actions/productActions';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(id))
    },[id, dispatch])

    const addToCartHandler = () => {
        console.log('url', `/cart/${id}?qty=${qty}`)
        navigate(`/cart/${id}/${qty}`);
    }

  return (
    <div>
        {
        loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
            <div>
            <Link to='/'>Back to result</Link>
            <div className='row top'>
                <div className='col-2'>
                    <img className='large' src={product.image} name={product.name} />
                </div>
                <div className='col-1'>
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating
                                rating = {product.rating}
                                numReviews = {product.numReviews}
                            />
                        </li>
                        <li>
                            Price: ${product.price}
                        </li>
                        <li>
                            Description:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <div className='row'>
                                    <div>Price</div>
                                    <div className='price'>${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Status</div>
                                    <div >
                                        {
                                            product.countInStock > 0 ? (
                                                <span className='success'>In Stock</span>
                                            ) : (
                                                <span className='danger'>Unavailable</span>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className='row'>
                                                <div>Qty</div>
                                                <div>
                                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            ))  
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button
                                                className='primary block'
                                                onClick={addToCartHandler}
                                            >
                                                Add to Cart
                                            </button>
                                        </li>
                                    </>
                                ) 
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )
        }
    </div>
  )
}
