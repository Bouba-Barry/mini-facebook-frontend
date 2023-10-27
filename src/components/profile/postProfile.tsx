import PROFILE from '../../images/profile.png';
import POST from '../../images/post.jpg';
// import LIKE from '../../images/like.png';
// import NOTLIKE from '../../images/notlike.png';
// import COMMENT from '../../images/comment.png';
import EDIT from "../../images/editMe.png";
import ICONDELETE from "../../images/DeleteIcon.png";

export default function PostProfile(){
    return(
        <div className="flex flex-col items-left ml-20 mr-20 bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className='flex flex-row m-4'>
                <div className='flex mr-72'>
                    <img
                        className="h-10 w-10 rounded-full"
                        src={PROFILE}
                        alt=""
                        /> 
                    <h5 className='mt-2 ml-2'>{}</h5>
                </div>
                <div className='flex m-auto justify-between'>
                    <button className='mr-2' >
                        <img src={EDIT} alt="edit" className='w-6 h-6' />
                    </button>
                    <button>
                        <img src={ICONDELETE} alt="delete" className='w-7 h-7 bg-red' />
                    </button>

                </div>
            </div>   
            <div className='flex flex-col items-left mt-1 ml-10 mr-10'>
                <p className='mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sequi sit omnis aut? Neque, impedit a quidem nihil amet atque fugit aliquid repellendus sapiente quia consequatur, sint saepe delectus nam?</p>
                <img  src={POST} className='w-83 h-83'/>
            </div>
            <div className='flex flex-row  justify-between  ml-10 mt-3 mb-2 w-full'>
                <div className="flex flex-row">
                <div className='flex flex-row'>
                   <button> 
                    <img src={""} className='w-9 h-9' />
                   </button>
                   <p className='mt-3.5'>91</p>
                </div>
                <div className='flex flex-row mt-3.5'>
                   <button> 
                    <img src={""} className='w-9 h-9' />
                   </button>
                   <p className='mb-2'>10</p>
                </div>
                <div className='flex flex-row mt-1'>
                   <button> 
                    <img src={""} className='w-8 h-8' />
                   </button>
                   <p className='mt-3'>09</p>
                </div>
                </div>
                <div className='mr-12 mt-6' >
                    <p>It's been 2 hours</p>
                </div>
            </div>
        </div>
    );
}