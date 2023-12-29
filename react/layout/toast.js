import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastShow =  (type,message) => {
    console.log(type,message,"sf")
    toast[type](message, {
        position: 'top-right',
        autoClose: 3000, // milliseconds until the toast closes automatically
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}

export default toastShow;