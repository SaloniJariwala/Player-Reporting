import { RiLoader4Line } from 'react-icons/ri';

const Loader = (props) => {
    return (
        <div className="table_loader">{props.message ? <p className='m-0 py_20'>{props.message}</p> : <RiLoader4Line size={45} />}</div>
    )
}

export default Loader;