import './Cart.css'

interface IProps{
    image: string;
    title: string;
}

export const Ad = (props: IProps) => {
    return(
        <div className='fixed flex flex-col justify-center items-center p-5'>
            <img src={props.image} className='lg:w-[350px] w-[250px]'/>
            <span className='gilroy lg:text-2xl text-xl text-[#919191] text-center mt-2 bg-white rounded-2xl p-3 shadow-lg shadow-[#ccc]'>{props.title}</span>
        </div>
    )
}