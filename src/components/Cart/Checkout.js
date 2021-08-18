import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveCharacters = value => value.trim().length === 5;

const Checkout = (props) => {
    
    const nameRef = useRef('');
    const streetRef = useRef('');
    const postalRef = useRef('');
    const cityRef = useRef('');

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street:true,
        city:true,
        postal:true
    });

    const confirmHandler = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const street = streetRef.current.value;
        const postal = postalRef.current.value;
        const city = cityRef.current.value;
        
        const nameIsValid = !isEmpty(name);
        const streetIsValid = !isEmpty(street);
        const postalIsValid = isFiveCharacters(postal);
        const cityIsValid = !isEmpty(city);
        
        setFormInputValidity({
            name:nameIsValid,
            street:streetIsValid,
            city:cityIsValid,
            postal:postalIsValid
        });
        
        const formIsValid = 
            nameIsValid &&
            streetIsValid &&
            postalIsValid &&
            cityIsValid;
        if (!formIsValid) {
            return;
        }
        console.log(
            {
                name,
                street,
                postalCode:postal,
                city
            }
        )
        props.onConfirm({
            name,
            street,
            postalCode:postal,
            city
        });
    };


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef}/>
                {!formInputValidity.name && <p>Please enter a name</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef}/>
                {!formInputValidity.street && <p>Please enter a street</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalRef}/>
                {!formInputValidity.postal && <p>Please enter a valid postal code</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef}/>
                {!formInputValidity.city && <p>Please enter a city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;